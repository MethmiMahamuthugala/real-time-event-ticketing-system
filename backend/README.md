**README for Backend**

**Description**
This is the Node.js backend for the Real-Time Event Ticketing System. It implements the core business logic for ticket management, supports API endpoints for system control, and enables multi-threaded operations using worker threads.

---

**Setup**
1. **Navigate to the backend directory**
    - Use the `cd` command to navigate to the `backend` directory 
    of the project. For example:
        cd Real-Time Event Ticketing System/backend

2. **Install dependencies**
    npm install

3. **Start the server**
    node src\server.js

---

**Features**
- RESTful API endpoints for system control (start, stop, reset, status).
- Multi-threaded ticket handling using worker threads.
- Centralized concurrency management with locks.

---

**Prerequisites**
- Node.js v14 or above.
- npm installed.
- Command Prompt, terminal, or similar shell environment.

---

**Usage Instructions**
1. Start the server on localhost (http://localhost:5000) using the commands provided in the
**Setup** section.
2. Use Postman or similar tools to interact with the API:
- Start system: POST /start
- Stop system: POST /stop
- Reset system: POST /reset
- Get status: GET /status

---

**Troubleshooting**
- Check logs for API errors.
- Verify worker thread functionality with sufficient system resources.
- Ensure correct CORS configurations when connecting to the frontend (http://localhost:5173).