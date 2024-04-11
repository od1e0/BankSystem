import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 8 символов').isLength({
    min: 8,
  }),
];

export const registerValidation = [
  body('email').isEmail(),
  body('password', 'Пароль должен быть минимум 8 символов').isLength({
    min: 8,
  }),
  body('fullName', 'Укажите имя').isLength({ min: 3 }),
];
