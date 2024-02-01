
-- Inserting a system_user with Admin role
INSERT INTO system_users (user_id, username, role, email, password)
VALUES (1,'admin', 'Admin', 'abroad.dreams.com@gmail.com', '$2a$12$8QnQpAeSERbdP8/epfWtJOyhwcysnyHEPItkv1mbVbbqkRJOSBbZ.');


-- Inserting a role for Admin
INSERT INTO roles (id, name) VALUES (1, 'Admin');
INSERT INTO roles (id, name) VALUES (2, 'Student');

INSERT INTO users_roles (user_id, role_id) VALUES (1, 1);

