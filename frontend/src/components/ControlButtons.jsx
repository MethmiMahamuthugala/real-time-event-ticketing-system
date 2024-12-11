import React from "react";

/**
 * A set of control buttons to manage the application's operational state.
 *
 * @param {Object} props - The component properties.
 * @param {string} props.status - Current status of the application (e.g., "running", "stopped").
 * @param {boolean} props.isLoading - Indicates whether an operation is in progress.
 * @param {Function} props.onStart - Handler function for the Start button.
 * @param {Function} props.onStop - Handler function for the Stop button.
 * @param {Function} props.onReset - Handler function for the Reset button.
 */
function ControlButtons({ status, isLoading, onStart, onStop, onReset }) {
  return (
    <div>
      {/* Start button: Enabled only when not loading and the system is not already running */}
      <button onClick={onStart} disabled={isLoading || status === "running"}>
        {/* Button text updates dynamically based on loading state */}
        {isLoading ? "Starting..." : "Start"}
      </button>

      {/* Stop button: Enabled only when not loading and the system is running */}
      <button onClick={onStop} disabled={isLoading || status !== "running"}>
        {/* Button text updates dynamically based on loading state */}
        {isLoading ? "Stopping..." : "Stop"}
      </button>

      {/* Reset button: Disabled only when loading */}
      <button onClick={onReset} disabled={isLoading}>
        {/* Button text updates dynamically based on loading state */}
        {isLoading ? "Resetting..." : "Reset"}
      </button>
    </div>
  );
}

export default ControlButtons;