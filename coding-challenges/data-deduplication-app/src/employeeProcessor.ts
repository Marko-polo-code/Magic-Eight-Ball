import client, { createTable } from './database';

interface Employee {
  remote_id: string;
  employee_number: string;
  first_name: string;
  last_name: string;
}

export async function processEmployee(employee: Employee) {
  const query = 'SELECT * FROM employees WHERE remote_id = $1 AND employee_number = $2';
  const values = [employee.remote_id, employee.employee_number];

  try {
    const { rows } = await client.query(query, values);

    // If the employee exists in the database, do not insert
    if (rows.length > 0) {
      console.log(`Employee with remote_id ${employee.remote_id} and employee_number ${employee.employee_number} already exists. Skipping insertion.`);
      return;
    }

    // If the employee does not exist, insert into the database
    const insertQuery = 'INSERT INTO employees (remote_id, employee_number, first_name, last_name) VALUES ($1, $2, $3, $4)';
    const insertValues = [employee.remote_id, employee.employee_number, employee.first_name, employee.last_name];
    await client.query(insertQuery, insertValues);

    console.log(`Inserted employee with remote_id ${employee.remote_id} and employee_number ${employee.employee_number}`);
  } catch (error) {
    console.error('Error processing employee:', error);
  }
}

export async function processEmployees(employees: Employee[]) {
  await createTable;
  for (const employee of employees) {
    await processEmployee(employee);
  }
}
