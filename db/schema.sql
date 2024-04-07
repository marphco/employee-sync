DROP DATABASE IF EXISTS employee_sync_db;

CREATE DATABASE employee_sync_db;

USE employee_sync_db;

-- Use if you want to drop the tables if they already exist
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

-- Create 'department' table
CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

-- Create 'role' table
CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_id INT,
  department_name VARCHAR(30), -- Adding department_name column
  FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Create 'employee' table
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id), -- Corrected to 'role(id)'
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);
