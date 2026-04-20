# 🎓 EduTrack

EduTrack is a comprehensive, production-ready **Academic Risk Management Platform** built on the MERN stack. It proactively identifies students at risk of falling behind by analyzing multiple academic metrics (Attendance, Marks, Assignments, and LMS Engagement) and provides actionable insights for both faculty and students.

---

## 🌐 Live Demo

👉 **Live Project:** https://edu-track-frontend.vercel.app/

---

## ✨ Features

### 🛡️ Role-Based Access Control (RBAC)
*   **Faculty Members:** (Coordinators, Mentors, Teachers) Can view student directories, log interventions, export data, and send real-time alerts.
*   **Students:** Have a dedicated, gamified dashboard showing their performance, risk level, and a dynamically generated "Personalized Action Plan" advising them on how to improve.

### 🧠 Dynamic Risk Calculator
*   Automatically evaluates student metrics against dynamic thresholds.
*   Categorizes students into **High**, **Medium**, or **Low** risk, providing instant visibility into who needs help the most.

### 🛠️ Intervention Tracking System
*   Faculty can log counseling sessions or remarks.
*   The system takes an **Academic Snapshot** at the time of intervention, allowing educators to compare Pre-Intervention vs. Post-Intervention performance seamlessly.

### 🔔 Real-Time Notification Engine
*   Faculty can trigger an "In-App Alert" to a student with a single click.
*   Students receive glowing, persistent warning banners on their dashboards urging them to take action.

### 🎨 Premium UI/UX
*   Built with a breathtaking modern dark theme using **Tailwind CSS**.
*   Smooth hover states, micro-animations, and glassmorphic elements for a cutting-edge feel.

---

## 💻 Tech Stack

**Frontend:**
*   React (Vite)
*   Tailwind CSS (Styling)
*   Lucide React (Icons)
*   Axios (HTTP requests)
*   React Router DOM (Navigation)

**Backend:**
*   Node.js & Express.js
*   MongoDB & Mongoose (Database)
*   JSON Web Tokens (JWT) for secure authentication
*   Bcrypt.js (Password hashing)

---

### 🚀 Getting Started

### Prerequisites

* Node.js
* MongoDB (local or Atlas)

---

### 1. Clone Repository

```bash
git clone <repository-url>
cd EduTrack
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_super_secret_jwt_key
```

Run backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` directory:

```env
VITE_BACKEND_URL=https://your-backend-url
```

Run frontend:

```bash
npm run dev
```


### 4. Database Seeding (Optional)

```bash
cd backend
node seed.js
```

---

## 🔐 Default Seed Accounts

### 👨‍🏫 Coordinator

* Email: `coord@example.com`
* Password: `password123`

### 👨‍🏫 Mentor

* Email: `mentor@example.com`
* Password: `password123`

### 👨‍🏫 Teacher

* Email: `teacher@example.com`
* Password: `password123`

### 🎓 Student

* Email: `student1@example.com` → `student100@example.com`
* Password: `password123`

---

## 👥 Contributors

### **Team Anant**

* Mandeep Parmar
* Bhaumik Parghi
* Mansi Patel
* Archi Patel

---

## 💡 Final Note

> EduTrack doesn’t just detect academic problems — it provides
> **actionable insights and measurable improvement tracking**.
