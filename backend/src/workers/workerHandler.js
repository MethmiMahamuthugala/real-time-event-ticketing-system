// Import necessary modules
const { Worker, isMainThread, parentPort, workerData } = require("worker_threads"); // For multithreading with worker threads
const { lock } = require("../utils/lockUtils"); // Lock utility to manage concurrency in critical sections

// Function to create a worker thread
const createWorker = (role, rate, id, model) => {
  /**
   * Creates and initializes a worker thread based on the specified role (vendor or customer).
   * The worker periodically interacts with the shared `model` object based on its role.
   *
   * @param {string} role - Role of the worker ("vendor" or "customer").
   * @param {number} rate - Interval in milliseconds at which the worker operates.
   * @param {number} id - Unique identifier for the worker.
   * @param {object} model - Shared state managed by the ticketing system.
   * @returns {Worker} - The initialized worker thread.
   */

  const worker = new Worker(__filename, {
    workerData: { role, rate, id }, // Pass worker-specific data to the thread
  });

  // Handle messages received from the worker thread
  worker.on("message", async ({ role, id }) => {
    if (role === "vendor") {
      /**
       * Vendor worker logic: Adds tickets to the pool.
       * Vendors can only add tickets if:
       * - Tickets have been purchased.
       * - The pool has space available (less than max capacity).
       */
      await lock(() => {
        if (model.ticketsBought > 0 && model.ticketPool.length < model.maxTicketCapacity) {
          if (model.waitingTickets.length > 0) {
            // Add a ticket from the waiting queue to the pool
            const ticket = model.waitingTickets.shift();
            model.ticketPool.push(ticket);
            model.logs.push(`Vendor ${id} added ${ticket} to the pool.`);
          } else {
            // Generate a new ticket and add it to the pool
            const ticket = `Ticket ${model.ticketIDCounter++}`;
            model.ticketPool.push(ticket);
            model.logs.push(`Vendor ${id} added ${ticket} to the pool.`);
          }
        } else if (model.ticketsBought === 0) {
          // No tickets have been bought yet, so vendors cannot add tickets
          model.logs.push(
            `Vendor ${id} could not add a ticket: No tickets have been bought yet.`
          );
        } else {
          // Pool is full, vendor cannot add tickets
          model.logs.push(`Vendor ${id} could not add a ticket: Pool is full.`);
        }
      });
    } else if (role === "customer") {
      /**
       * Customer worker logic: Removes tickets from the pool.
       * Customers can only retrieve tickets if the pool is not empty.
       */
      await lock(() => {
        if (model.ticketPool.length > 0) {
          // Remove a ticket from the pool
          const ticket = model.ticketPool.shift();
          model.ticketsBought++; // Increment the counter for tickets bought
          model.logs.push(`Customer ${id} removed ${ticket} from the pool.`);
        } else {
          // Pool is empty, customer cannot retrieve tickets
          model.logs.push(`Customer ${id} could not remove a ticket: Pool is empty.`);
        }
      });
    }
  });

  return worker; // Return the created worker
};

// Worker thread logic (executed when the file is run in a worker thread)
if (!isMainThread) {
  /**
   * Worker thread logic to simulate activity.
   * Periodically sends messages to the main thread based on the provided `rate`.
   */
  const { role, rate, id } = workerData; // Retrieve worker-specific data

  // Simulate worker activity by sending periodic messages to the main thread
  setInterval(() => {
    parentPort.postMessage({ role, id }); // Notify the main thread of the worker's activity
  }, rate);
}

module.exports = { createWorker }; // Export the function for creating workers