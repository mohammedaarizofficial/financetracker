# 💰 Finance Tracker

A modern full-stack **Finance Tracker Web Application** built with:

- ⚛️ React + TypeScript (Vite)
- 🎨 Tailwind CSS + shadcn/ui
- 📊 Recharts
- 🟢 Node.js + Express
- 🍃 MongoDB + Mongoose
- 🔐 JWT Authentication

This application allows users to securely manage their **income and expenses**, visualize financial insights using charts, and monitor their balance in a clean, modern dark UI.

---

# 🌍 Live Demo

🚀 **Live Website:**  
👉 https://financetracker-wine.vercel.app/

⚠ Backend may take 20–30 seconds to initialize on first request due to free-tier hosting cold starts.

---

# 🏗️ Deployment Architecture

This project is fully deployed using modern cloud platforms:

- 🌐 **Frontend:** Hosted on **Vercel**
- 🖥️ **Backend API:** Hosted on **Railway**
- 🍃 **Database:** Hosted on **MongoDB Atlas (Cloud)**

### Architecture Flow

User Browser
↓
Vercel(Frontend-React+Tailwind)
↓
Railway(Backend-Express API)
↓
MongoDB Atlas(Cloud Database)

---

# 🚀 Features

## 🔐 Authentication
- JWT-based authentication
- Protected routes
- Secure API access with token verification
- Token-based session handling

---

## 💵 Income & Expense Management
- Add income
- Add expenses
- Update transactions
- Delete transactions
- Real-time UI updates using Context API

---

## 📊 Dashboard & Analytics
- Total Income Card
- Total Expense Card
- Current Balance
- Line Chart (Income vs Expenses trend)
- Pie Chart (Expenses by Category)
- Recent Transactions List

---

## 🎨 Modern UI
- Built with **Tailwind CSS**
- Styled using **shadcn/ui components**
- Fully responsive layout
- Dark aesthetic design
- Modern typography
- Interactive charts

---

# 🛠️ Tech Stack

## 🔵 Frontend (Hosted on Vercel)

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Recharts
- React Router DOM
- Lucide React (Icons)
- Radix UI
- React Hook Form
- Zod (Validation)
- TanStack React Query

---

## 🟢 Backend (Hosted on Railway)

- Node.js
- Express.js
- MongoDB (Atlas Cloud)
- Mongoose
- JWT Authentication
- Custom Middleware (Token Verification)
- RESTful API Architecture

---

## 🍃 Database (Hosted on MongoDB Atlas)

- Cloud-hosted MongoDB cluster
- Secure database user authentication
- IP access configuration
- Production-ready database setup

---

# 🔐 Authentication Flow

1. User logs in via frontend (Vercel).
2. Request sent to Railway backend.
3. Backend verifies credentials.
4. JWT token generated.
5. Token stored in browser.
6. Protected routes validate token.
7. Financial data securely fetched from MongoDB Atlas.

---

# 📊 Charts Implementation

### 📈 Line Chart
Displays Income vs Expense trends over time.

### 🥧 Pie Chart
Displays expense distribution by category.

Charts are built using **Recharts** and dynamically calculated from state.

---

# 🧠 State Management

Financial data is managed globally using:

- React Context API
- useState
- useEffect

This ensures:

- Centralized state management
- Real-time UI updates
- Clean architecture without prop drilling

---

# 🚀 Deployment Details

### Frontend Deployment (Vercel)
- Built using Vite
- Environment variables configured via Vercel dashboard
- SPA routing handled using `vercel.json` rewrites
- Automatic CI/CD from GitHub

### Backend Deployment (Railway)
- Node.js service deployment
- Environment variables configured in Railway
- MongoDB Atlas connection via cloud URI
- CORS configured for Vercel domain

### Database Deployment (MongoDB Atlas)
- Free-tier cluster
- Cloud-hosted
- Production connection string secured via environment variables

---

# 📌 Core Concepts Demonstrated

- Full-stack architecture
- Cloud deployment (Vercel + Railway + Atlas)
- Secure authentication with JWT
- RESTful API design
- Data visualization
- Context-based state management
- TypeScript safety
- Modern UI/UX design
- Environment-based configuration

---

# 🚀 Future Improvements

- Budget planning module
- Monthly analytics comparison
- PDF financial reports
- Category customization
- Role-based user access
- Advanced filtering & sorting

---

# 👨‍💻 Author

By Mohammed Aariz

Built as a full-stack financial tracking application demonstrating scalable architecture, secure authentication, and modern cloud deployment practices.

---

⭐ If you found this project helpful, consider giving it a star!
