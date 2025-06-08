const fs = require('fs');
const path = require('path');

/**
 * Чтение/инициализация файла БД
 * @param {string} file - Имя файла
 * @param {string} defaultData - Данные по умолчанию
 * @param {string} encoding - Кодировка
 * @returns {object} Данные БД
 */
const initDatabase = (file = 'db.json', defaultData = '{}', encoding = 'utf-8') => {
  const dbFile = path.join(__dirname, file);

  try {
    return JSON.parse(fs.readFileSync(dbFile, encoding));
  } catch (err) {
    if (err.code === 'ENOENT') {
      fs.writeFileSync(dbFile, defaultData, encoding);
      return JSON.parse(defaultData);
    } else {
      console.error('DB init failed:', err);
      throw new Error('DB init failed');;
    }
  }
}

const DATABASE = initDatabase();

/**
 * Сохранение состояния БД
 */
const saveDatabase = () => {
  try {
    fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(DATABASE, null, 2), 'utf-8');
  } catch (err) {
    console.error('DB write error', err);
    throw new Error('DB write error');
  }
};

// Коды ошибок
const DB_ERRORS = {
  NO_COLLECTION: 'NO_COLLECTION',
  NO_ENTITY: 'NO_ENTITY',
};

/**
 * Создает ошибку БД
 * @param {string} message - Текст ошибки
 * @param {string} code - Код ошибки
 */
const createDbError = (message, code) => {
  const err = new Error(message);
  err.code = code;
  return err;
};

const db = {
  /**
   * Поиск сущностей в коллекции
   * @param {string} collection - Имя коллекции
   * @param {object} [filter] - Фильтр
   */
  find: async (collection, filter) => {
    if (!DATABASE[collection]) {
      throw createDbError(`Coolection ${collection} not found`, DB_ERRORS.NO_COLLECTION);
    }

    const data = DATABASE[collection];

    if (filter) {
      return data.filter((item) =>
        Object.keys(filter).every((key) => item[key] === filter[key])
      );
    }

    return data;
  },
  /**
   * Создание новой сущности
   * @param {string} collection - Имя коллекции
   * @param {object} data - Данные сущности
   */
  create: async (collection, data) => {
    if (!DATABASE[collection]) {
      throw createDbError(`Coolection ${collection} not found`, DB_ERRORS.NO_COLLECTION);
    }

    DATABASE[collection].push({ ...data });
    saveDatabase();
    return {
      id: data.id,
      authKey: data.authKey
    }
  },
  /**
   * Проверяет существование коллекции.
   * Если коллекция отсутствует, создаёт новую пустую коллекцию
   * @param {string} collection - Имя коллекции
   */
  createCollection: async (collection) => {
    DATABASE[collection] = DATABASE[collection] || [];
    saveDatabase();
  },
  DB_ERRORS,
};

module.exports = db;
