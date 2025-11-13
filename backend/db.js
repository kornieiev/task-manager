/* eslint-disable no-undef */
// Импортируем класс Pool из библиотеки pg для создания пула соединений с PostgreSQL
import { Pool } from "pg";
// Импортируем dotenv для загрузки переменных окружения из файла .env
import dotenv from "dotenv";

// Загружаем переменные окружения из файла .env в process.env
dotenv.config();

// Создаем новый пул соединений с PostgreSQL, используя настройки из переменных окружения
const pool = new Pool({
  host: process.env.DB_HOST, // Адрес сервера базы данных (localhost)
  port: process.env.DB_PORT, // Порт PostgreSQL (обычно 5432)
  database: process.env.DB_NAME, // Имя базы данных (task_manager)
  user: process.env.DB_USER, // Имя пользователя PostgreSQL (postgres)
  password: process.env.DB_PASSWORD, // Пароль пользователя PostgreSQL
});

// Обработчик события успешного подключения к базе данных
pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL database");
});

// Обработчик события ошибки подключения к базе данных
pool.on("error", (err) => {
  console.error("❌ Database connection error:", err);
});

// Экспортируем пул соединений как модуль по умолчанию для использования в других файлах
export default pool;
