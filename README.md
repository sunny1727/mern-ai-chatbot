# MERN AI Chatbot

A professional full-stack AI chatbot application built using the MERN stack. The project integrates the Google Gemini API to provide real-time, systematic responses with persistent chat history and secure user authentication.

## ✨ Features

- Secure Authentication: JWT-based Login and Register system with Bcrypt password hashing.
- AI Chat Integration: Real-time responses powered by Google Gemini API.
- Persistent History: Full CRUD implementation using MongoDB Atlas to store and retrieve chat data.
- Advanced UI: Premium dark-themed interface with animated borders and shimmer text effects.
- Fully Responsive: Optimized for all devices with a custom Hamburger Menu for mobile users.
- Utility Tools: One-click copy icons for AI messages and a "New Chat" session clear feature.

## 🛠 Tech Stack

- Frontend: React.js (Vite), HTML5, CSS3 (Advanced Animations), Axios, React-Markdown.
- Backend: Node.js, Express.js.
- Database: MongoDB Atlas (Cloud).
- Security: JSON Web Token (JWT), Bcrypt.js.
- API: Google Gemini API.

## 🚀 Quick Setup

1. **Clone the Repo:**
   - git clone https://github.com/your-username/mern-ai-chatbot.git

2. **Backend Configuration:**
   - Navigate to `/backend`.
   - Create a `.env` file and add:
     - `MONGO_URI`
     - `JWT_SECRET`
     - `GEMINI_API_KEY`
   - Run `npm install` and `node server.js`.

3. **Frontend Configuration:**
   - Navigate to `/frontend`.
   - Run `npm install`.
   - Use `npm run dev` to start the development server.

---
**Developed by Sunny Singh**