import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
});

export const createTable = client.connect()
  .then(() => {
    console.log('Connected to the database');
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS employees (
        id SERIAL PRIMARY KEY,
        remote_id VARCHAR(255) NOT NULL,
        employee_number VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL
        UNIQUE (remote_id, employee_number)
      );
    `;
    return client.query(createTableQuery);
  })
  .then(() => console.log('employees table created successfully'))
  .catch((err) => console.error('Error connecting to the database:', err));

export default client;
