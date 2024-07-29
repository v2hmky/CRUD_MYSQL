const mysql = require('mysql');

const connection = mysql.createConnection(
  {
    host: "localhost",
    user: "hmky94",
    password: "hmky@1994",
  }
)

const database = "superheros";
const table = "names";

connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to SQL Server");
  
  //check if database exists

  connection.query(`CREATE DATABASE IF NOT EXISTS ${database}`, (err, result) => {
    if(err) throw err;

    connection.query(`USE ${database}`, (err, result) => {
      if(err) throw err;
      console.log(`Connected to database ${database}`);

      const createTableQuery = 
      `CREATE TABLE IF NOT EXISTS ${table}(
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`

      connection.query(createTableQuery, (err, result) => {  
        if(err) throw err;
        console.log(`Connected to table ${table}`);
      }
      )
    })
  })

});

module.exports = {connection, database, table};