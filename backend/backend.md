# CollabSphere Backend

## Overview

The CollabSphere Backend serves as the core server-side component of the platform. It handles user authentication, profile management, friend connections, messaging services, audio/video call integration, database operations, and API communication.

Built using Node.js, Express.js, and MongoDB, the backend provides secure, scalable, and efficient services that support real-time communication and user interactions.

---

# Features

## Authentication & Authorization

- User Registration
- User Login
- User Logout
- JWT-Based Authentication
- Protected Routes
- Secure Session Management

## User Management

- User Profile Creation
- Profile Updates
- Onboarding Workflow
- User Recommendations
- User Search & Retrieval

## Friend & Connection System

- Send Friend Requests
- Accept Friend Requests
- Reject Friend Requests
- Outgoing Requests Management
- Incoming Requests Management
- Friends List Management

## Real-Time Communication

- Integration with Stream Chat
- Private One-to-One Conversations
- Real-Time Messaging Support
- Online/Offline User Presence

## Audio & Video Calling

- Stream Audio Integration
- Stream Video Integration
- Call Creation & Management
- Call Invitation Support

## Database Operations

- User Data Management
- Friend Request Management
- Relationship Management
- Secure Data Storage

## Security Features

- JWT Authentication
- Route Protection Middleware
- Password Security
- Request Validation
- Error Handling Middleware

---

# Technology Stack

## Backend Framework

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose ODM

## Authentication

- JSON Web Token (JWT)

## Real-Time Communication

- Stream Chat API
- Stream Video API

## API Testing

- Postman

---

# Project Structure

```text
backend/
│
├── src/
│
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── chat.controller.js
│   │   └── user.controller.js
│   │
│   ├── lib/
│   │   ├── db.js
│   │   └── stream.js
│   │
│   ├── middleware/
│   │   └── auth.middleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── FriendRequest.js
│   │
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── chat.route.js
│   │   ├── message.route.js
│   │   └── user.route.js
│   │
│   └── server.js
│
└── package.json
```

---

# Folder Description

## controllers/

Contains business logic for handling requests and responses.

- auth.controller.js → Authentication operations
- chat.controller.js → Chat and messaging operations
- user.controller.js → User and friend management operations

## lib/

Utility and configuration files.

- db.js → MongoDB connection setup
- stream.js → Stream API configuration

## middleware/

Application middleware.

- auth.middleware.js → JWT verification and route protection

## models/

Database schemas.

- User.js → User model
- FriendRequest.js → Friend request model

## routes/

API endpoint definitions.

- auth.route.js → Authentication routes
- user.route.js → User routes
- chat.route.js → Chat routes
- message.route.js → Message routes

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

## Navigate to Backend Directory

```bash
cd backend
```

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

Server runs on:

```text
http://localhost:5000
```

---

# Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
```

---

# API Modules

## Authentication APIs

- User Signup
- User Login
- User Logout
- Get Current User

## User APIs

- Update Profile
- Get Recommended Users
- Get Friends
- Get Friend Requests

## Friend Request APIs

- Send Friend Request
- Accept Friend Request
- View Incoming Requests
- View Outgoing Requests

## Chat APIs

- Generate Stream Token
- Access Chat Services
- Messaging Support

---

# Request Processing Workflow

1. Client sends request to API endpoint.
2. Request passes through middleware.
3. JWT authentication is verified.
4. Controller processes business logic.
5. Database operations are performed.
6. Stream services are invoked when required.
7. Response is returned to the client.

---

# Security Measures

- JWT Authentication
- Protected API Routes
- Request Validation
- Authorization Checks
- Secure Token Handling
- Centralized Error Handling

---

# Error Handling

The backend includes centralized error handling for:

- Invalid Requests
- Unauthorized Access
- Missing Resources
- Database Errors
- Internal Server Errors

Each error returns appropriate HTTP status codes and meaningful messages.

---

# Testing

The backend APIs were tested for:

- User Registration
- Login & Logout
- JWT Authentication
- Profile Management
- Friend Requests
- User Retrieval
- Chat Integration
- Error Responses
- Authorization Checks

---

# Future Enhancements

- Group Communication APIs
- File Sharing Support
- Push Notifications
- Activity Analytics
- Advanced Search & Filtering
- Multi-Factor Authentication

---

# Author

CollabSphere Development Team

---

# License

This project is intended for educational and academic purposes.
