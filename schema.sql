DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE employees
(
    id INTEGER AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    PRIMARY KEY (id)
);

SELECT * FROM employees;

CREATE TABLE role
(
    id INTEGER AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary INTEGER NOT NULL,
    role_id INTEGER NOT NULL,
    department_id INTEGER NOT NULL,
    PRIMARY KEY (id)
);
SELECT * FROM role;

CREATE TABLE department
(
    id INTEGER AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

SELECT * FROM department;

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 2, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Chan", 2, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Ashley", "Rodriguez", 3, 0);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Tupik", 3, 0);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Malia", "Brown", 3, 0);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Lourd", 3, 0);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Allen", 3, 0);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Christian", "Eckenrode", 3, 0);

INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");
INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO role (title, salary, role_id, department_id)
VALUES ("Sales Lead", "100000", 1, 4);
INSERT INTO role (title, salary, role_id, department_id)
VALUES ("Salesperson", "80000", 2, 4);
INSERT INTO role (title, salary, role_id, department_id)
VALUES ("Lead Engineer", "150000", 3, 1);
INSERT INTO role (title, salary, role_id, department_id)
VALUES ("Software Engineer", "120000", 4, 1);
INSERT INTO role (title, salary, role_id, department_id)
VALUES ("Accountant", "125000", 5, 2);
INSERT INTO role (title, salary, role_id, department_id)
VALUES ("Legal Team Lead", "250000", 6, 3);
INSERT INTO role (title, salary, role_id, department_id)
VALUES ("Lawyer", "190000", 7, 3);
INSERT INTO role (title, salary, role_id, department_id)
VALUES ("Lead Engineer", "150000", 3, 1);
    