const validateRequiredFields = require('../utils/validateRequired');

/**
 * Конструктор объекта Person (Личность)
 * Создает экземпляр персоны с личными данными
 * @param {Object} data - Данные персоны
 * @param {string} data.surname - Фамилия
 * @param {string} data.name - Имя
 * @param {string} data.middleName - Отчество
 * @param {string|Date} data.birthDate - Дата рождения (строка или объект Date)
 * @param {string} data.phoneNumber - Номер телефона
 */
function Person(data) {
  validateRequiredFields(data, [ 'surname', 'name', 'middleName', 'birthDate', 'phoneNumber' ]);

  const { surname, name, middleName, birthDate, phoneNumber } = data;
  // Основные свойства
  this.surname = surname;
  this.name = name;
  this.middleName = middleName;
  this.birthDate = new Date(birthDate);
  this.phoneNumber = phoneNumber;
}

module.exports = Person;
