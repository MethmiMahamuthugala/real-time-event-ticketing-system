import { useState, useEffect, useCallback } from "react";
import * as TicketService from "../services/ticketService";

/**
 * Custom React hook to manage the ticket system state and operations.
 *
 * This hook encapsulates the logic for managing configuration, system status,
 * and interacting with the ticket service API, providing a clean interface
 * for components to use.
 *
 * @returns {Object} The state and functions needed to manage the ticket system.
 */
export const useTicketSystem = () => {
  // State variables for system status, ticket pool, logs, loading indicator, and configuration
  const [status, setStatus] = useState("stopped"); // Tracks the current system state
  const [ticketPool, setTicketPool] = useState(0); // Holds the number of tickets in the pool
  const [logs, setLogs] = useState([]); // Stores log messages
  const [isLoading, setIsLoading] = useState(false); // Indicates whether an operation is in progress
  const [config, setConfig] = useState({
    totalTickets: "",
    maxTicketCapacity: "",
    vendors: "",
    customers: "",
    ticketReleaseRate: "",
    customerRetrievalRate: ""
  });

  /**
   * Updates the configuration state when an input field changes.
   * Converts input values to numbers unless the field is empty.
   *
   * @param {Object} e - The event object from the input field.
   */
  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: value === "" ? "" : Number(value)
    }));
  };

  /**
   * Starts the ticket system with the current configuration.
   * Validates the configuration before making an API call.
   */
  const startSystem = useCallback(async () => {
    if (!validateConfig()) return; // Prevents starting if configuration is invalid

    setIsLoading(true); // Shows loading state
    try {
      const data = await TicketService.startSystem(config); // Calls the API
      setStatus("running"); // Updates status on success
      console.log(data.message); // Logs the success message
    } catch (error) {
      alert(error.message); // Alerts on error
    } finally {
      setIsLoading(false); // Hides loading state
    }
  }, [config]);

  /**
   * Stops the ticket system by calling the appropriate API endpoint.
   */
  const stopSystem = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await TicketService.stopSystem();
      setStatus("stopped");
      console.log(data.message);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Resets the ticket system to its initial state.
   * Resets local state variables and makes an API call.
   */
  const resetSystem = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await TicketService.resetSystem();
      setStatus("stopped");
      setTicketPool(0);
      setLogs([]);
      console.log(data.message);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Validates that all configuration fields are filled with valid values.
   *
   * @returns {boolean} True if configuration is valid, false otherwise.
   */
  const validateConfig = () => {
    const {
      totalTickets,
      maxTicketCapacity,
      vendors,
      customers,
      ticketReleaseRate,
      customerRetrievalRate
    } = config;

    if (!totalTickets || !maxTicketCapacity || !vendors || !customers || !ticketReleaseRate || !customerRetrievalRate) {
      alert("Please fill in all configuration fields.");
      return false;
    }
    return true;
  };

  /**
   * Fetches the current system status, including ticket pool and logs.
   * Periodically updates the state with the latest data.
   */
  const fetchStatus = useCallback(async () => {
    try {
      const data = await TicketService.fetchSystemStatus();
      setTicketPool(data.ticketPool); // Updates ticket pool
      setLogs(data.logs); // Updates logs
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  }, []);

  /**
   * Sets up an interval to periodically fetch system status.
   * Cleans up the interval when the component using this hook unmounts.
   */
  useEffect(() => {
    fetchStatus(); // Initial fetch on mount
    const interval = setInterval(fetchStatus, 2000); // Fetch status every 2 seconds
    return () => clearInterval(interval); // Clear interval on unmount
  }, [fetchStatus]);

  return {
    status, // Current system status
    ticketPool, // Number of tickets in the pool
    logs, // Array of log messages
    config, // Configuration object
    isLoading, // Loading state
    handleConfigChange, // Function to update configuration
    startSystem, // Function to start the system
    stopSystem, // Function to stop the system
    resetSystem // Function to reset the system
  };
};
