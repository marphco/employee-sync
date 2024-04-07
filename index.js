const inquirer = require('inquirer');
const Department = require('./models/Department');
const Role = require('./models/Role');
const Employee = require('./models/Employee');
const questions = require('./utils/questions');

const init = async () => {
    try {
        const { action } = await inquirer.prompt(questions.mainMenuQuestions);

        switch (action) {
            case 'View All Departments':
                await viewAllDepartments();
                break;
            case 'View All Roles':
                await viewAllRoles();
                break;
            case 'View All Employees':
                await viewAllEmployees();
                break;
            case 'Add a Department':
                await addDepartment();
                break;
            case 'Add a Role':
                await addRole();
                break;
            case 'Add an Employee':
                await addEmployee(); // Call addEmployee function directly here
                break;
            case 'Update an Employee Role':
                await updateEmployeeRole();
                break;
            case 'Update Employee Manager':
                await updateEmployeeManager();
                break;
            case 'View Employees by Manager':
                await viewEmployeesByManager();
                break;
            case 'View Employees by Department':
                await viewEmployeesByDepartment();
                break;
            case 'Delete Department':
                await deleteDepartment();
                break;
            case 'Delete Role':
                await deleteRole();
                break;
            case 'Delete Employee':
                await deleteEmployee();
                break;
            case 'View Department Budget':
                await viewDepartmentBudget();
                break;
            case 'Exit':
                process.exit();
            default:
                console.log(`Action not recognized: ${action}`);
                break;
        }

        await init(); // Restart the prompt
    } catch (err) {
        console.error('Error: ', err);
        process.exit(1);
    }
};

// Function to view all departments
const viewAllDepartments = async () => {
    const departments = await Department.viewAll();
    console.table(departments);
};

// View all Roles
const viewAllRoles = async () => {
    try {
        const roles = await Role.viewAll();
        console.table(roles);
    } catch (error) {
        console.error('Failed to view all roles:', error);
    }
};

// View all Employees
const viewAllEmployees = async () => {
    try {
        const employees = await Employee.viewAll();
        console.table(employees);
    } catch (error) {
        console.error('Failed to view all employees:', error);
    }
};

// Add a Department
const addDepartment = async () => {
    const { name } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the new department?',
            validate: input => input.trim() ? true : 'Department name cannot be empty.',
        },
    ]);

    try {
        const departmentId = await Department.add(name);
        console.log(`Department '${name}' added successfully.`);
        
        // Fetch and display all departments
        const departments = await Department.viewAll();
        console.log('Updated list of departments:');
        console.table(departments);

        return { departmentId, name }; // Return both ID and name
    } catch (error) {
        console.error('Failed to add department:', error);
        return {}; // Return an empty object in case of an error
    }
};


// Add a Role
const addRole = async () => {
    // Fetch existing departments to display as options
    const departments = await Department.viewAll();
    const departmentChoices = departments.map(dep => ({ name: dep.name, value: dep.id }));
  
    // Prompt user for department from existing options only
    const { selectedDepartmentId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedDepartmentId',
        message: 'Which department does the role belong to?',
        choices: departmentChoices,
      },
    ]);

    // Now that you've selected an existing department, proceed with the rest
    const { title, salary } = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the new role:',
        validate: input => input.trim() ? true : 'Role title cannot be empty.',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the new role:',
        validate: input => !isNaN(parseFloat(input)) && isFinite(input) ? true : 'Please enter a valid salary.',
      },
    ]);
  
    try {
      // Add the new role using the collected details and selected department ID
      await Role.add(title, salary, selectedDepartmentId);
      console.log(`New role "${title}" added successfully.`);

      // Show updated roles table to confirm the addition
      const roles = await Role.viewAll();
      console.table(roles);
    } catch (error) {
      console.error('Failed to add role:', error);
    }
};

  
  

// Add Employee
const addEmployee = async () => {
    try {
        // Fetch existing roles and departments
        const roles = await Role.viewAll();
        const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));

        const departments = await Department.viewAll();
        const departmentChoices = departments.map(dep => ({ name: dep.name, value: dep.id }));

        const managers = await Employee.viewAll();
        const managerChoices = managers.map(manager => ({
            name: `${manager.first_name} ${manager.last_name}`,
            value: manager.id
        }));
        managerChoices.unshift({ name: "No Manager for this role", value: null });

        // Prompt the user to select from existing roles, departments, and managers
        const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: "What is the employee's first name?",
            },
            {
                type: 'input',
                name: 'lastName',
                message: "What is the employee's last name?",
            },
            {
                type: 'list',
                name: 'roleId',
                message: "Select the employee's role:",
                choices: roleChoices,
            },
            {
                type: 'list',
                name: 'managerId',
                message: "Select the employee's manager:",
                choices: managerChoices,
            },
        ]);

        // Add the employee using the selected role and manager
        await Employee.add(firstName, lastName, roleId, managerId);
        console.log(`Added new employee: ${firstName} ${lastName}`);

        // Show employees table after adding new employee
        const employees = await Employee.viewAll();
        console.table(employees);
    } catch (error) {
        console.error('Failed to add employee:', error);
    }
};

// Update an Employee role
const updateEmployeeRole = async () => {
    // Fetch existing employees to display as options
    const employees = await Employee.viewAll(); // Make sure this returns the expected list
    const employeeChoices = employees.map(emp => ({
        name: `${emp.first_name} ${emp.last_name}`, // Adjust property names as needed
        value: emp.id,
    }));

    // Prompt user to select an employee
    const { employeeId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: "Select the employee whose role you want to update:",
        choices: employeeChoices,
      },
    ]);

    // Fetch existing roles to display as options
    const roles = await Role.viewAll(); // Ensure this returns a list of roles
    const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));

    // Prompt user to select the new role for the employee
    const { newRoleId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'newRoleId',
        message: "Select the new role for the employee:",
        choices: roleChoices,
      },
    ]);

    try {
      await Employee.updateRole(employeeId, newRoleId);
      console.log(`Employee's role updated successfully.`);

      // Fetch and display the updated list of employees
      const updatedEmployees = await Employee.viewAll(); // Re-fetch the list of all employees
      console.table(updatedEmployees); // Display the updated list in a table
    } catch (error) {
      console.error('Failed to update employee role:', error);
    }
};

// Update an employee's manager
const updateEmployeeManager = async () => {
    const employees = await Employee.viewAll();
    const employeeChoices = employees.map(emp => ({
        name: `${emp.first_name} ${emp.last_name}`,
        value: emp.id,
    }));

    const { employeeId } = await inquirer.prompt({
        type: 'list',
        name: 'employeeId',
        message: "Select the employee whose manager you want to update:",
        choices: employeeChoices,
    });

    // Exclude the selected employee from being their own manager
    const managerChoices = employees.filter(emp => emp.id !== employeeId).map(emp => ({
        name: `${emp.first_name} ${emp.last_name}`,
        value: emp.id,
    }));

    const { managerId } = await inquirer.prompt({
        type: 'list',
        name: 'managerId',
        message: "Select the employee's new manager:",
        choices: managerChoices,
    });

    await Employee.updateManager(employeeId, managerId);
    console.log("Employee's manager updated successfully.");

    // Fetch and display the updated list of employees
    const updatedEmployees = await Employee.viewAll();
    console.table(updatedEmployees);
};


// View employees by manager
const viewEmployeesByManager = async () => {
    const employees = await Employee.viewAll();
    // Assuming every employee can potentially be a manager, adjust if you have a specific 'isManager' flag or similar
    const managerChoices = employees.map(emp => ({
        name: `${emp.first_name} ${emp.last_name}`,
        value: emp.id, // The employee ID will be used to filter employees by manager
    }));

    const { managerId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'managerId',
            message: "Select a manager to view their employees:",
            choices: managerChoices,
        },
    ]);

    // Assuming you have or will create a method in Employee model to fetch employees by manager
    const employeesByManager = await Employee.viewByManager(managerId);
    console.table(employeesByManager);
};


// View employees by department
const viewEmployeesByDepartment = async () => {
    const departments = await Department.viewAll();
    const departmentChoices = departments.map(dep => ({
        name: dep.name,
        value: dep.id, // Department ID will be used to filter employees
    }));

    const { departmentId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'departmentId',
            message: "Select a department to view its employees:",
            choices: departmentChoices,
        },
    ]);

    // Assuming you have or will create a method in Employee model to fetch employees by department
    const employeesByDepartment = await Employee.viewByDepartment(departmentId);
    console.table(employeesByDepartment);
};


// Delete a department
const deleteDepartment = async () => {
    const departments = await Department.viewAll();
    const departmentChoices = departments.map(dep => ({
        name: dep.name,
        value: dep.id,
    }));

    const { departmentId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'departmentId',
            message: "Select the department you want to delete:",
            choices: departmentChoices,
        },
    ]);

    // Check if there are any roles associated with the department
    const rolesInDepartment = await Role.findByDepartment(departmentId);
    if (rolesInDepartment.length > 0) {
        console.log("The following roles are associated with this department:");
        console.table(rolesInDepartment.map(role => ({ RoleID: role.id, Title: role.title })));
        
        // Here you can decide whether to prompt the user to delete the roles first or cancel the operation
        console.log("Please delete the associated roles first or reassign them to a different department.");
        return; // Exit the function early without deleting the department
    }

    await Department.delete(departmentId);
    console.log("Department deleted successfully.");

    // Optionally, display the updated list of departments
    const updatedDepartments = await Department.viewAll();
    console.table(updatedDepartments);
};




// Delete a role
const deleteRole = async () => {
    const roles = await Role.viewAll();
    const roleChoices = roles.map(role => ({
        name: role.title,
        value: role.id,
    }));

    const { roleId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'roleId',
            message: "Select the role you want to delete:",
            choices: roleChoices,
        },
    ]);

    // Check if there are any employees currently assigned to this role
    const employeesInRole = await Employee.findByRole(roleId);
    if (employeesInRole.length > 0) {
        console.log("The following employees are currently assigned to this role:");
        console.table(employeesInRole.map(emp => `${emp.first_name} ${emp.last_name}`));
        console.log("Please reassign or delete these employees before deleting the role.");
        return; // Exit the function early without deleting the role
    }

    await Role.delete(roleId);
    console.log("Role deleted successfully.");

    // Optionally, display the updated list of roles
    const updatedRoles = await Role.viewAll();
    console.table(updatedRoles);
};


// Delete an employee
const deleteEmployee = async () => {
    const employees = await Employee.viewAll();
    const employeeChoices = employees.map(emp => ({
        name: `${emp.first_name} ${emp.last_name}`,
        value: emp.id,
    }));

    const { employeeId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: "Select the employee you want to delete:",
            choices: employeeChoices,
        },
    ]);

    await Employee.delete(employeeId);
    console.log("Employee deleted successfully.");

    // Optionally, display the updated list of employees
    const updatedEmployees = await Employee.viewAll();
    console.table(updatedEmployees);
};


// View the total utilized budget of a department
const viewDepartmentBudget = async () => {
    const departments = await Department.viewAll();
    const departmentChoices = departments.map(dep => ({
        name: dep.name,
        value: dep.id,
    }));

    const { departmentId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'departmentId',
            message: "Select a department to view its total utilized budget:",
            choices: departmentChoices,
        },
    ]);

    // Find the selected department's name for display purposes
    const departmentName = departmentChoices.find(dep => dep.value === departmentId).name;

    const budget = await Department.viewBudget(departmentId);
    
    // Creating a table with the department name and its budget
    console.log(`Total utilized budget for "${departmentName}":`);
    console.table([{ Department: departmentName, Budget: `$${budget}` }]);
};



// Initialize the application
init();
