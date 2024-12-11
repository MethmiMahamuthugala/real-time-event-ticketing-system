package lk.ticketingSystem.CLI;

import java.io.IOException;
import java.util.Scanner;

/**
 * The TicketingSystem class serves as the entry point for the Real-Time Event Ticketing System.
 * It handles the initialization of configurations, creation of threads for vendors and customers,
 * and user input for starting or stopping the system.
 */
public class TicketingSystem {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Configuration config = new Configuration();

        // Introduction message
        System.out.println("Real-Time Event Ticketing System");
        System.out.println();

        // Configuration setup with input validation
        config.setTotalTickets(getValidInput(scanner, "Enter total tickets:"));
        config.setTicketReleaseRate(getValidInput(scanner, "Enter ticket release rate (milliseconds between vendor actions):"));
        config.setCustomerRetrievalRate(getValidInput(scanner, "Enter customer retrieval rate (milliseconds between customer actions):"));
        config.setMaxTicketCapacity(getValidInput(scanner, "Enter max ticket capacity:"));

        // Save configuration to a JSON file
        try {
            config.saveToFile("config.json");
            System.out.println("Configuration saved successfully.");
        } catch (IOException e) {
            System.out.println("Failed to save configuration.");
        }

        System.out.println();

        // Initialize the TicketPool with the configured total tickets and maximum capacity
        TicketPool pool = new TicketPool(config.getTotalTickets(), config.getMaxTicketCapacity());

        // Create Vendor and Customer threads with their respective rates
        Vendor vendor = new Vendor(pool, config.getTicketReleaseRate());
        Customer customer = new Customer(pool, config.getCustomerRetrievalRate());

        Thread vendorThread = new Thread(vendor);
        Thread customerThread = new Thread(customer);

        // Create a listener thread to monitor the 'e' key press for stopping the system
        Thread stopListener = new Thread(() -> {
            Scanner inputScanner = new Scanner(System.in);
            while (true) {
                String input = inputScanner.nextLine();
                if (input.equalsIgnoreCase("e")) {
                    vendorThread.interrupt(); // Interrupt vendor thread
                    customerThread.interrupt(); // Interrupt customer thread
                    break; // Exit the listener loop
                }
            }
        });

        // Provide instructions for starting or stopping the system
        System.out.println("Type 'start' to begin or 'e' to end.");

        // Main thread handles user commands to start or stop the system
        while (true) {
            String command = scanner.next();
            if (command.equalsIgnoreCase("start")) {
                // Start the threads if they are not already running
                if (!vendorThread.isAlive()) vendorThread.start();
                if (!customerThread.isAlive()) customerThread.start();
                if (!stopListener.isAlive()) stopListener.start();
            } else if (command.equalsIgnoreCase("e")) {
                // Stop the threads and exit the loop
                vendorThread.interrupt();
                customerThread.interrupt();
                break;
            } else {
                // Handle invalid input
                System.out.println("Invalid command. Please type 'start' to begin or 'e' to stop.");
            }
        }

        // Final message and system exit
        System.out.println("System Stopped!");
        System.exit(0);
    }

    /**
     * Helper method to prompt the user for a positive integer input with validation.
     *
     * @param scanner The Scanner instance for user input.
     * @param prompt The prompt message to display to the user.
     * @return A positive integer value entered by the user.
     */
    private static int getValidInput(Scanner scanner, String prompt) {
        int value;
        while (true) {
            System.out.print(prompt);
            try {
                value = Integer.parseInt(scanner.next());
                if (value > 0) {
                    return value; // Return the valid positive integer
                } else {
                    System.out.println("Please enter a positive integer.");
                }
            } catch (NumberFormatException e) {
                System.out.println("Invalid input. Please enter a positive integer.");
            }
        }
    }
}