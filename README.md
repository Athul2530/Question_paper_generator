# Question Paper Generator

An intelligent web application that automates the generation of question papers based on **marks distribution, subject, and difficulty level**.  
Teachers can create, submit, and manage question papers, while admins can review and approve them.

---

## 🚀 Features
- 📑 **Automatic Question Paper Generation** – Generates papers with configurable marks (20, 50, 100).  
- 🎯 **Customizable Questions** – Choose number of 2-mark and 10-mark questions.  
- 📚 **Subject-wise Paper Creation** – Supports multiple subjects and categories.  
- 👨‍🏫 **Teacher Dashboard** – Teachers can submit question papers for approval.  
- ✅ **Admin Approval System** – Admin can approve/reject papers with feedback.  
- 💾 **Database Support** – Stores generated papers and approval status.  

---

## 🛠️ Tech Stack
- **Frontend:** React.js, Tailwind CSS, Material-UI  
- **Backend:** Node.js (Express.js)  
- **Database:** MongoDB Atlas  
- **Authentication:** JWT (JSON Web Tokens)  

---

## 📂 Project Structure
QuestionPaperGenerator/
│── backend/ # Node.js backend APIs
│ ├── controllers/ # Business logic
│ ├── routes/ # API routes
│ ├── models/ # MongoDB schemas
│ └── generateRoutes.js # Question generation logic
│
│── frontend/ # React frontend
│ ├── components/ # UI components
│ ├── pages/ # Teacher/Admin dashboards
│ └── utils/ # Helper functions
│
│── database/ # MongoDB collections
│── README.md # Project documentation
