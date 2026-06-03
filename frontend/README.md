# CollabSphere Frontend

## Overview

CollabSphere is a real-time learning and communication platform that enables users to connect, communicate, and collaborate through secure one-to-one interactions. The frontend provides a responsive and user-friendly interface for authentication, profile management, friend connections, messaging, audio calls, and video calls.

Built with React and Vite, the application delivers a fast and modern user experience while integrating seamlessly with backend services and real-time communication systems.

---

## Features

### User Authentication

* User Registration (Sign Up)
* User Login
* JWT-based Authentication
* Protected Routes
* Secure Session Management

### User Profile Management

* User Onboarding
* Profile Creation and Updates
* Avatar Selection
* Bio and Language Preferences

### Friend & Connection System

* Discover Recommended Users
* Send Friend Requests
* Accept Friend Requests
* Manage Connections
* Friend List Management

### Real-Time Messaging

* One-to-One Chat
* Instant Message Delivery
* Chat History
* Real-Time Updates

### Audio Calling

* One-to-One Audio Calls
* Call Invitation Links
* Mute/Unmute Controls

### Video Calling

* One-to-One Video Calls
* Camera Controls
* Audio Controls
* Call Joining via Shared Links

### User Experience Features

* Responsive Design
* Loading Indicators
* Error Handling
* Modern UI Components
* Theme Management

---

## Technology Stack

### Frontend Framework

* React
* Vite

### Styling

* Tailwind CSS

### State Management

* Zustand

### Server State Management

* React Query (@tanstack/react-query)

### Routing

* React Router DOM

### HTTP Client

* Axios

### Real-Time Communication

* Stream Chat SDK
* Stream Video SDK
* Socket.IO Client

### UI Libraries

* Lucide React Icons
* Framer Motion

---

## Project Structure

```text
frontend/
│
├── public/
│   ├── vc.png
│   └── vite.svg
│
├── src/
│   │
│   ├── assets/
│   │   └── hero-saas-ui.png
│   │
│   ├── components/
│   │   ├── AppNavbar.jsx
│   │   ├── AppSidebar.jsx
│   │   ├── CallButton.jsx
│   │   ├── ChatLoader.jsx
│   │   ├── FriendCard.jsx
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   ├── NoFriendsFound.jsx
│   │   ├── NoNotificationsFound.jsx
│   │   ├── PageLoader.jsx
│   │   └── Sidebar.jsx
│   │
│   ├── constants/
│   │   └── index.js
│   │
│   ├── hooks/
│   │   ├── useAuthUser.js
│   │   ├── useLogin.js
│   │   ├── useLogout.js
│   │   ├── useSignUp.js
│   │   └── useUpdateProfile.js
│   │
│   ├── lib/
│   │   ├── api.js
│   │   ├── axios.js
│   │   ├── utility.js
│   │   └── utils.js
│   │
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SignUpPage.jsx
│   │   ├── OnboardingPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── FriendsPage.jsx
│   │   ├── NotificationsPage.jsx
│   │   ├── ChatPage.jsx
│   │   ├── CallPage.jsx
│   │   └── ProfilePage.jsx
│   │
│   ├── store/
│   │   └── useThemeStore.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── eslint.config.js
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Navigate to Frontend

```bash
cd frontend
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Application will run at:

```text
http://localhost:5173
```

---

## Environment Variables

Create a `.env` file inside the frontend directory.

```env
VITE_API_URL=http://localhost:5000/api
VITE_STREAM_API_KEY=your_stream_api_key
```

---

## Application Workflow

1. User accesses the application.
2. User signs up or logs in.
3. User completes onboarding and profile setup.
4. User discovers and connects with other users.
5. Friend requests are sent and accepted.
6. Connected users can start one-to-one conversations.
7. Users can initiate audio or video calls.
8. Real-time updates are received through Socket.IO and Stream services.

---

## Performance Optimizations

* React Query for caching and optimized fetching.
* Zustand for lightweight state management.
* Reusable component architecture.
* Lazy loading and efficient rendering.
* Optimized API communication using Axios.

---

## Security Features

* JWT Authentication
* Protected Routes
* Secure API Requests
* Authentication State Validation
* Session Management

---

## Future Enhancements

* Group Communication Features
* Screen Sharing
* File Sharing
* Mobile Application Support
* AI-Based User Recommendations
* Multi-Factor Authentication

---

## Author

CollabSphere Development Team

---

## License

This project is intended for educational and academic purposes.
