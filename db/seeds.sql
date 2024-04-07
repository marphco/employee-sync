-- Insert into 'department' table
INSERT INTO department (name) VALUES 
('Engineering'),
('Human Resources'),
('Marketing');

-- Insert into 'role' table. 
-- Note: department_id values should correspond to actual IDs from the 'department' table.
INSERT INTO role (title, salary, department_id) VALUES 
('Software Engineer', 80000.00, 1),
('HR Manager', 60000.00, 2),
('Marketing Coordinator', 50000.00, 3);

-- Insert into 'employee' table. 
-- Note: role_id values should correspond to actual IDs from the 'role' table.
-- The manager_id field can be NULL if there is no manager, or it should match an actual employee id.
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, NULL),
('Emily', 'Johnson', 3, 1),
('Michael', 'Brown', 1, 1);

-- Make sure to adjust the IDs and values based on your actual schema and the IDs that your tables will generate.

-- After running this script, your tables should be populated with this initial set of data.
