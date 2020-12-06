const mysql = require("mysql"); // Connection to mysql

// Define MySql settings
const mysqlConnection = mysql.createConnection({
  // Typical data
  host: "localhost",
  user: "root", // By default MySwl set root user
  password: "123123", // Your database password
  database: "company",
  multipleStatements: true,
});

// Connect data model with MySql
mysqlConnection.connect(function (err) {
  if (err) {
    console.log("WRONG PASSWORD :( ", err);
    return;
  } else {
    console.log("DATABASE CONNECTED :) ");
  }
});
module.exports = mysqlConnection;
