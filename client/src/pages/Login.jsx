import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login({ setToken, setUser }) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            setToken(res.data.token);
            setUser(res.data.user);
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.msg || 'Error logging in');
        }
    };

    return (
        <div className="hero-section">
            <p className="hero-subtitle">WELCOME TO VELORIDE</p>
            <h1 className="hero-title">Bring Life to Your<br />Journey</h1>
            <p className="hero-description">
                Discover our curated collection of pristine, high-quality drivers that transform any ride into a sanctuary.
            </p>

            <form onSubmit={onSubmit} className="hero-auth-form">
                <input type="email" placeholder="Email Address" name="email" value={formData.email} onChange={onChange} required />
                <input type="password" placeholder="Password" name="password" value={formData.password} onChange={onChange} minLength="6" required />
                <div className="hero-buttons">
                    <button type="submit" className="btn btn-solid">Sign In</button>
                    <Link to="/register" className="btn btn-outline">Create Account</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
