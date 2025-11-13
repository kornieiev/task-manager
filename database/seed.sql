-- Создаст тестового пользователя:
INSERT INTO users (name, email, password) VALUES 
('test', 'test@mail.com', 'qweqwe');

-- Добавит тестовые проекты:
INSERT INTO projects (title, description, due_date, status, user_id) VALUES 
('Shopping list', 'list products to buy', NULL, false, 1),
('Study', 'what to do for school', NULL, true, 1),
('To do list', 'list of things to do', NULL, false, 1),
('Gym List', 'list of exercises to do in gym', NULL, false, 1);

-- Добавит тестовые задачи:
INSERT INTO tasks (project_id, task_text, completed, priority) VALUES 
(1, 'bread', false, 'low'),
(1, 'onion', false, 'low'),
(1, 'chees', false, 'low'),
(2, 'math - page 55', false, 'low'),
(2, 'biology - theme 4', true, 'medium'),
(3, 'wash the car', false, 'high'),
(3, 'clean windows', false, 'low'),
(4, 'make 50 push ups', false, 'low'),
(4, 'make 10 pull ups', false, 'low');