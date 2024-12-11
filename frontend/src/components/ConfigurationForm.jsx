import React from "react";

/**
 * A form component to manage configuration settings for an application.
 *
 * @param {Object} props - The component properties.
 * @param {Object} props.config - The current configuration state to display and edit.
 * @param {Function} props.onChange - Event handler for updating configuration values.
 * @param {boolean} props.disabled - A flag to disable all input fields, typically for read-only or loading states.
 */
function ConfigurationForm({ config, onChange, disabled }) {
  return (
    <div className="config-section">
      {/* Section header for clarity */}
      <h2>Configuration Settings</h2>
      <form>
        {/* Input for configuring total tickets */}
        <label>Total Tickets:</label>
        <input
          type="number" // Ensures input only accepts numerical values
          name="totalTickets" // Matches the config key to update
          value={config.totalTickets} // Reflects the current value from props
          onChange={onChange} // Triggers the handler when value changes
          disabled={disabled} // Disables input if `disabled` is true
        />
        <br />

        {/* Input for setting the maximum ticket capacity */}
        <label>Max Ticket Capacity:</label>
        <input
          type="number"
          name="maxTicketCapacity"
          value={config.maxTicketCapacity}
          onChange={onChange}
          disabled={disabled}
        />
        <br />

        {/* Input for specifying the number of vendors */}
        <label>Number of Vendors:</label>
        <input
          type="number"
          name="vendors"
          value={config.vendors}
          onChange={onChange}
          disabled={disabled}
        />
        <br />

        {/* Input for specifying the number of customers */}
        <label>Number of Customers:</label>
        <input
          type="number"
          name="customers"
          value={config.customers}
          onChange={onChange}
          disabled={disabled}
        />
        <br />

        {/* Input for ticket release rate in milliseconds */}
        <label>Ticket Release Rate (ms):</label>
        <input
          type="number"
          name="ticketReleaseRate"
          value={config.ticketReleaseRate}
          onChange={onChange}
          disabled={disabled}
        />
        <br />

        {/* Input for customer retrieval rate in milliseconds */}
        <label>Customer Retrieval Rate (ms):</label>
        <input
          type="number"
          name="customerRetrievalRate"
          value={config.customerRetrievalRate}
          onChange={onChange}
          disabled={disabled}
        />
        <br />
      </form>
    </div>
  );
}

export default ConfigurationForm;