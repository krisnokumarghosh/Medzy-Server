<div align="center">

<img src="https://img.shields.io/badge/Medzy-Backend%20API-0ea5e9?style=for-the-badge&logo=express&logoColor=white" alt="Medzy Backend Banner" />

# 🏥 Medzy — Backend API

### RESTful API server powering the Medzy doctor appointment platform.

![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-d63aff?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

</div>

---

## 📌 Overview

This is the backend server for **Medzy** — a doctor appointment web application. It provides a secure REST API built with **Express.js** and **MongoDB**, handling doctor listings, appointment bookings, and JWT-based user authentication.

> 🖥️ **Frontend Repository:** [Medzy Client →](https://github.com/krisnokumarghosh/A09-Medzy)
> 🌐 **Frontend Live Site:** [Visit Medzy →](https://medzy-iota.vercel.app/)

---

## 🌐 Live API Base URL

🔗 **[Visit Medzy →](https://medzy-server.vercel.app)**


---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB (Native Driver) |
| **Authentication** | JWT (JSON Web Tokens) |

---

## 📦 NPM Packages Used

| Package | Purpose |
|---------|---------|
| [`dotenv`](https://www.npmjs.com/package/dotenv) | Loads environment variables from `.env` file |
| [`cors`](https://www.npmjs.com/package/cors) | Enables Cross-Origin Resource Sharing for frontend communication |

---

## 🔗 API Endpoints

### 🩺 Doctors

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/rated-doctors` | Fetch selected top-rated doctors for the homepage |
| `GET` | `/all-doctors` | Fetch all available doctors |
| `GET` | `/all-doctors/:id` | Fetch a single doctor's details by ID |

---

### 📅 Bookings

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/bookings` | Book a new appointment |
| `GET` | `/bookings/:userId` | Fetch all appointments of a specific user |
| `PATCH` | `/bookings/:bookingId` | Update an existing appointment |
| `DELETE` | `/bookings/:bookingId` | Delete an appointment |

---

## 🔐 Authentication

This API uses **JWT (JSON Web Token)** based authentication.

- On login, a signed JWT token is issued to the client.
- Protected routes require the token to be sent in the request header:
