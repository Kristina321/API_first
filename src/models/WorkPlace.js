const validateRequiredFields = require('../utils/validateRequired');

/**
 * Конструктор объекта WorkPlace (Место работы)
 * Создает экземпляр места работы с контактными данными
 * @param {Object} data - Данные места работы
 * @param {string} data.workName - Название места работы
 * @param {string} data.workPhone - Рабочий телефон
 * @param {string} data.workAdress - Адрес места работы
 */
function WorkPlace(data) {
  validateRequiredFields(data, [ 'workName', 'workPhone', 'workAdress' ]);

  const { workName, workPhone, workAdress } = data;
  // Основные свойства
  this.workName = workName;
  this.workPhone = workPhone;
  this.workAdress = workAdress;
}

module.exports = WorkPlace;
