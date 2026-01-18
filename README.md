# 📦 Inventory Management System

A full-stack inventory management application built with **Spring Boot** (backend) and **React + TypeScript** (frontend). This project demonstrates CRUD operations, RESTful API design, and object-oriented programming principles.

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Running in GitHub Codespaces](#-running-in-github-codespaces)
- [Starting Frontend and Backend Services](#-starting-frontend-and-backend-services)
- [System Architecture](#-system-architecture)
- [Component Interaction](#-component-interaction)
- [CRUD Workflow](#-crud-workflow)
- [Object-Oriented Principles](#-object-oriented-principles)

---

## 🎯 Project Overview

The **Inventory Management System** is a web application that allows users to manage product inventory through a modern, responsive interface. Users can:

- **Add** new products to the inventory
- **View** all products in list or card format
- **Update** existing product information
- **Delete** products from the inventory

### Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 19, TypeScript, Vite          |
| Backend    | Spring Boot 4.0, Java 17            |
| Database   | H2 (In-memory database)             |
| ORM        | Spring Data JPA                     |
| Build Tool | Maven (Backend), npm (Frontend)     |

---

## 🚀 Running in GitHub Codespaces

GitHub Codespaces provides a complete, configurable development environment in the cloud. Follow these steps to run the project:

### Step 1: Open in Codespaces

1. Navigate to the repository on GitHub
2. Click the green **"Code"** button
3. Select the **"Codespaces"** tab
4. Click **"Create codespace on main"** (or your target branch)
5. Wait for the Codespace to initialize (this may take 1-2 minutes)

### Step 2: Verify Environment

Once the Codespace is ready, open the integrated terminal and verify:

```bash
# Check Java version (should be 17+)
java -version

# Check Node.js version
node -v

# Check npm version
npm -v
```

### Step 3: Proceed to Starting Services

Follow the instructions in the next section to start the backend and frontend services.

---

## ⚙️ Starting Frontend and Backend Services

### Starting the Backend (Spring Boot)

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Build and run the Spring Boot application:**
   
   *Linux/Mac/Codespaces:*
   ```bash
   ./mvnw spring-boot:run
   ```
   
   *Windows:*
   ```bash
   mvnw.cmd spring-boot:run
   ```

3. **Verify the backend is running:**
   - The server starts on `http://localhost:8080`
   - Test the API endpoint: `http://localhost:8080/api/products`

### Starting the Frontend (React + Vite)

1. **Open a new terminal** and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. **Install dependencies** (first time only):
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - The frontend runs on `http://localhost:5173`
   - In Codespaces, a popup will appear to open the forwarded port

### Port Forwarding in Codespaces

GitHub Codespaces automatically detects and forwards ports. You'll see notifications when ports `8080` (backend) and `5173` (frontend) become available. Click **"Open in Browser"** to access each service.

| Service  | Default Port | Purpose              |
|----------|--------------|----------------------|
| Backend  | 8080         | REST API server      |
| Frontend | 5173         | React dev server     |

---

## 🏗️ High-Level System Architecture

The Inventory Management System is designed as a **Full-Stack Client-Server Application** utilizing a RESTful architecture. The system is divided into three distinct layers, ensuring separation of concerns and maintainability:

### Presentation Layer (Frontend)
Developed using **React 19** and **TypeScript**. This layer handles the user interface, state management, and user input validation. It utilizes modern build tools (Vite) for optimized performance and CSS Modules for a custom theme.

### Logic Layer (Backend)
Developed using **Java 17** and **Spring Boot 4.0**. This layer acts as the REST API provider. It receives HTTP requests from the client, processes business logic, and manages data integrity.

### Data Persistence Layer (Database)
An **H2 In-Memory Database** is utilized for storage. This allows the application to be self-contained and portable, perfect for cloud development environments where setting up external database servers is complex. The Backend communicates with this layer using **Spring Data JPA** (Java Persistence API).

---

## 🔄 Interaction: Frontend, Backend, and Codespaces

The development and execution environment relies on **GitHub Codespaces**, which uses Docker containers to create a consistent development environment.

### Codespaces Configuration
A `.devcontainer` configuration file was created to automatically install the specific Java Developer Kit (JDK 17) and Node.js runtime required for the project. This ensures the project runs identically on any machine.

### Communication Flow

- The **Backend** runs on port `8080`, exposing REST endpoints (`/api/products`).
- The **Frontend** runs on port `5173`.

### Proxy Implementation
To solve **Cross-Origin Resource Sharing (CORS)** issues inherent in cloud environments, a Proxy was configured in the frontend (`vite.config.ts`). Any request sent to `/api` is transparently forwarded to the backend at `localhost:8080`. This allows the two separate applications to communicate as if they were one unified system.

---

## 📝 CRUD Workflow Explanation

The application manages the lifecycle of data through four fundamental operations. The workflow emphasizes the transformation of data from **User Input** to **Stored Objects**.

| Operation | Method | Action |
|-----------|--------|--------|
| Create | POST | Add new product |
| Read | GET | Retrieve products |
| Update | PUT/PATCH | Modify existing |
| Delete | DELETE | Remove product |

- **Create (POST):** The user provides raw input (Name, Price, etc.). The Frontend packages this data into a structured format (JSON) and transmits it. The Backend receives this package, maps it to a new Object instance in memory, and persists it to the database.

- **Read (GET):** The system performs a "Select" operation. The Backend queries the database for all available records. These database records are converted into Objects, serialized into a text format, and sent to the Frontend, which renders them visually (as a list or grid).

- **Update (PUT/PATCH):** The user modifies specific fields of an existing item. The system identifies the target Object by its unique Identifier (ID). The Backend retrieves the existing Object from the database, applies the changes to its state, and saves the modified state back to storage.

- **Delete (DELETE):** The user requests the removal of an item. The system locates the Object by its ID and performs a destructive operation in the database, permanently removing the record.

### API Endpoints Summary

| Method | Endpoint            | Description          | Request Body    |
|--------|---------------------|----------------------|-----------------|
| GET    | `/api/products`     | Get all products     | None            |
| GET    | `/api/products/{id}`| Get single product   | None            |
| POST   | `/api/products`     | Create new product   | Product JSON    |
| PUT    | `/api/products/{id}`| Full update          | Product JSON    |
| PATCH  | `/api/products/{id}`| Partial update       | Partial Product |
| DELETE | `/api/products/{id}`| Delete product       | None            |

---

## 🎓 Object-Oriented Principles Used

The design of the backend relies heavily on **Object-Oriented Programming (OOP)** principles to ensure the code is modular, secure, and reusable.

### Encapsulation (Data Hiding)
The system uses Encapsulation to protect the integrity of the data. The internal state of a "Product" (such as its ID or Price) is hidden from the outside world. External classes cannot modify these fields directly; they must use defined methods (Getters/Setters). This ensures that data cannot be corrupted by uncontrolled access.

### Inheritance (Code Reusability)
Instead of writing complex database logic from scratch, the system utilizes Inheritance. The Data Access Layer inherits behaviors from a generic repository framework. By extending to a parent class that already knows how to "Save," "Find," and "Delete," the application inherits robust, tested functionality without writing redundant code.

### Abstraction (Complexity Management)
The system creates an Abstraction layer between the API and the Database. The Frontend (Client) does not know and does not need to know whether the data is stored in a text file, a SQL database, or memory. It simply interacts with abstract endpoints (like "Get Products"). The Controller layer handles the complexity behind the scenes, providing a clean and simple interface for the client.

---

## 🎨 Design & Assumptions

- **Theme:** A customized theme was implemented for a cleaner, modern look compared to standard Bootstrap.
- **User Experience:** A toggle was added to allow users to view data as a list (standard for admin tasks) or cards (visual preference).
- **Data Validation:** Category was made optional to simulate real-world scenarios where grouping might not always be necessary, while Price and Quantity are strictly enforced.

---

## 📁 Project Structure

```
InventoryManagementSystem/
├── backend/
│   ├── src/main/java/com/example/demo/
│   │   ├── DemoApplication.java      # Spring Boot entry point
│   │   ├── Product.java              # Entity class
│   │   ├── ProductController.java    # REST API controller
│   │   └── ProductRepository.java    # Data access interface
│   ├── src/main/resources/
│   │   └── application.properties    # App configuration
│   └── pom.xml                       # Maven dependencies
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx                   # Main React component
│   │   ├── App.css                   # Styling
│   │   └── main.tsx                  # React entry point
│   ├── package.json                  # npm dependencies
│   └── vite.config.ts                # Vite configuration
│
└── README.md                         
```

---

## 📄 License

This project is for educational purposes demonstrating full-stack development and OOP principles.
