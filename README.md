# Inventory Management System

A Full-Stack CRUD application built with **Spring Boot (Backend)** and **React TypeScript (Frontend)**. 

## 🚀 Project Overview
This application allows users to manage a product inventory with a modern, user-friendly interface. It demonstrates complete End-to-End functionality including:

- **Create:** Add new products (Name, Price, Quantity are mandatory; Category is optional).
- **Read:** Toggle between a **Database List View** (Table) and a **Card View** (Grid).
- **Update:** Edit existing product details.
- **Delete:** Remove products from the inventory with confirmation.

## 🛠 Tech Stack
- **Backend:** Java 17, Spring Boot 3.4, H2 Database (In-Memory), Spring Data JPA.
- **Frontend:** React 18, TypeScript, Vite, CSS Modules.
- **Environment:** Docker-based GitHub Codespaces (DevContainer).

## ⚙️ How to Run in GitHub Codespaces

### 1. Start the Backend
Open the **Terminal** and run the following commands:
```bash
cd backend
mvn spring-boot:run
```

### 2. Start the Frontend
Open a **New Terminal** (click the `+` icon) and run:
```bash
cd frontend
npm install
npm run dev
```

### 3. Open the Application
*   A popup will appear saying "Open in Browser". Click it.

## 📡 API Endpoints (Backend)
The Spring Boot backend exposes the following REST endpoints at `/api/products`:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Retrieve all products |
| `GET` | `/api/products/{id}` | Retrieve a single product by ID |
| `POST` | `/api/products` | Create a new product |
| `PUT` | `/api/products/{id}` | Update an entire product |
| `PATCH` | `/api/products/{id}` | Partially update a product |
| `DELETE` | `/api/products/{id}` | Delete a product |

## 🎨 Design & Assumptions
- **Theme:** A customized theme was implemented for a cleaner, modern look compared to standard Bootstrap.
- **User Experience:** A toggle was added to allow users to view data as a list (standard for admin tasks) or cards (visual preference).
- **Data Validation:** Category was made optional to simulate real-world scenarios where grouping might not always be necessary, while Price and Quantity are strictly enforced.
