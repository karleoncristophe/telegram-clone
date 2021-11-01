const express = require('express');
const cors = require('cors');
const path = require('path');
const Message = require('../src/models/Message');
const socket = require('socket.io');
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

io.on('connection', async socket => {
  const messages = await Message.find();
  socket.emit('messages', messages);
  socket.on('message', async args => {
    await Message.create(args);
    const messages = await Message.find();
    socket.emit('messages', messages);
  });
});

io.sockets.on('connection', function (socket) {
  socket.on('create', function (room) {
    socket.join(room);
  });
});
