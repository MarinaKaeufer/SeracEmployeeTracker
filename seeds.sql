INSERT INTO departments (dept_name)
VALUES 
  ("Sales"),
  ("Accounting"),
  ("Engineering"),
  ("Advertising");

INSERT INTO roles (job_title, salary, department)
VALUES 
  ("Software Developer", 12.1, 3),
  ("Title 2", 12.1, 3),
  ("Title 3", 12.1, 2),
  ("Title 4", 12.1, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
  (" Manager Jack", "Dorsey", 1, NULL),
  ("Manager name 1", "name 2", 2, NULL),
  ("Manager name 3", "name 4", 3, NULL),
  ("Manager name 5", "name 6", 4, NULL);

-- INSERT INTO employees (first_name, last_name, role_id, manager_id)
-- VALUES 
--   ("Jack", "Dorsey", 1, 2),
--   ("name 1", "name 2", 2, 1),
--   ("name 3", "name 4", 3, 2),
--   ("name 5", "name 6", 4, 4);

