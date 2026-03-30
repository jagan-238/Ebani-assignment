# Ebani-assignment
# 🧑‍💻 Role-Based Dashboard Application

## 📌 Objective

This project is a **Role-Based Dashboard Application** built with authentication and CRUD functionality.
It supports three user roles — **Super Admin, Admin, and User** — with clearly defined access permissions.

The main focus is on **secure backend logic, role-based access control, and clean architecture**.

---

## 🚀 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** JWT (JSON Web Token)
* **Security:** bcrypt (password hashing)
* **API Testing:** Postman

---

## 🔐 Authentication

* Users can log in using **email and password**
* Passwords are securely stored using **bcrypt hashing**
* On successful login, a **JWT token** is generated
* Users are redirected based on their role:

  * Super Admin → Admin Management
  * Admin → User Management
  * User → Personal Dashboard

---

## 👥 Roles & Permissions

### 👑 Super Admin

* Create, view, update, delete **Admins**
* Create, view, update, delete **Users (under any admin)**

---

### 🧑‍💼 Admin

* Create, view, update, delete **Users created by them**
* Cannot access other Admins or their Users

---

### 👤 User

* Login and access personal dashboard
* Perform CRUD operations (Notes module implemented)

---

## 🧩 Features

* 🔐 JWT-based authentication
* 🔑 Role-based access control (RBAC)
* 🧾 CRUD operations for Admin, User, and Notes
* 🚫 Protected routes using middleware
* 📂 Clean and modular folder structure

---

## 📁 Project Structure


```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Create `.env` file

```env
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secure_secret_key
```

---

### 4️⃣ Start server

```bash
npm start
```

---

## 🔗 API Endpoints

### 🔑 Auth

* `POST /login`

---

### 👑 Super Admin

* `POST /admin`
* `GET /admin`
* `PUT /admin/:id`
* `DELETE /admin/:id`

---

### 🧑‍💼 Admin

* `POST /user`
* `GET /user`
* `PUT /user/:id`
* `DELETE /user/:id`

---

### 👤 User (Notes Module)

* `POST /notes`
* `GET /notes`
* `PUT /notes/:id`
* `DELETE /notes/:id`

---

## 🔐 Security

* Passwords are hashed using **bcrypt**
* JWT used for authentication
* Role-based middleware restricts access
* Sensitive data (like password) is never exposed

---

## 🧪 Testing

All APIs are tested using **Postman**:

1. Login → get token
2. Use token in Authorization header
3. Test role-based routes

---

## 🎯 Bonus Features Implemented

* ✅ JWT Authentication
* ✅ Route Protection Middleware
* ✅ Role-Based Access Control
* ✅ Clean Folder Structure

---

## 📊 Evaluation Criteria Covered

* ✔ Clear role-based access control
* ✔ Secure authentication
* ✔ Clean and maintainable code
* ✔ Functional end-to-end flow

---

## 📎 AI Usage

This project was built with the help of AI assistance for:

* Architecture planning
* Code debugging
* Best practices implementation

---

## 🙌 Conclusion

This project demonstrates a **real-world backend system** with:

* Authentication
* Authorization
* Scalable structure
* Secure API design

---

## 👤 Author

**Jagan Mohan Reddy**
