const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "SHNkhbdyi12",
});

const createDatabase = async () => {
  try {
    await connection
      .promise()
      .query("CREATE DATABASE IF NOT EXISTS booking_clone");
    console.log("Database 'booking_clone' created or already exists.");
  } catch (err) {
    console.error("Error creating database:", err.stack);
  } finally {
    connection.end();
  }
};

module.exports = createDatabase;
