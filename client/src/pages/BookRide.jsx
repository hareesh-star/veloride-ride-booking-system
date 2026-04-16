import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BookRide({ token }) {
    const [formData, setFormData] = useState({ pickupLocation: '', dropLocation: '' });
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/rides', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Ride booked successfully!');
            navigate('/history');
        } catch (err) {
            alert(err.response?.data?.msg || 'Error booking ride');
        }
    };

    return (
        <div className="auth-form" style={{ maxWidth: '600px' }}>
            <h2>Book a Ride</h2>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Pickup Location" name="pickupLocation" value={formData.pickupLocation} onChange={onChange} required />
                <input type="text" placeholder="Drop Location" name="dropLocation" value={formData.dropLocation} onChange={onChange} required />
                <button type="submit" className="btn">Request Ride</button>
            </form>
        </div>
    );
}

export default BookRide;
