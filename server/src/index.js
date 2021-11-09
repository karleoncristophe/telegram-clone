const express = require('express');
const cors = require('cors');
const path = require('path');
const Message = require('../src/models/Message');
const socket = require('socket.io');
const { connected } = require('process');
const port = 4000;
const app = express();
const webMobile = 'http://192.168.0.107:3000';
const webLocal = 'http://localhost:3000';

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/files', express.static(path.resolve(__dirname, 'tmp', 'uploads')));

app.use(require('../src/routes/routes'));

const server = app.listen(port, () => {
  console.log(`Example app listening at localhost:${port}`);
});

const io = socket(server, {
  cors: {
    origins: webMobile || webLocal,
    methods: ['GET', 'POST'],
  },
});

let online = 0;

io.on('connection', async socket => {
  online++;
  console.log(`User ${socket.id} connected.`);
  console.log(`Users onlines ${online}`);
  const messages = await Message.find();
  socket.emit('messages', messages);
  socket.on('messages', async args => {
    await Message.create(args);
    const messages = await Message.find();
    socket.emit('messages', messages);
  });
});
