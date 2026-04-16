import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ token, setToken, user, setUser }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken(null);
        setUser(null);
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <span className="logo-icon">⚡</span> VeloRide
            </div>
            <div>
                {token ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        {user?.role === 'rider' && <Link to="/book-ride">Book a Ride</Link>}
                        {user?.role === 'driver' && <Link to="/driver-panel">Driver Panel</Link>}
                        <Link to="/history">History</Link>
                        <button className="btn" style={{ marginLeft: '1.5rem', width: 'auto', padding: '0.5rem 1rem' }} onClick={handleLogout}>
                            Logout ({user?.name})
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
