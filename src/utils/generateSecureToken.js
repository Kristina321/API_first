/**
 * Генерирует токен безопасности
 * @param {number} count - Количество групп в токене (по умолчанию 4)
 * @returns {string} Токен в формате "XXXXXXXX_XXXXXXXX_XXXXXXXX_XXXXXXXX" (длина зависит от count)
 *
 * Правила генерации:
 * - Каждая группа содержит: 2 заглавные буквы, 2 строчные, 2 цифры, 2 спецсимвола
 * - Символы в группах перемешаны случайным образом
 * - Допускаются повторяющиеся символы в пределах группы
 */
function generateSecureToken(count = 4) {
  // Наборы символов
  const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberChars = '0123456789';
  const symbolChars = `!@#$%^&*`; //`!@#$%^&*()_+-=[]{}|;:',<>?/`

  /**
   * Генерирует случайные символы из указанного набора
   * @param {string} chars - Набор символов для выбора
   * @param {number} num - Количество символов (по умолчанию 2)
   * @returns {string} Строка со случайными символами
   */
  const getRandomChars = (chars, num = 2) => {
    let randomChars = '';

    for (let i = 0; i < num; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      randomChars += chars[randomIndex];
    }
    return randomChars;
  }

  /**
   * Создает одну группу символов
   * @returns {string} Группа из 8 перемешанных символов
   */
  const createGroup = () => {
    const group =
      getRandomChars(upperChars, 2) +
      getRandomChars(lowerChars, 2) +
      getRandomChars(numberChars, 2) +
      getRandomChars(symbolChars, 2);

    // Перемешиваем символы в группе
    return group.split('').sort(() => 0.5 - Math.random()).join('');
  };

  // Генерируем и соединяем группы
  return Array.from({ length: count }, createGroup).join('_');
}

module.exports = generateSecureToken;
