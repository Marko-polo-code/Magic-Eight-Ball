import { processEmployee, processEmployees } from '../employeeProcessor';
import client, { createTable } from '../database';

jest.mock('../database', () => {
  const mockQuery = jest.fn();
  return {
    query: mockQuery,
    createTable: jest.fn(),
  };
});

describe('EmployeeProcessor', () => {
  const mockEmployee = {
    remote_id: '1',
    employee_number: '123',
    first_name: 'John',
    last_name: 'Doe',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should skip insertion if employee already exists', async () => {
    (client.query as jest.Mock).mockResolvedValueOnce({ rows: [mockEmployee] });

    await processEmployee(mockEmployee);

    expect(client.query).toHaveBeenCalledTimes(1);
    expect(client.query).toHaveBeenCalledWith('SELECT * FROM employees WHERE remote_id = $1 AND employee_number = $2', [mockEmployee.remote_id, mockEmployee.employee_number]);
  });

  it('should insert employee if not already exists', async () => {
    (client.query as jest.Mock).mockResolvedValueOnce({ rows: [] });

    await processEmployee(mockEmployee);

    expect(client.query).toHaveBeenCalledTimes(2);
    expect(client.query).toHaveBeenNthCalledWith(1, 'SELECT * FROM employees WHERE remote_id = $1 AND employee_number = $2', [mockEmployee.remote_id, mockEmployee.employee_number]);
    expect(client.query).toHaveBeenNthCalledWith(2, 'INSERT INTO employees (remote_id, employee_number, first_name, last_name) VALUES ($1, $2, $3, $4)', [mockEmployee.remote_id, mockEmployee.employee_number, mockEmployee.first_name, mockEmployee.last_name]);
  });

  it('should catch error processing employee', async () => {
    (client.query as jest.Mock).mockRejectedValueOnce(new Error('Some error'));

    await processEmployee(mockEmployee);

    expect(client.query).toHaveBeenCalledTimes(1);
    expect(client.query).toHaveBeenCalledWith('SELECT * FROM employees WHERE remote_id = $1 AND employee_number = $2', [mockEmployee.remote_id, mockEmployee.employee_number]);
  });

  it('should catch error processing employees', async () => {
    const mockEmployees = [mockEmployee, mockEmployee];
    (client.query as jest.Mock).mockRejectedValueOnce(new Error('Some error'));

    await processEmployees(mockEmployees);

    expect(client.query).toHaveBeenCalledTimes(2);
    expect(client.query).toHaveBeenCalledWith('SELECT * FROM employees WHERE remote_id = $1 AND employee_number = $2', [mockEmployee.remote_id, mockEmployee.employee_number]);
  });

});
