package lk.ticketingSystem.CLI;

import java.util.LinkedList;
import java.util.Queue;

/**
 * The TicketPool class manages a pool of tickets for the Real-Time Event
 * Ticketing System. It supports synchronized operations for adding and
 * removing tickets, ensuring thread safety and adherence to the
 * producer-consumer pattern.
 */
public class TicketPool {

    // Queue to hold the tickets in the pool
    private final Queue<Integer> tickets = new LinkedList<>();

    // Maximum number of tickets the pool can hold
    private final int maxCapacity;

    // Counter to generate unique ticket IDs
    private int nextTicketId;

    /**
     * Constructs a TicketPool with an initial number of tickets and a maximum capacity.
     *
     * @param initialTickets Initial number of tickets to populate the pool.
     * @param maxCapacity Maximum number of tickets the pool can hold.
     */
    public TicketPool(int initialTickets, int maxCapacity) {
        this.maxCapacity = maxCapacity;
        this.nextTicketId = 1;

        // Initialize the pool with up to the maximum capacity
        for (int i = 0; i < Math.min(initialTickets, maxCapacity); i++) {
            tickets.add(nextTicketId++);
        }
    }

    /**
     * Adds a ticket to the pool. This method blocks if the pool is full
     * until space becomes available.
     *
     * @return True if the ticket was added successfully, false if interrupted.
     */
    public synchronized boolean addTickets() {
        // Block if the pool is at maximum capacity
        while (tickets.size() >= maxCapacity) {
            try {
                System.out.println("TICKET POOL IS FULL! VENDORS CANNOT ADD TICKETS!");
                wait(); // Wait until space becomes available
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt(); // Restore interrupt status
                return false;
            }
        }

        // Add a new ticket to the pool
        tickets.add(nextTicketId++);
        System.out.println("Vendor added Ticket " + (nextTicketId - 1) + ". Current tickets: " + tickets.size());

        // Notify waiting threads that tickets have been added
        notifyAll();
        return true;
    }

    /**
     * Removes a ticket from the pool. This method blocks if the pool is empty
     * until a ticket becomes available.
     *
     * @return True if a ticket was removed successfully, false if interrupted.
     */
    public synchronized boolean removeTicket() {
        // Block if the pool is empty
        while (tickets.isEmpty()) {
            try {
                System.out.println("TICKET POOL IS EMPTY! CUSTOMERS CANNOT PURCHASE TICKETS!");
                wait(); // Wait until tickets become available
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt(); // Restore interrupt status
                return false;
            }
        }

        // Remove and retrieve the first ticket from the pool
        int ticket = tickets.poll();
        System.out.println("Customer purchased Ticket " + ticket + ". Current tickets: " + tickets.size());

        // Notify waiting threads that a ticket has been removed
        notifyAll();
        return true;
    }
}