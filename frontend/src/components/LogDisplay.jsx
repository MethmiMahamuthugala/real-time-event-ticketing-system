import React from "react";

/**
 * A component to display a list of log messages.
 *
 * @param {Object} props - The component properties.
 * @param {Array<string>} props.logs - An array of log messages to display.
 */
function LogDisplay({ logs }) {
  return (
    <div className="logs-section">
      {/* Section header for the logs display */}
      <h2>Logs</h2>

      {/* Unordered list to render log messages */}
      <ul>
        {logs.map((log, index) => (
          // Each log is rendered as a list item
          // The `key` ensures React can efficiently update the DOM
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
}

export default LogDisplay;