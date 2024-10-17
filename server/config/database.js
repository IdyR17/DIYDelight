import pkg from 'pg'; // Use 'pg' package for PostgreSQL
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from the .env file

const { Pool } = pkg; // Destructure Pool from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  // Use DATABASE_URL from your .env
  ssl: {
    rejectUnauthorized: false,  // Disable SSL verification for some hosted databases
  },
});

export { pool }; // Ensure you export pool as a named export

