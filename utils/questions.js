module.exports = {
  mainMenuQuestions: [
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee Role",
        "Update Employee Manager",
        "View Employees by Manager",
        "View Employees by Department",
        "Delete Department",
        "Delete Role",
        "Delete Employee",
        "View Department Budget",
        "Exit",
      ],
    },
  ],

  addDepartmentQuestions: [
    {
      type: "input",
      name: "name",
      message: "What is the name of the new department?",
      validate: (input) => (input ? true : "Department name cannot be empty."),
    },
  ],

  addRoleQuestions: [
    {
      type: "input",
      name: "title",
      message: "What is the title of the new role?",
      validate: (input) => (input ? true : "Role title cannot be empty."),
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary for this role?",
      validate: (input) =>
        !isNaN(parseFloat(input)) && isFinite(input)
          ? true
          : "Please enter a valid salary.",
    },
    {
      type: "input",
      name: "departmentId",
      message:
        "Which department does the role belong to (enter department ID)?",
      validate: (input) =>
        !isNaN(parseInt(input)) && isFinite(input)
          ? true
          : "Please enter a valid department ID.",
    },
  ],

  addEmployeeQuestions: [
    {
      type: "input",
      name: "firstName",
      message: "What is the employee’s first name?",
      validate: (input) => (input ? true : "First name cannot be empty."),
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the employee’s last name?",
      validate: (input) => (input ? true : "Last name cannot be empty."),
    },
    {
      type: "input",
      name: "roleId",
      message: "What is the employee’s role (enter role ID)?",
      validate: (input) =>
        !isNaN(parseInt(input)) && isFinite(input)
          ? true
          : "Please enter a valid role ID.",
    },
    {
      type: "input",
      name: "managerId",
      message: "Who is the employee’s manager (enter manager ID)?",
      validate: (input) =>
        input === "" || (!isNaN(parseInt(input)) && isFinite(input))
          ? true
          : "Please enter a valid manager ID or leave empty if no manager.",
    },
  ],

  updateEmployeeRoleQuestions: [
    {
      type: "input",
      name: "employeeId",
      message: "Enter the employee's ID you want to update:",
      validate: (input) =>
        !isNaN(parseInt(input)) && isFinite(input)
          ? true
          : "Please enter a valid employee ID.",
    },
    {
      type: "input",
      name: "newRoleId",
      message: "Enter the new role ID for the employee:",
      validate: (input) =>
        !isNaN(parseInt(input)) && isFinite(input)
          ? true
          : "Please enter a valid role ID.",
    },
  ],

  updateEmployeeManagerQuestions: [
    {
      type: "input",
      name: "employeeId",
      message: "Enter the ID of the employee whose manager you want to update:",
      validate: (input) =>
        !isNaN(parseInt(input)) && isFinite(input)
          ? true
          : "Please enter a valid employee ID.",
    },
    {
      type: "input",
      name: "managerId",
      message:
        "Enter the new manager ID for the employee (leave blank if no manager):",
      validate: (input) =>
        input === "" || (!isNaN(parseInt(input)) && isFinite(input))
          ? true
          : "Please enter a valid manager ID or leave blank if no manager.",
    },
  ],

  viewEmployeesByManagerQuestions: [
    {
      type: "input",
      name: "managerId",
      message: "Enter the manager ID to view their employees:",
      validate: (input) =>
        !isNaN(parseInt(input)) && isFinite(input)
          ? true
          : "Please enter a valid manager ID.",
    },
  ],

  viewEmployeesByDepartmentQuestions: [
    {
      type: "input",
      name: "departmentId",
      message: "Enter the department ID to view its employees:",
      validate: (input) =>
        !isNaN(parseInt(input)) && isFinite(input)
          ? true
          : "Please enter a valid department ID.",
    },
  ],

  deleteDepartmentQuestions: [
    {
      type: "input",
      name: "departmentId",
      message: "Enter the ID of the department you want to delete:",
      validate: (input) =>
        !isNaN(parseInt(input)) && isFinite(input)
          ? true
          : "Please enter a valid department ID.",
    },
  ],

  deleteRoleQuestions: [
    {
      type: "input",
      name: "roleId",
      message: "Enter the ID of the role you want to delete:",
      validate: (input) =>
        !isNaN(parseInt(input)) && isFinite(input)
          ? true
          : "Please enter a valid role ID.",
    },
  ],

  deleteEmployeeQuestions: [
    {
      type: "input",
      name: "employeeId",
      message: "Enter the ID of the employee you want to delete:",
      validate: (input) =>
        !isNaN(parseInt(input)) && isFinite(input)
          ? true
          : "Please enter a valid employee ID.",
    },
  ],

  departmentBudgetQuestions: [
    {
      type: "input",
      name: "departmentId",
      message: "Enter the department ID to view its utilized budget:",
      validate: (input) =>
        !isNaN(parseInt(input)) && isFinite(input)
          ? true
          : "Please enter a valid department ID.",
    },
  ],
};
