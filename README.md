# 📝 Todo List App

A full-stack Todo List application built with Node.js, Express, and PostgreSQL on the backend, and React (Vite) on the frontend. This app allows users to add, edit, delete, and manage their tasks efficiently.

## ⚡ Features

- ✅ Add tasks
- ✏️ Edit tasks
- ❌ Delete tasks
- 📌 Mark tasks as completed
- 📂 Persistent storage with PostgreSQL

## 🛠️ Tech Stack

Frontend :
- React
- Vite
- CSS

Backend :
- Node.js
- Express.js
- PostgreSQL

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/your-username/todo-list-app.git
cd todo-list-app
```

## 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```ini
PORT=3000
DATABASE_URL=your_postgres_connection_string
```

Run the backend:

```bash
npm run dev
```

## 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend will run on :
```
http://localhost:5173
```

Backend will run on :
```
http://localhost:3000
```