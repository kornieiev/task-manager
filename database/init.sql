-- 1️⃣ Таблица пользователей
CREATE TABLE users (
    id SERIAL PRIMARY KEY,                           -- Уникальный идентификатор пользователя (автоинкремент)
    name VARCHAR(100) NOT NULL,                      -- Имя пользователя, обязательное поле
    email VARCHAR(255) UNIQUE NOT NULL,              -- Email, должен быть уникальным
    password VARCHAR(255) NOT NULL,                  -- Пароль (в зашифрованном виде)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,  -- Дата и время создания записи
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP   -- Дата и время последнего обновления
);

-------------------------------------------------------------

-- 2️⃣ Таблица проектов
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,                      -- Уникальный ID проекта (автоинкремент)
    title VARCHAR(255) NOT NULL,                -- Название проекта
    description TEXT NOT NULL,                  -- Описание проекта
    due_date TIMESTAMP WITH TIME ZONE,                         -- Крайний срок (дедлайн)
    status BOOLEAN DEFAULT false,               -- Статус проекта (false = не завершён, true = завершён)
    user_id INT NOT NULL,                                -- ID пользователя, которому принадлежит проект
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- Когда запись была создана
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- Когда запись была обновлена

    CONSTRAINT fk_user                          -- Название ограничения (foreign key)
        FOREIGN KEY (user_id)                   -- Указываем, что поле user_id является внешним ключом
        REFERENCES users(id)                    -- Связь с таблицей users по полю id
        ON DELETE CASCADE                       -- Если пользователь удалён → удалить все его проекты
        ON UPDATE CASCADE                       -- Если ID пользователя изменится → обновить и в проектах
);

-------------------------------------------------------------

-- 3️⃣ ENUM тип приоритета
CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high');
-- ENUM создаёт собственный тип данных, ограниченный конкретными значениями.
-- В данном случае приоритет задачи может быть только одним из трёх:
-- 'low' — низкий, 'medium' — средний, 'high' — высокий.

-------------------------------------------------------------

-- 4️⃣ Таблица задач
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,                      -- Уникальный идентификатор задачи
    project_id INT NOT NULL,                    -- ID проекта, к которому относится задача
    task_text TEXT NOT NULL,                    -- Текст задачи (описание)
    completed BOOLEAN DEFAULT false,            -- Статус задачи (по умолчанию не выполнена)
    priority task_priority DEFAULT 'low',       -- Приоритет задачи, тип ENUM
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- Когда задача создана
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- Когда задача обновлена

    CONSTRAINT fk_project                       -- Название ограничения (foreign key)
        FOREIGN KEY (project_id)                -- Указываем, что project_id — внешний ключ
        REFERENCES projects(id)                 -- Ссылается на id в таблице projects
        ON DELETE CASCADE                       -- Если проект удалён → удалить все связанные задачи
        ON UPDATE CASCADE                       -- Если ID проекта изменён → обновить и в задачах
);

-- 🚀 Индексы для ускорения запросов
-- Поиск проектов по пользователю будет мгновенным
-- Поиск задач по проекту будет быстрым
-- Фильтрация задач по приоритету ускорена
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_tasks_priority ON tasks(priority);

-- 🔄 Автоматическое обновление временных меток
-- При любом UPDATE записи поле updated_at автоматически обновится
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггеры для автообновления
CREATE TRIGGER update_projects_updated_at 
    BEFORE UPDATE ON projects 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at 
    BEFORE UPDATE ON tasks 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();