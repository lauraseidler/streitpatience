import express from 'express';
import socketIO from 'socket.io';

const port = process.env.PORT || 80;
const wsPort = process.env.WS_PORT || 4000;

const app = express();
const io = socketIO();

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello World' });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

io.on('connection', client => {
    client.on('subscribeToTimer', interval => {
        console.log(`Client subscribed to timer with interval ${interval}`);

        setInterval(() => client.emit('timer', new Date()), interval);
    });
});

io.listen(wsPort);
console.log(`Socket.IO server listening on port ${wsPort}`);
