package lk.ticketingSystem.CLI;

/**
 * The Vendor class represents a producer in the ticketing system.
 * It continuously adds tickets to the TicketPool at a specified rate
 * until interrupted. The class implements the Runnable interface
 * to allow concurrent execution in a separate thread.
 */
public class Vendor implements Runnable {

    // Reference to the shared TicketPool instance
    private final TicketPool pool;

    // Rate at which tickets are added to the pool (in milliseconds)
    private final int releaseRate;

    /**
     * Constructs a Vendor with a reference to the TicketPool and a ticket release rate.
     *
     * @param pool The shared TicketPool instance to which tickets are added.
     * @param releaseRate The rate at which tickets are released (in milliseconds).
     */
    public Vendor(TicketPool pool, int releaseRate) {
        this.pool = pool;
        this.releaseRate = releaseRate; // Set the ticket release rate
    }

    /**
     * The run method defines the Vendor's behavior when executed in a thread.
     * It continuously adds tickets to the pool at the specified release rate
     * until the thread is interrupted.
     */
    @Override
    public void run() {
        // Continuously add tickets unless the thread is interrupted
        while (!Thread.currentThread().isInterrupted()) {
            if (!pool.addTickets()) {
                break; // Exit the loop if the ticket addition is interrupted
            }
            try {
                // Pause the thread for the specified release rate
                Thread.sleep(releaseRate);
            } catch (InterruptedException e) {
                // Restore the thread's interrupted status and exit gracefully
                Thread.currentThread().interrupt();
            }
        }
    }
}