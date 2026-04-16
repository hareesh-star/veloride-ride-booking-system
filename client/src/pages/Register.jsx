import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register({ setToken, setUser }) {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'rider' });
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            setToken(res.data.token);
            setUser(res.data.user);
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.msg || 'Error registering');
        }
    };

    return (
        <div className="hero-section">
            <p className="hero-subtitle">WELCOME TO VELORIDE</p>
            <h1 className="hero-title">Start Your<br />Adventure</h1>
            <p className="hero-description">
                Join thousands of others traversing the city with style, speed, and safety.
            </p>

            <form onSubmit={onSubmit} className="hero-auth-form">
                <input type="text" placeholder="Full Name" name="name" value={formData.name} onChange={onChange} required />
                <input type="email" placeholder="Email Address" name="email" value={formData.email} onChange={onChange} required />
                <input type="password" placeholder="Password" name="password" value={formData.password} onChange={onChange} minLength="6" required />
                <select name="role" value={formData.role} onChange={onChange}>
                    <option value="rider">Rider</option>
                    <option value="driver">Driver</option>
                </select>
                <div className="hero-buttons">
                    <button type="submit" className="btn btn-solid">Register</button>
                    <Link to="/login" className="btn btn-outline">Back to Login</Link>
                </div>
            </form>
        </div>
    );
}

export default Register;
