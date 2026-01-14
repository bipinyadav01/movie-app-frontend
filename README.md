# 📄 README for FRONTEND  
👉 **Repository:** `movie-app-frontend`

```md
# Movie App Frontend (React)

## 📌 Project Overview
This is the frontend of the Movie Management Application built using **React.js** and **Material UI**.  
It interacts with the backend APIs to provide authentication, movie listing, search, sorting, and admin management features.

---

## 🚀 Features
- User Registration & Login
- JWT-based Authentication
- Role-Based UI (Admin / User)
- Admin can:
  - Add movies
  - Edit movies
  - Delete movies
- Users can:
  - View movies
  - Search movies
  - Sort movies
  - Pagination
- Protected Routes
- Clean and responsive UI

---

## 🛠 Tech Stack
- React.js
- Material UI (MUI)
- Axios
- React Router DOM
- Context API
- Vercel (Deployment)

---

## 👤 Role-Based Access
### Admin
- Dashboard access
- Movie CRUD operations

### User
- Movie listing
- Search, sort, pagination

---

## 🔐 Authentication Flow
- User logs in
- JWT token stored in localStorage
- Token sent in headers for protected API calls
- UI rendered based on user role

---

## 🔗 Backend Integration
Frontend communicates with backend using Axios.

Backend Base URL:https://movie-app-backend-du4x.onrender.com/api

## ▶️ Run Frontend Locally
```bash
npm install
npm start
