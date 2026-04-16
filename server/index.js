require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(express.json());
app.use(cors());

// Pass io to routes
app.use((req, res, next) => {
    req.io = io;
    next();
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
    socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/rides', require('./routes/rides'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
