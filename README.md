# veloride-ride-booking-system
Full-stack ride booking system using MERN stack with real-time communication (Socket.io), JWT authentication, and dynamic pricing.

# 🚀 VeloRide — Full Stack & System Design Project

VeloRide is a full-stack ride booking web application built using the MERN stack. This project not only demonstrates full-stack development but also incorporates key system design concepts such as real-time communication, concurrency control, and scalable backend architecture.

---

## 🎯 Project Objective

The goal of this project is to simulate a real-world ride-hailing system like Uber by connecting riders and drivers through a scalable and efficient platform.

---

## 🧠 Key Features

* 🔐 JWT-based Authentication & Role Management (Rider/Driver)
* 🚗 Ride Booking with Map Integration (Leaflet + OpenStreetMap)
* ⚡ Real-Time Communication using Socket.io
* 💰 Dynamic Pricing (Distance + Surge Algorithm)
* 🚦 Ride Lifecycle Management (State Transitions)
* 💳 Payment System (Cash, UPI, Card)
* 📊 Driver Earnings Dashboard (MongoDB Aggregation)
* 🛡️ Concurrency Control (Atomic DB Operations)

---

## 🏗️ System Design Highlights

This project demonstrates several real-world system design concepts:

* **3-Tier Architecture** (Frontend, Backend, Database)
* **Real-Time Event-Driven Architecture** (WebSockets)
* **Stateless Authentication** using JWT
* **Concurrency Handling** using MongoDB atomic operations
* **Background Jobs** using cron for surge pricing
* **Scalable API Design** using REST principles

---

## 🧩 Tech Stack

### Frontend

* React.js
* React Router
* Axios
* Leaflet (Maps)
* Recharts

### Backend

* Node.js
* Express.js
* Socket.io
* node-cron

### Database

* MongoDB
* Mongoose

### Security

* JWT
* bcrypt

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-username/veloride-mern-stack.git
cd veloride-mern-stack
```

### 2. Install Dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd client
npm install
```

---

### 3. Environment Variables

Create `.env` file inside server:

```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

### 4. Run Application

#### Start Backend

```bash
cd server
npm start
```

#### Start Frontend

```bash
cd client
npm run dev
```

---

## 🔗 API Endpoints

* POST `/api/auth/register`
* POST `/api/auth/login`
* POST `/api/rides`
* PUT `/api/rides/:id`
* PUT `/api/rides/:id/status`
* PUT `/api/rides/:id/cancel`
* GET `/api/rides/history`

---

## 📁 Project Structure

```
server/
  models/
  routes/
  middleware/

client/
  src/
    components/
    pages/
```

---

## 🚀 Future Enhancements

* Live driver tracking
* Driver availability toggle
* ETA prediction
* In-app chat system

---

## 👨‍💻 Author

* Your Name

---

## ⭐ Conclusion

VeloRide demonstrates both full-stack development and system design principles by integrating real-time communication, scalable backend architecture, and efficient data handling in a real-world application scenario.

