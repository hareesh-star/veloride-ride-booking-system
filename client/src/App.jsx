import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BookRide from './pages/BookRide';
import DriverPanel from './pages/DriverPanel';
import RideHistory from './pages/RideHistory';

const socket = io('http://localhost:5000'); // Connect to backend server

function BackgroundChanger() {
  const location = useLocation();

  useEffect(() => {
    let bg = '/vellore-fort.jpg'; // Login/Register (Default)
    if (location.pathname === '/dashboard') {
      bg = '/vit-campus.jpg';
    } else if (location.pathname === '/book-ride' || location.pathname === '/driver-panel') {
      bg = '/vellore-city.jpg';
    } else if (location.pathname === '/history') {
      bg = '/vellore-temple.jpg';
    }

    document.body.style.transition = 'background-image 0.5s ease-in-out';
    document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url("${bg}")`;
  }, [location.pathname]);

  return null;
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, [token, user]);

  return (
    <Router>
      <BackgroundChanger />
      <Navbar token={token} setToken={setToken} user={user} setUser={setUser} />
      <div className="container">
        <Routes>
          <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setToken={setToken} setUser={setUser} />} />
          <Route path="/register" element={<Register setToken={setToken} setUser={setUser} />} />
          <Route path="/dashboard" element={token ? <Dashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="/book-ride" element={token && user?.role === 'rider' ? <BookRide token={token} /> : <Navigate to="/dashboard" />} />
          <Route path="/driver-panel" element={token && user?.role === 'driver' ? <DriverPanel token={token} socket={socket} /> : <Navigate to="/dashboard" />} />
          <Route path="/history" element={token ? <RideHistory token={token} user={user} socket={socket} /> : <Navigate to="/login" />} />
        </Routes>
      </div>

      {/* Global Live Indicator */}
      {token && (
        <div className="live-indicator">
          <div className="live-dot"></div> Live Service Active
        </div>
      )}
    </Router>
  );
}

export default App;
