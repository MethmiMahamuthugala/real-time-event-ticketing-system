// Import required modules
const express = require("express"); // Framework for creating HTTP server and handling routes
const bodyParser = require("body-parser"); // Middleware for parsing JSON request bodies
const cors = require("cors"); // Middleware for enabling Cross-Origin Resource Sharing (CORS)
const { Worker, isMainThread, parentPort, workerData } = require("worker_threads"); // For multithreading capabilities

// Import custom modules
const { createWorker } = require("./workers/workerHandler"); // Function for creating worker threads
const { lock } = require("./utils/lockUtils"); // Lock utility for managing concurrent access to critical sections
const TicketController = require("./controllers/TicketController"); // Controller for handling ticket system operations

// Initialize Express app and attach middleware
const app = express();
app.use(bodyParser.json()); // Parse incoming JSON request bodies into JavaScript objects
app.use(cors()); // Allow requests from other origins (useful in frontend-backend setups)

// Initialize an instance of the TicketController to manage ticket-related operations
const ticketController = new TicketController();

if (isMainThread) {
  /**
   * Main thread logic:
   * Handles incoming HTTP requests and interacts with the TicketController to manage the ticketing system.
   */

  // Define API endpoints for ticketing system operations
  app.post("/start", (req, res) => ticketController.start(req, res));
  // Starts the ticketing system with the provided configuration

  app.post("/stop", (req, res) => ticketController.stop(req, res));
  // Stops the ticketing system and terminates all active workers

  app.post("/reset", (req, res) => ticketController.reset(req, res));
  // Resets the ticketing system to its initial state

  app.get("/status", (req, res) => ticketController.getStatus(req, res));
  // Retrieves the current status of the ticketing system, including ticket pool size and logs

  // Start the server and listen on the specified port
  const PORT = 5000; // Port on which the server will run
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  // Log the server URL for convenience
}

// Export the initialized components for potential external use
module.exports = { app, createWorker, lock };