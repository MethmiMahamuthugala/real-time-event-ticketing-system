package lk.ticketingSystem.CLI;

/**
 * The Customer class represents a consumer in the ticketing system.
 * It continuously retrieves tickets from the TicketPool at a specified rate
 * until interrupted. The class implements the Runnable interface
 * to allow execution in a separate thread.
 */
public class Customer implements Runnable {

    // Reference to the shared TicketPool instance
    private final TicketPool pool;

    // Rate at which tickets are retrieved from the pool (in milliseconds)
    private final int retrievalRate;

    /**
     * Constructs a Customer with a reference to the TicketPool and a ticket retrieval rate.
     *
     * @param pool The shared TicketPool instance from which tickets are retrieved.
     * @param retrievalRate The rate at which tickets are retrieved (in milliseconds).
     */
    public Customer(TicketPool pool, int retrievalRate) {
        this.pool = pool;
        this.retrievalRate = retrievalRate; // Set the retrieval rate
    }

    /**
     * The run method defines the Customer's behavior when executed in a thread.
     * It continuously retrieves tickets from the pool at the specified retrieval rate
     * until the thread is interrupted.
     */
    @Override
    public void run() {
        // Continuously retrieve tickets unless the thread is interrupted
        while (!Thread.currentThread().isInterrupted()) {
            if (!pool.removeTicket()) {
                break; // Exit the loop if ticket retrieval is interrupted
            }
            try {
                // Pause the thread for the specified retrieval rate
                Thread.sleep(retrievalRate);
            } catch (InterruptedException e) {
                // Restore the thread's interrupted status and exit gracefully
                Thread.currentThread().interrupt();
            }
        }
    }
}