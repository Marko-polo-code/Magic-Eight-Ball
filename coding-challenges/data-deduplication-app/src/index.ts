import app from './app';
import { processEmployees } from "./employeeProcessor";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  generateAndProcessDummyData();
});

function generateAndProcessDummyData() {
  const employees = [
    { remote_id: '1', employee_number: '1001', first_name: 'John', last_name: 'Doe' },
    { remote_id: '2', employee_number: '1002', first_name: 'Jane', last_name: 'Smith' },
    { remote_id: '3', employee_number: '1003', first_name: 'Alice', last_name: 'Johnson' },
    { remote_id: '4', employee_number: '1004', first_name: 'Bob', last_name: 'Brown' },
    { remote_id: '5', employee_number: '1005', first_name: 'Charlie', last_name: 'Davis' },
    { remote_id: '6', employee_number: '1006', first_name: 'David', last_name: 'Wilson' },
    { remote_id: '7', employee_number: '1007', first_name: 'Eva', last_name: 'Moore' },
    { remote_id: '8', employee_number: '1008', first_name: 'Frank', last_name: 'Taylor' },
    { remote_id: '9', employee_number: '1009', first_name: 'Grace', last_name: 'Anderson' },
    { remote_id: '10', employee_number: '1010', first_name: 'Hank', last_name: 'Thomas' },
    { remote_id: '11', employee_number: '1011', first_name: 'Ivy', last_name: 'Jackson' },
    { remote_id: '12', employee_number: '1012', first_name: 'Jack', last_name: 'White' },
    { remote_id: '13', employee_number: '1013', first_name: 'Karen', last_name: 'Harris' },
    { remote_id: '14', employee_number: '1014', first_name: 'Leo', last_name: 'Martin' },
    { remote_id: '15', employee_number: '1015', first_name: 'Mia', last_name: 'Thompson' },
    { remote_id: '16', employee_number: '1016', first_name: 'Noah', last_name: 'Garcia' },
    { remote_id: '17', employee_number: '1017', first_name: 'Olivia', last_name: 'Martinez' },
    { remote_id: '18', employee_number: '1018', first_name: 'Paul', last_name: 'Robinson' },
    { remote_id: '19', employee_number: '1019', first_name: 'Quinn', last_name: 'Clark' },
    { remote_id: '20', employee_number: '1020', first_name: 'Rachel', last_name: 'Rodriguez' },
    { remote_id: '21', employee_number: '1021', first_name: 'Mark', last_name: 'Muller' },
    // Adding duplicates
    { remote_id: '1', employee_number: '1001', first_name: 'John', last_name: 'Doe' },
    { remote_id: '2', employee_number: '1002', first_name: 'Jane', last_name: 'Smith' },
  ];

  processEmployees(employees)
    .then(() => console.log('Dummy data processed'))
    .catch((error) => console.error('Error processing dummy data:', error));
}
