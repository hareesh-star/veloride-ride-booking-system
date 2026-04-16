import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard({ user }) {
    return (
        <div className="hero-section">
            <p className="hero-subtitle">WELCOME, {user?.name?.toUpperCase()}!</p>
            <h1 className="hero-title">Experience the Best<br />Rides in Town</h1>
            <p className="hero-description">
                You are logged in securely as a <strong>{user?.role}</strong>. Discover our curated collection of pristine, high-quality trips that transform any travel into a breeze.
            </p>

            <div className="hero-buttons">
                {user?.role === 'rider' ? (
                    <Link to="/book-ride" className="btn btn-solid">Book a Ride</Link>
                ) : (
                    <Link to="/driver-panel" className="btn btn-solid">Go to Driver Panel</Link>
                )}
                <Link to="/history" className="btn btn-outline">View Ride History</Link>
            </div>
        </div>
    );
}

export default Dashboard;
