DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

CREATE TABLE departments(
  id INTEGER NOT NULL,
  dept_name VARCHAR(30),
);

CREATE TABLE roles(
  id INTEGER NOT NULL,
  job_title VARCHAR(30),
  salary DECIMAL(5,2),
  department INTEGER,
  FOREIGN KEY (department)
  REFERENCES departments(id)
  ON DELETE SET NULL
);

CREATE TABLE employees(
  id INTEGER NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER,
  manager_id Integer,
  FOREIGN KEY (role_id)
  REFERENCES roles(id)
  ON DELETE SET NULL
);
