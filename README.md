# Task Management System Frontend

This is the **frontend** repository for the **Task Management System**, a web-based application designed to help users manage their projects, tasks, and watchlists efficiently. The project uses **React (Next.js)** for the frontend, styled with modern CSS for a clean and intuitive user interface.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

The Task Management System is designed to allow users to:
1. **Create, view, update, and delete projects.**
2. **Manage tasks associated with each project.**
3. **Add tasks to a personalized watchlist for easy access.**
4. **Authenticate and authorize users securely.**

This application serves as the frontend layer, connecting to a **Node.js backend API**.

---

## Features

- User-friendly interface for task and project management.
- Authentication system with token-based login and registration.
- Dynamic project and task handling.
- Watchlist management for quick access to important tasks.

---

## Prerequisites

Ensure you have the following installed:
- **Node.js** (>= 14.0)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)

---

## Installation and Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Taskfy-Task-Management/task-management-frontend.git
   cd task-management-frontend
   ```

2. **Install Dependencies**
   Run the following command to install all necessary dependencies:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env.local` file in the root directory and configure the following environment variables:
   ```env
   NEXT_PUBLIC_BACKEND_API=http://localhost:3000
   ```

   Replace `http://localhost:3000` with the URL of your backend API if hosted remotely.

4. **Run the Development Server**
   Start the local development server:
   ```bash
   npm run dev
   ```

5. **Access the Application**
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Project Structure

Here’s an overview of the key files and directories in the `src` folder:

```
src/
├── components/
│   ├── Navbar.js         # Reusable Navbar component.
│   └── Footer.js         # Footer component for consistent layout.
├── pages/
│   ├── index.js          # Home/landing page with user registration.
│   ├── auth/
│   │   ├── login.js      # Login page for user authentication.
│   │   └── register.js   # Registration page (alternative to home).
│   ├── projects/
│   │   └── index.js      # Main project management page.
│   └── watchlist/
│       └── index.js      # Watchlist management page.
├── services/
│   ├── auth.js           # API service for authentication endpoints.
│   ├── projects.js       # API service for project-related endpoints.
│   └── watchlist.js      # API service for watchlist-related endpoints.
├── styles/
│   ├── global.css        # Global CSS for styling the application.
│   ├── Home.module.css   # Styles specific to the home page.
│   └── Projects.module.css # Styles specific to the projects page.
└── utils/
    ├── auth.js           # Helper functions for authentication.
    └── validation.js     # Reusable validation logic (e.g., email, password).
```

---

## Scripts

- **Start Development Server**
  ```bash
  npm run dev
  ```
  Launches the app in development mode.

- **Build for Production**
  ```bash
  npm run build
  ```
  Compiles the application for production.

- **Start Production Server**
  ```bash
  npm start
  ```
  Runs the compiled application in production mode.

- **Lint Code**
  ```bash
  npm run lint
  ```
  Runs ESLint to ensure code quality and consistency.

---

## Environment Variables

Ensure the following environment variable is configured:
- `NEXT_PUBLIC_BACKEND_API`: The base URL of your backend API (e.g., `http://localhost:3000`).

---

## Usage

1. **Register**
   - Visit the home page or `/auth/register` to create an account.
   - Ensure your email is in a valid format, and your password meets the criteria (e.g., 8 characters, uppercase, lowercase, special character).

2. **Login**
   - Use `/auth/login` to log into the system and access your projects.

3. **Manage Projects**
   - Navigate to `/projects` to create, update, view, and delete projects.

4. **Manage Tasks**
   - Click on a project to view tasks, create new ones, or delete existing ones.

5. **Watchlist**
   - Add tasks to your watchlist and access them via `/watchlist`.

---

## Contributing

We welcome contributions to improve this project! Follow these steps:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes and push:
   ```bash
   git commit -m "Add your message here"
   git push origin feature/your-feature
   ```
4. Submit a pull request.

---


