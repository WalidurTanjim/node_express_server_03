import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
     connectionString: config?.CONNECTION_STRING
});

const initDB = async() => {
     const client = await pool.connect();

     try {
          await client.query("BEGIN");

          await pool.query(`
               CREATE TABLE IF NOT EXISTS users(
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    role VARCHAR(50) NOT NULL,
                    email VARCHAR(150) UNIQUE NOT NULL,
                    password TEXT NOT NULL,
                    age INT,
                    phone VARCHAR(15),
                    address TEXT,
                    created_at TIMESTAMP DEFAULT NOW(),
                    updated_at TIMESTAMP DEFAULT NOW()
               )
          `);

          await pool.query(`
               CREATE TABLE IF NOT EXISTS todos(
                    id SERIAL PRIMARY KEY,
                    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                    title VARCHAR(200) NOT NULL,
                    description TEXT,
                    completed BOOLEAN DEFAULT FALSE,
                    due_data Date,
                    created_at TIMESTAMP DEFAULT NOW(),
                    updated_at TIMESTAMP DEFAULT NOW()
               )     
          `);

          await client.query("COMMIT");
          console.log("Table created successfully!");
     } catch (error) {
          await client.query("ROLLBACK");
          console.error("Database initialization failed:", error);
          throw error;
     } finally {
          client.release();
     }
}

export default initDB;
