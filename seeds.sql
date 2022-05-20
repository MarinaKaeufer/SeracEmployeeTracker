INSERT INTO departments (dept_name)
VALUES 
  ("Sales"),
  ("Accounting"),
  ("Engineering"),
  ("Advertising");

INSERT INTO roles (job_title, salary, department)
VALUES 
  ("Software Developer", 12.1, 3),
  ("Cashier", 70.2, 12),
  ("Supervisor", 93.5, 7),
  ("Buyer", 79.7, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
  ("Jack", "Dorsey", 09393, 23, NULL),
  ("Anna", "Taylor", 83335, 19, NULL),
  ("Tiffany", "Stone", 28373, 25,  NULL),
  ("Nicole", "Thompson", 37262, 07, NULL);

-- INSERT INTO employees (first_name, last_name, role_id, manager_id)
-- VALUES 
--   ("Jack", "Dorsey", 1, 2),
--   ("name 1", "name 2", 2, 1),
--   ("name 3", "name 4", 3, 2),
--   ("name 5", "name 6", 4, 4);

