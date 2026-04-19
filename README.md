# 🎓 EduTrack

EduTrack is a comprehensive, production-ready **Academic Risk Management Platform** built on the MERN stack. It proactively identifies students at risk of falling behind by analyzing multiple academic metrics (Attendance, Marks, Assignments, and LMS Engagement) and provides actionable insights for both faculty and students.

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

## 🚀 Getting Started

### Prerequisites
*   Node.js installed
*   MongoDB installed locally or a MongoDB Atlas URI

### 1. Clone the Repository
\`\`\`bash
git clone <repository-url>
cd EduTrack
\`\`\`

### 2. Backend Setup
\`\`\`bash
cd backend
npm install
\`\`\`
Create a `.env` file inside the `backend` directory with the following variables:
\`\`\`env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/edutrack
JWT_SECRET=your_super_secret_jwt_key
\`\`\`
Start the backend server:
\`\`\`bash
npm run dev
\`\`\`

### 3. Frontend Setup
Open a new terminal window:
\`\`\`bash
cd frontend
npm install
\`\`\`
Start the Vite development server:
\`\`\`bash
npm run dev
\`\`\`

### 4. Database Seeding (Optional but Recommended)
To test all features, you can instantly generate 100 mock students and 3 faculty accounts.
\`\`\`bash
cd backend
node seed.js
\`\`\`
*This will wipe existing data and populate the DB with rich, realistic data so you can test search, filtering, and charts.*

---

## 🔐 Default Seed Accounts

If you ran the seeder, use these credentials to log in:

**Faculty Coordinator:**
*   Email: `coord@example.com`
*   Password: `password123`

**Faculty Mentor:**
*   Email: `mentor@example.com`
*   Password: `password123`

**Student:**
*   Email: `student1@example.com` (up to `student100@example.com`)
*   Password: `password123`

---
