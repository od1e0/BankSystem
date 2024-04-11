import express from 'express';
import mongoose from 'mongoose';

import { registerValidation } from './validations.js';

import { checkAuth, handleValidationErrors } from './utils/index.js';

import { UserController, CardController } from './controllers/index.js';

mongoose
  .connect(
    'mongodb+srv://admin:020919790@cluster0.tavobgt.mongodb.net/Banking?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => console.log('DB OK'))
  .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.post('/auth/login', UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post(
  '/cards',
  checkAuth,
  handleValidationErrors,
  CardController.createCard
);

app.listen(1112, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
});
