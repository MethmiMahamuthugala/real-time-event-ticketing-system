// A simple concurrency control utility to ensure critical sections of code
// are executed by only one thread at a time
let isLocked = false; // Boolean flag to indicate if the lock is currently active

const lock = async (fn) => {
  /**
   * The `lock` function ensures that the given asynchronous function `fn`
   * executes in a thread-safe manner, serializing access to critical sections.
   */

  // Check if the lock is active and wait until it's available
  while (isLocked) {
    // Busy-wait with a small delay to avoid excessive CPU usage
    await new Promise((resolve) => setTimeout(resolve, 10));
  }

  // Acquire the lock to block other threads
  isLocked = true;

  try {
    // Execute the critical function `fn` while the lock is held
    const result = await fn();
    return result; // Return the result of the function after execution
  } finally {
    // Release the lock to allow other threads to access the critical section
    isLocked = false;
  }
};

module.exports = { lock }; // Export the `lock` utility for use in other parts of the application