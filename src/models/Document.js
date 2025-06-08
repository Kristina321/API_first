const validateRequiredFields = require('../utils/validateRequired');

/**
 * Конструктор объекта Document (Документ)
 * Создает экземпляр документа с серийным номером, номером и датой выдачи
 * @param {Object} data - Данные документа
 * @param {string} data.serialNumber - Серийный номер документа
 * @param {string} data.number - Номер документа
 * @param {string|Date} data.issueDate - Дата выдачи документа (строка или объект Date)
 */
function Document(data) {
  validateRequiredFields(data, [ 'serialNumber', 'number', 'issueDate' ]);

  const { serialNumber, number, issueDate } = data;

  // Основные свойства
  this.serialNumber = serialNumber;
  this.number = number;
  this.issueDate = new Date(issueDate);
}

module.exports = Document;
