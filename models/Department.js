const connection = require('../db/connection');

class Department {
  // Function to view all departments
  static async viewAll() {
    const [departments] = await connection.promise().query('SELECT * FROM department');
    return departments;
  }

  // Function to add a department
  static async add(name) {
    const [result] = await connection.promise().query('INSERT INTO department (name) VALUES (?)', [name]);
    return result.insertId; // Directly return the departmentId
  }

  // Function to delete a department by ID
  static async delete(departmentId) {
    await connection.promise().query('DELETE FROM department WHERE id = ?', [departmentId]);
}

// Function to view the total utilized budget of a department
static async viewBudget(departmentId) {
  const [rows] = await connection.promise().query(`
      SELECT SUM(r.salary) AS totalBudget
      FROM employees e
      JOIN role r ON e.role_id = r.id
      WHERE r.department_id = ?`, 
      [departmentId]
  );
  return rows[0].totalBudget || 0; // Ensure a number is returned
}

}

module.exports = Department;
