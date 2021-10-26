const routes = require('express').Router();
const multer = require('multer');
const Message = require('../models/Message');
const User = require('../models/User');
const Image = require('../models/Image');
const bcrypt = require('bcryptjs');
const generateToken = require('../common/generateToken');
const authenticate = require('../middlewares/authenticate');
const upload = require('../middlewares/upload');

//  endpoints for messages
routes.get('/messages', authenticate, async (req, res) => {
  const messages = await Message.find()
    .sort({ createdAt: 1 })
    .populate('userFrom')
    .populate('userTo');
  res.send(messages);
});

routes.post('/messages', async (req, res) => {
  const message = await Message.create(req.body);
  res.status(200).send(message);
});

//  endpoints for users
routes.get('/users', async (req, res) => {
  const name = await User.find().sort({ createdAt: 1 });
  res.status(200).send(name);
});

routes.get('/me', authenticate, async (req, res) => {
  const user = await User.findOne({ _id: req.logged });
  res.status(200).send(user);
});

routes.post('/users', async (req, res) => {
  const { username, name, email, password } = req.body;

  if (await User.findOne({ email })) {
    res.status(400).send({
      error: 'Já existe um usuário cadastrado com esse email.',
    });
  }

  try {
    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      name,
      email,
      password: hash,
    });

    res.status(201).send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send({
      message: 'Erro ao processar seus dados.',
      error: e,
    });
  }
});

routes.put('/users/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { name, username, bio } = req.body;
  const objects = { name: name, username: username, bio: bio };

  try {
    const updateData = await User.findOneAndUpdate(
      {
        _id: id,
      },
      objects,
      { new: true }
    );

    res.status(200).send(updateData);

    console.log(updateData);
  } catch (error) {
    res.status(403).send({
      error: 'Erro ao atualizar',
    });
  }
});

routes.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    res.status(400).send({
      error: 'Usuário não cadastrado.',
    });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    res.status(400).send({
      error: 'Senha inválida.',
    });
  }

  const token = generateToken({ id: user.id });

  res.status(201).send({
    token,
    user,
  });
});

routes.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOneAndDelete({ _id: id });
    res.status(200).send({
      message: 'User deleted successfully!',
    });
    console.log(user);
  } catch (error) {
    res.status(400).send({
      error: ' User was not deleted successfully!',
    });
  }
});

//  endpoints for images

routes.get('/image', async (req, res) => {
  const image = await Image.find().sort({ createdAt: 1 });
  res.status(200).send(image);
});

routes.post(
  '/postImage',
  authenticate,
  multer(upload).single('file'),
  async (req, res) => {
    const { originalname: name, size, key, url = '' } = req.file;

    try {
      const image = await Image.create({
        name,
        size,
        key,
        url,
      });
      res.status(201).send({
        image,
      });
    } catch (error) {
      res.status(400).send({
        error: 'Image was not posted.',
      });
    }
  }
);

routes.put('/updateImage/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { key } = req.body;
  const objects = { key: key };

  try {
    const updateData = await Image.findOneAndUpdate(
      {
        _id: id,
      },
      objects,
      { new: true }
    );

    res.status(200).send(updateData);

    console.log(updateData);
  } catch (error) {
    res.status(403).send({
      error: 'Error while updating.',
    });
  }
});

routes.delete('/deleteImage/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  const image = await Image.findById({ _id: id });

  await image.remove();

  return res.status(200).send({ message: 'Deleted image.' });
});

module.exports = routes;
