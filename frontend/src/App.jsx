import React from "react";
import "./App.css";
import { useTicketSystem } from "./hooks/useTicketSystem";
import ConfigurationForm from "./components/ConfigurationForm";
import ControlButtons from "./components/ControlButtons";
import LogDisplay from "./components/LogDisplay";

/**
 * Main App component for the Real-Time Event Ticketing System.
 *
 * This component serves as the entry point for the application and integrates
 * various subcomponents such as configuration forms, control buttons, and log displays.
 * It utilizes the `useTicketSystem` custom hook to manage application state and system logic.
 */
function App() {
  // Destructure state and functions from the custom hook for easy access
  const {
    status,           // Current system status (e.g., "stopped", "running")
    ticketPool,       // Number of tickets currently in the ticket pool
    logs,             // Array of system log messages
    config,           // Configuration object for the system
    isLoading,        // Boolean indicating if an action is in progress
    handleConfigChange, // Function to handle updates to the configuration
    startSystem,      // Function to start the ticketing system
    stopSystem,       // Function to stop the ticketing system
    resetSystem,      // Function to reset the ticketing system
  } = useTicketSystem();

  return (
    <div className="App">
      {/* Main heading for the application */}
      <h1>Real-Time Event Ticketing System</h1>

      {/* Displays the current system status */}
      <div>
        <strong>Status:</strong> {status}
      </div>

      {/* Displays the current number of tickets in the pool */}
      <div>
        <strong>Ticket Pool:</strong> {ticketPool}
      </div>

      {/* Form for configuring the system parameters */}
      <ConfigurationForm
        config={config} // Passes the current configuration state
        onChange={handleConfigChange} // Handles updates to configuration fields
        disabled={isLoading || status === "running"} // Disables inputs during loading or while running
      />

      {/* Buttons for controlling the system (Start, Stop, Reset) */}
      <ControlButtons
        status={status} // Passes the current system status
        isLoading={isLoading} // Indicates if an action is in progress
        onStart={startSystem} // Starts the system
        onStop={stopSystem} // Stops the system
        onReset={resetSystem} // Resets the system
      />

      {/* Displays the system logs */}
      <LogDisplay logs={logs} />
    </div>
  );
}

export default App;