const BASE_URL = "http://localhost:5000"; // Base URL for the ticket system API

/**
 * Starts the ticket system with the given configuration.
 *
 * @param {Object} config - Configuration object containing:
 *  - vendors: Number of vendors in the system.
 *  - customers: Number of customers in the system.
 *  - totalTickets: Total number of tickets available.
 *  - maxTicketCapacity: Maximum capacity for ticket storage.
 *  - ticketReleaseRate: Interval (in ms) for releasing tickets.
 *  - customerRetrievalRate: Interval (in ms) for customers retrieving tickets.
 *
 * @returns {Promise<Object>} The response data from the API.
 * @throws {Error} If the API request fails or returns an error.
 */
export const startSystem = async (config) => {
  const response = await fetch(`${BASE_URL}/start`, {
    method: "POST", // HTTP POST method to send configuration data
    headers: { "Content-Type": "application/json" }, // Specifies JSON payload
    body: JSON.stringify({
      vendors: config.vendors,
      customers: config.customers,
      total: config.totalTickets,
      capacity: config.maxTicketCapacity,
      ticketReleaseRate: config.ticketReleaseRate,
      customerRetrievalRate: config.customerRetrievalRate
    })
  });

  if (!response.ok) {
    // Handle errors by parsing the response for a specific error message
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to start the system");
  }

  // Return parsed response JSON on success
  return response.json();
};

/**
 * Stops the ticket system.
 *
 * Sends a request to the API to stop the system. This is typically used
 * to halt all ticket-related operations.
 *
 * @returns {Promise<Object>} The response data from the API.
 * @throws {Error} If the API request fails or returns an error.
 */
export const stopSystem = async () => {
  const response = await fetch(`${BASE_URL}/stop`, {
    method: "POST", // HTTP POST method to trigger the stop operation
    headers: { "Content-Type": "application/json" }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to stop the system");
  }

  return response.json();
};

/**
 * Resets the ticket system.
 *
 * This operation clears all current tickets, logs, and system state, restoring
 * the system to its initial state.
 *
 * @returns {Promise<Object>} The response data from the API.
 * @throws {Error} If the API request fails or returns an error.
 */
export const resetSystem = async () => {
  const response = await fetch(`${BASE_URL}/reset`, {
    method: "POST", // HTTP POST method to reset the system
    headers: { "Content-Type": "application/json" }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to reset the system");
  }

  return response.json();
};

/**
 * Fetches the current system status.
 *
 * Retrieves details about the ticket pool, logs, and overall system status.
 * This is typically called periodically to keep the UI updated.
 *
 * @returns {Promise<Object>} The response data containing system status details.
 * @throws {Error} If the API request fails.
 */
export const fetchSystemStatus = async () => {
  const response = await fetch(`${BASE_URL}/status`); // HTTP GET request to fetch status

  if (!response.ok) {
    throw new Error("Failed to fetch system status");
  }

  return response.json();
};