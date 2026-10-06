# Task Manager APP

A backend API for managing tasks by authenticated users.

The project allows authenticated users create tasks, fetch, update and delete tasks

## Features

- User authentication with JWT
- Task creation and ownership
- Sorted task retrieval
- Task update and deletion

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JavaScript
- JWT 
- bcrypt

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/Steve-bankz/task-manager.git
cd Task-Manager-App-CV
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

create a `.env` file in the project root.

Example:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=yourSuperSecretKey
```

### 4. Start the server

```bash
npm run dev
```

## API Structure

The API is versioned under:

```text
/api/v1
```
Main resource groups include:

```text
/api/v1/task
/api/v1/users
/api/v1/login
```