const Person = require('./Person');
const Document = require('./Document');
const WorkPlace = require('./WorkPlace');
const validateRequiredFields = require('../utils/validateRequired');

/**
 * Конструктор объекта User (Пользователь)
 * Наследует свойства Person и добавляет документы и места работы
 * @param {Object} data - Данные пользователя
 * @throws {Error} Если данные не переданы
 */
function User(data) {
  if (!data) throw new Error('User data is required');

  validateRequiredFields(data, [ 'surname', 'name', 'middleName', 'birthDate', 'phoneNumber' ]);

  const { document, workPlaces } = data;

  // Наследуем свойства Person
  Person.call(this, data);
  this.document = document ? new Document(document) : {};
  this.workPlaces = workPlaces ? workPlaces.map(wp => new WorkPlace(wp)) : [];
  this.authKey = null;
}

module.exports = User;
