const mysql = require('mysql2/promise');
const connection = require('../db/connection');

class Employee {
  // Function to view all employees
  static async viewAll() {
    // Using the existing connection to query the database
    const [rows] = await connection.promise().query(`
        SELECT e.id, e.first_name, e.last_name, r.title AS role, r.salary, d.name AS department, 
        CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employees e
        LEFT JOIN role r ON e.role_id = r.id
        LEFT JOIN department d ON r.department_id = d.id
        LEFT JOIN employees m ON e.manager_id = m.id;
    `);
    return rows;
}

  // Function to add an employee
  static add(firstName, lastName, roleId, managerId) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', 
      [firstName, lastName, roleId, managerId], 
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Get choices for managers
  static async getManagerChoices() {
    try {
      const managers = await this.viewAll();
      return managers.map(manager => ({ name: manager.manager, value: manager.id }));
    } catch (error) {
      throw error;
    }
  }

// Update an employee's role
static async updateRole(employeeId, newRoleId) {
    const query = 'UPDATE employees SET role_id = ? WHERE id = ?';
    await connection.promise().query(query, [newRoleId, employeeId]);
  }

   // Update an employee's manager
   static async updateManager(employeeId, managerId) {
    const query = 'UPDATE employees SET manager_id = ? WHERE id = ?';
    await connection.promise().query(query, [managerId, employeeId]);
}

// Fetch employees by manager
static async viewByManager(managerId) {
    const [rows] = await connection.promise().query(`
        SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department
        FROM employees e
        JOIN role r ON e.role_id = r.id
        JOIN department d ON r.department_id = d.id
        WHERE e.manager_id = ?`, 
        [managerId]
    );
    return rows;
}

// Fetch employees by department
static async viewByDepartment(departmentId) {
    const [rows] = await connection.promise().query(`
        SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department
        FROM employees e
        JOIN role r ON e.role_id = r.id
        JOIN department d ON r.department_id = d.id
        WHERE d.id = ?`, 
        [departmentId]
    );
    return rows;
}

// Fetch employees by role
static async findByRole(roleId) {
    const [rows] = await connection.promise().query(
        'SELECT id, first_name, last_name FROM employees WHERE role_id = ?',
        [roleId]
    );
    return rows;
}

// Function to delete an employee by ID
static async delete(employeeId) {
    await connection.promise().query('DELETE FROM employees WHERE id = ?', [employeeId]);
}

}



module.exports = Employee;
