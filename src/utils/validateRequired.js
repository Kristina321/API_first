/**
 * Валидирует входящие данные по списку обязательных полей
 * @param {Object} data - Входные данные
 * @param {string[]} requiredFields - Массив обязательных полей
 */
const validateRequiredFields = (data, fields) => {
  if (!data) throw new Error(`Data is required`);

  const emptyFields = fields.filter(field => {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      return field;
    }
  })

  if (emptyFields.length > 0) {
    throw new Error(`Missing required ${emptyFields.join(', ')}`);
  }
}

module.exports = validateRequiredFields;
