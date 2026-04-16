import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RideHistory({ token, user, socket }) {
    const [history, setHistory] = useState([]);

    const fetchHistory = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/rides/history', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setHistory(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchHistory();

        if (socket) {
            socket.on('rideUpdated', (updatedRide) => {
                setHistory(prev => prev.map(r => r._id === updatedRide._id ? updatedRide : r));
            });
        }

        return () => {
            if (socket) socket.off('rideUpdated');
        };
    }, [token, socket]);

    const markCompleted = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/rides/${id}`, { status: 'completed' }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchHistory();
        } catch (err) {
            alert(err.response?.data?.msg || 'Error updating ride');
        }
    };

    return (
        <div>
            <h2 style={{ marginBottom: '2rem' }}>Ride History</h2>
            {history.length === 0 ? <p>No rides found.</p> : (
                <div className="grid">
                    {history.map(ride => (
                        <div key={ride._id} className="card">
                            <p><strong>From:</strong> {ride.pickupLocation}</p>
                            <p><strong>To:</strong> {ride.dropLocation}</p>
                            {ride.driverId && <p><strong>Driver:</strong> {ride.driverId.name}</p>}
                            {ride.riderId && <p><strong>Rider:</strong> {ride.riderId.name}</p>}
                            <p style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
                                <span className={`badge ${ride.status}`}>{ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}</span>
                            </p>
                            {ride.status === 'accepted' && user?.role === 'driver' && (
                                // If viewed by driver and status is accepted, they can mark as completed
                                <button className="btn" style={{ background: 'var(--accent)' }} onClick={() => markCompleted(ride._id)}>Mark Completed</button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default RideHistory;
