// Import necessary modules and utilities
const { Worker, isMainThread, parentPort, workerData } = require("worker_threads"); // For managing multithreading using worker threads
const TicketModel = require("../models/TicketModel"); // Custom TicketModel to handle ticket-related data and operations
const { createWorker } = require("../workers/workerHandler"); // Function to initialize worker threads (vendors and customers)
const { lock } = require("../utils/lockUtils"); // Utility to handle concurrency locks

class TicketController {
  constructor() {
    // Initialize a new instance of the TicketModel to manage the system's state and data
    this.model = new TicketModel();
  }

  // Start the ticketing system
  start(req, res) {
    // Check if the system is already running to prevent redundant operations
    if (this.model.systemStatus === "running") {
      return res.status(400).json({ message: "System is already running." });
    }

    // Extract configuration values from the request body
    const {
      vendors,              // Number of vendor workers
      customers,            // Number of customer workers
      total,                // Total tickets to be created
      capacity,             // Maximum tickets allowed in the pool at a time
      ticketReleaseRate,    // Rate at which vendors release tickets
      customerRetrievalRate // Rate at which customers retrieve tickets
    } = req.body;

    // Validate the input parameters to ensure valid configuration
    if (
      !vendors ||
      !customers ||
      total <= 0 ||
      capacity <= 0 ||
      ticketReleaseRate <= 0 ||
      customerRetrievalRate <= 0
    ) {
      return res.status(400).json({ message: "Invalid configuration values." });
    }

    // Initialize the ticketing system's state
    this.model.totalTickets = total; // Total number of tickets to be created
    this.model.maxTicketCapacity = capacity; // Maximum tickets allowed in the pool at any given time
    this.model.ticketPool = []; // Tickets currently available for retrieval
    this.model.waitingTickets = []; // Tickets queued for future addition to the pool
    this.model.ticketIDCounter = 1; // Counter to assign unique IDs to tickets
    this.model.ticketsBought = 0; // Counter for tickets purchased by customers
    this.model.systemStatus = "running"; // Update system status to 'running'

    // Pre-fill the ticket pool with the initial batch of tickets
    for (let i = 0; i < Math.min(total, capacity); i++) {
      const ticket = `Ticket ${this.model.ticketIDCounter++}`;
      this.model.ticketPool.push(ticket);
    }

    // Add remaining tickets to the waiting queue
    for (let i = capacity; i < total; i++) {
      const ticket = `Ticket ${this.model.ticketIDCounter++}`;
      this.model.waitingTickets.push(ticket);
    }

    // Create vendor workers to release tickets at the specified rate
    for (let i = 1; i <= vendors; i++) {
      this.model.workers.push(createWorker("vendor", ticketReleaseRate, i, this.model));
    }

    // Create customer workers to retrieve tickets at the specified rate
    for (let i = 1; i <= customers; i++) {
      this.model.workers.push(createWorker("customer", customerRetrievalRate, i, this.model));
    }

    // Respond to the client indicating the system has started
    res.json({ message: "System started." });
  }

  // Stop the ticketing system
  stop(req, res) {
    // Check if the system is already stopped
    if (this.model.systemStatus === "stopped") {
      return res.status(400).json({ message: "System is already stopped." });
    }

    // Terminate all active worker threads to stop operations
    this.model.workers.forEach((worker) => worker.terminate());
    this.model.workers = []; // Clear the workers array
    this.model.systemStatus = "stopped"; // Update system status to 'stopped'
    this.model.logs.push("System stopped."); // Log the stop action
    res.json({ message: "System stopped successfully." });
  }

  // Reset the ticketing system to its initial state
  reset(req, res) {
    // Terminate all workers before resetting
    this.model.workers.forEach((worker) => worker.terminate());
    this.model.reset(); // Call the reset method on the TicketModel
    res.json({ message: "System reset." }); // Respond indicating the system was reset
  }

  // Retrieve the current status of the ticketing system
  getStatus(req, res) {
    res.json({
      ticketPool: this.model.ticketPool.length, // Current count of tickets in the pool
      logs: this.model.logs, // System logs for debugging/monitoring
    });
  }
}

module.exports = TicketController; // Export the controller for use in the application