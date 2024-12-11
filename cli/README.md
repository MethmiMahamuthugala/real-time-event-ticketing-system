**README for CLI**

**Description**
The CLI implementation of the Real-Time Event Ticketing System enables basic ticket management functionalities, including real-time ticket generation and customer retrieval. It serves as the foundation for simulating ticket operations using Java, with features like multi-threading and synchronization for high efficiency.

---

**Setup**

1. **Navigate to the Project Directory**
   - Open the Command Prompt or terminal.
   - Use the `cd` command to navigate to the `cli` directory of the project. For example:
    
     cd Real-Time Event Ticketing System/cli
    

2. **Compile the Code**
   - Compile the CLI source code, including the Gson library, by running the following command:
    
     javac -cp "libs/gson-2.11.0.jar" -d . src/lk/ticketingSystem/CLI/*.java

   - This will compile all Java files in the `src/lk/ticketingSystem/CLI` directory and output the `.class` files into the appropriate package structure.

4. **Run the Application**
   - Execute the compiled CLI application using the following command:
     
     java -cp ".;libs/gson-2.11.0.jar" lk.ticketingSystem.CLI.TicketingSystem


---

**Features**
- Real-time ticket generation.
- Multi-threading to handle ticket vendor and customer threads.
- Synchronized access to shared resources using locks.
- Logging to track ticket operations and system status.

---

**Prerequisites**
- JDK 11 or above installed.
- Gson library (downloaded and placed in the `libs` folder).
- Command Prompt, terminal, or similar shell environment.

---

**Usage Instructions**
1. Run the program using the commands provided in the **Setup** section.
2. Configure parameters (e.g., number of vendors/customers) within the application.
3. Type "start" to start and "e" to end
4. Monitor logs and operations directly in the console

---

**Troubleshooting**
- **Gson Class Not Found:** Ensure the `gson-2.11.0.jar` file exists in the `libs` folder and that the classpath is correctly specified in the `javac` and `java` commands.

- **Compilation Errors:** Verify all source files are present in the correct directory and package structure.

- **Java Not Recognized:** Ensure Java is installed and added to the system PATH. You can verify by running:
  java -version

- **File Path Issues:** If your project directory contains spaces or special characters, ensure the paths are enclosed in quotes (e.g., `"Real-Time Event Ticketing System/cli/"`).

- Ensure proper synchronization to avoid race conditions.
- Check the thread pool configuration for optimal performance.
- Verify that logs are written correctly for debugging.