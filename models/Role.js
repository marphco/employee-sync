const connection = require('../db/connection');

class Role {
  // Function to view all roles
  static viewAll() {
    return new Promise((resolve, reject) => {
      connection.query(`
        SELECT r.id, r.title, r.salary, d.name AS department
        FROM role r
        JOIN department d ON r.department_id = d.id`,
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  // Function to add a role
  static add(title, salary, departmentId) {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
        [title, salary, departmentId],
        (err, result) => {
          if (err) {
            console.error('Error adding role:', err);
            reject(err);
          } else {
            console.log('Role added successfully.');
            resolve(result);
          }
        }
      );
    });
  }

  // Find roles by department
  static async findByDepartment(departmentId) {
    const [rows] = await connection.promise().query(
        'SELECT id, title FROM role WHERE department_id = ?',
        [departmentId]
    );
    return rows;
}

// Function to delete a role by ID
static async delete(roleId) {
    await connection.promise().query('DELETE FROM role WHERE id = ?', [roleId]);
}
}

module.exports = Role;
