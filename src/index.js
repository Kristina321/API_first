const express = require('express');
const { welcome } = require('./utils/pages');

// Создание экземпляра Express-приложения
const app = express();

// Подключение middleware для автоматического парсинга JSON-тела запросов
// req.body будет автоматически преобразовываться в JS-объект для JSON-запросов
app.use(express.json());

// Подключение статических файлов (CSS, JS)
app.use(express.static('public'));

// Подключение роутера для работы с пользователями
// Все запросы, начинающиеся с '/api/users/', будут переданы в users.js
app.use('/api/users/', require('./routes/users'));

// Обработчик GET-запроса к корневому пути ('/')
// Срабатывает, когда пользователь обращается к http://localhost:3000/
app.get('/', (req, res) => {
  res.send(welcome);
});

// Middleware для обработки ошибок (вызывается при передаче ошибки в next(err))
app.use((err, req, res, next) => {
  res.status(500).send(err.message);
})

// Определение порта сервера:
// 1. Сначала пытаемся взять из переменных окружения (process.env.PORT)
// 2. Если не задано - используем порт 3000 по умолчанию
const PORT = process.env.PORT || 3000;

// Запуск сервера на указанном порту
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
