const express = require('express');
const router = express.Router();
const db = require('../db/db');
const User = require('../models/User');
const generateSecureToken = require('../utils/generateSecureToken');

/**
 * Обрабатывает ошибки запросов к БД
 * @param {object} res - Объект ответа Express
 * @param {Error} err - Объект ошибки
 * @param {string} errorMessage - Сообщение для логирования
 */
const createRequestError = (res, err, errorMessage, errorStatus = 500) => {
  console.error(errorMessage, err);
  res.status(errorStatus).json({ error: errorMessage });
};

/**
 * Инициализирует коллекцию пользователей
 */
const initUsersCollection = async (req, res, next) => {
  try {
    await db.createCollection('users');
    next();
  } catch (err) {
    createRequestError(res, err, 'Failed to init users collection');
  }
};

/**
 * Проверяет существование пользователя по номеру телефона
 * @param {string} phoneNumber - Номер телефона
 */
const isUserExists = async (phoneNumber) => {
  const [existingUser] = await db.find('users', { phoneNumber });
  return !!existingUser;
};

/**
 * Создание нового пользователя (базовый метод)
 */
const createUser = async (req, res) => {
  try {
    const user = new User(req.body);

    const { id, authKey } = await db.create('users', {
      ...user,
      authKey: generateSecureToken(),
      id: crypto.randomUUID(),
      password: generateSecureToken(1),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    res
      .header('Location', `${req.protocol}://${req.hostname}/api/users/${id}`)
      .status(201).json({ id, authKey });
  } catch (err) {
    createRequestError(res, err, `Failed to create user ${err.message}`, 400);
  }
};

router.post('/', initUsersCollection, createUser);

/**
 * Регистрация нового пользователя
 */
const registration = async (req, res) => {
  try {
    if (await isUserExists(req.body.phoneNumber)) {
      return res.status(409).json({
        error: `User with phone number "${req.body.phoneNumber}" already exists`
      });
    }

    await createUser(req, res);
  } catch (err) {
    createRequestError(res, err, 'Registration failed');
  }
};

router.post('/register', initUsersCollection, registration);

/**
 * Аутентификация пользователя
 */
const login = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(403).json({ message: 'Login and password are required' });
    }

    const [user] = await db.find('users', { phoneNumber: login });

    if (!user) {
      return res.status(403).json({ message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(403).json({ message: 'Invalid password' });
    }

    return res.status(200).json({ authKey: user.authKey });
  } catch (error) {
    createRequestError(res, err, 'Login failed');
  }
};

router.post('/login', login);

module.exports = router;
