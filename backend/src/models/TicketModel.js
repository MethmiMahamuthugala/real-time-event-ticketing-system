class TicketModel {
  constructor() {
    // Initialize the ticket pool where active tickets are stored and available for customers
    this.ticketPool = [];

    // Store tickets that will be added to the pool when capacity allows
    this.waitingTickets = [];

    // Counter for generating unique IDs for each ticket
    this.ticketIDCounter = 1;

    // Array to maintain a log of system events for debugging and monitoring
    this.logs = [];

    // Status of the ticketing system, defaulted to 'stopped' at initialization
    this.systemStatus = "stopped";

    // Total number of tickets the system will generate
    this.totalTickets = 0;

    // Maximum number of tickets that can exist in the active ticket pool at a time
    this.maxTicketCapacity = 0;

    // Counter to track the number of tickets bought by customers
    this.ticketsBought = 0;

    // Array to store references to active worker threads (vendors and customers)
    this.workers = [];
  }

  // Reset the system to its initial state, clearing all active data
  reset() {
    // Clear the ticket pool, making it empty
    this.ticketPool = [];

    // Clear the waiting tickets queue
    this.waitingTickets = [];

    // Reset the logs to an empty state
    this.logs = [];

    // Set the system status back to 'stopped'
    this.systemStatus = "stopped";

    // Reset the ticket ID counter to start generating IDs from 1
    this.ticketIDCounter = 1;

    // Reset the count of tickets bought to 0
    this.ticketsBought = 0;
  }
}

module.exports = TicketModel; // Export the TicketModel class for use in other parts of the application