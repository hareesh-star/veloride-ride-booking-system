import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DriverPanel({ token, socket }) {
    const [rides, setRides] = useState([]);

    const fetchPendingRides = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/rides', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRides(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchPendingRides();

        socket.on('rideRequest', (ride) => {
            setRides(prev => [...prev, ride]);
        });

        socket.on('rideUpdated', (ride) => {
            // If a ride was accepted by someone else, remove it from the pending list
            if (ride.status !== 'pending') {
                setRides(prev => prev.filter(r => r._id !== ride._id));
            }
        });

        return () => {
            socket.off('rideRequest');
            socket.off('rideUpdated');
        };
    }, [token, socket]);

    const acceptRide = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/rides/${id}`, { status: 'accepted' }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Ride accepted!');
            setRides(rides.filter(ride => ride._id !== id));
        } catch (err) {
            alert(err.response?.data?.msg || 'Error accepting ride');
        }
    };

    return (
        <div>
            <h2 style={{ marginBottom: '2rem' }}>Available Rides</h2>
            {rides.length === 0 ? <p>No pending rides available right now.</p> : (
                <div className="grid">
                    {rides.map(ride => (
                        <div key={ride._id} className="card">
                            <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Ride Request</h3>
                            <p><strong>From:</strong> {ride.pickupLocation}</p>
                            <p><strong>To:</strong> {ride.dropLocation}</p>
                            <p><strong>Rider:</strong> {ride.riderId?.name}</p>
                            <p style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
                                <span className="badge pending">Pending</span>
                            </p>
                            <button className="btn" onClick={() => acceptRide(ride._id)}>Accept Ride</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DriverPanel;
