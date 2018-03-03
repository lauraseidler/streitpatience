import openSocket from 'socket.io-client';

const socket = openSocket(`http://localhost:${process.env.WS_PORT || 4000}`);

export default socket;
