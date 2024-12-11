package lk.ticketingSystem.CLI;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.FileWriter;
import java.io.IOException;

/**
 * The Configuration class manages the system parameters
 * for the Real-Time Event Ticketing System.
 * It includes ticket-related configuration settings
 * such as the total number of tickets, release rate,
 * customer retrieval rate, and maximum ticket capacity.
 * It also provides functionality to save the configuration
 * to a JSON file for persistence.
 */
public class Configuration {

    // Total number of tickets available in the system
    private int totalTickets;

    // Rate at which tickets are released (e.g., tickets per second)
    private int ticketReleaseRate;

    // Rate at which customers retrieve tickets (e.g., customers per second)
    private int customerRetrievalRate;

    // Maximum ticket capacity the system can handle
    private int maxTicketCapacity;

    // Getters and setters for encapsulated fields

    /**
     * Retrieves the total number of tickets.
     * @return Total tickets available in the system.
     */
    public int getTotalTickets() {
        return totalTickets;
    }

    /**
     * Sets the total number of tickets.
     * @param totalTickets The total number of tickets to be set.
     */
    public void setTotalTickets(int totalTickets) {
        this.totalTickets = totalTickets;
    }

    /**
     * Retrieves the ticket release rate.
     * @return Rate at which tickets are released.
     */
    public int getTicketReleaseRate() {
        return ticketReleaseRate;
    }

    /**
     * Sets the ticket release rate.
     * @param ticketReleaseRate The release rate of tickets to be set.
     */
    public void setTicketReleaseRate(int ticketReleaseRate) {
        this.ticketReleaseRate = ticketReleaseRate;
    }

    /**
     * Retrieves the customer ticket retrieval rate.
     * @return Rate at which customers retrieve tickets.
     */
    public int getCustomerRetrievalRate() {
        return customerRetrievalRate;
    }

    /**
     * Sets the customer ticket retrieval rate.
     * @param customerRetrievalRate The retrieval rate of tickets to be set.
     */
    public void setCustomerRetrievalRate(int customerRetrievalRate) {
        this.customerRetrievalRate = customerRetrievalRate;
    }

    /**
     * Retrieves the maximum ticket capacity of the system.
     * @return Maximum number of tickets the system can handle.
     */
    public int getMaxTicketCapacity() {
        return maxTicketCapacity;
    }

    /**
     * Sets the maximum ticket capacity of the system.
     * @param maxTicketCapacity The maximum ticket capacity to be set.
     */
    public void setMaxTicketCapacity(int maxTicketCapacity) {
        this.maxTicketCapacity = maxTicketCapacity;
    }

    /**
     * Saves the current configuration to a specified JSON file.
     * The configuration is serialized into a human-readable
     * JSON format using Gson.
     *
     * @param filePath Path to the JSON file where the configuration will be saved.
     * @throws IOException If an error occurs while writing to the file.
     */
    public void saveToFile(String filePath) throws IOException {
        // Create a Gson instance with pretty-printing enabled
        Gson gson = new GsonBuilder().setPrettyPrinting().create();

        // Try-with-resources to ensure the FileWriter is closed after use
        try (FileWriter writer = new FileWriter(filePath)) {
            gson.toJson(this, writer); // Serialize this object to JSON and write to the file
        }
    }
}