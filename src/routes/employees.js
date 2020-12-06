const express = require("express");
const router = express.Router(); // Module to create routescd
const mysqlConnection = require("../database"); // Require connection module

// GET ALL DOCUMENTS (index page)
router.get("/", (req, res) => {
  // Query, GET all docs from employees table
  mysqlConnection.query("SELECT * FROM employees", (err, rows, fields) => {
    // If no errors, then show the documents in JSON format
    if (!err) {
      // sending documents from mysql as response (JSON)
      res.json(rows);
      console.log('Query: Select * From employees ("/", GET)', rows);
    } else {
      console.log(err);
    }
  });
});

// GET ONE DOCUMENT
router.get("/:id", (req, res) => {
  const { id } = req.params; // Destructuring objects (ES6), extracting from req (url)
  // Query, GET one doc (using id from req.params) from employees table
  mysqlConnection.query(
    "	SELECT * FROM employees WHERE id = ?",
    [id],
    (err, rows, fields) => {
      // If no errors, then show the document in JSON format
      if (!err) {
        // sending document from mysql as response
        res.json(rows)[0]; // return element 0 from array
        console.log(
          'Query: Select * From employees where id = ?, [id] ("/:id", GET)',
          rows
        );
      } else {
        console.log(err);
      }
    }
  );
});

// CREATE ONE DOCUMENT
router.post("/", (req, res) => {
  // Destructuting object (req.body), receiving data form simulation
  const { id, name, salary } = req.body; // It must be validate
  // Capture query to use procedure, declare variables then in query call set req.body data in
  const query = `
        SET @id = ?;
        SET @name = ?;
        SET @salary = ?;
        CALL cp_addOrEdit(@id, @name, @salary);
    `;
  // Alternative 2: CALL cp_addOrEdit(?, ?, ?);
  // Query, INSERT using PROCEDURE, adding req.body data at procedure. (id no passed because is creating)
  mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
    // If no errors, then show the document in JSON format
    if (!err) {
      // sending document from mysql as response
      res.json({ Status: "Employee successfully added:)" });
      console.log(
        'Query: Call cp_addOrEdit(@id, @name, @salary), [id, name, salary] ("/", POST, Create)'
      );
    } else {
      console.log(err);
    }
  });
});

// EDIT/ UPDATE ONE DOCUMENT
router.put("/:id", (req, res) => {
  // Destructuting object (req.body), receiving data from Form-body simulation
  const { name, salary } = req.body;
  const { id } = req.params; // Get id from url (button update/save from Form simulation)
  // Capture query to use procedure, declare variables then in query call set req.body/params data in
  const query = `
        SET @id = ?;
        SET @name = ?;
        SET @salary = ?;
        CALL cp_addOrEdit(@id, @name, @salary);
    `;
  // Alternative 2: CALL cp_addOrEdit(?, ?, ?);
  // Query, UPDATE using PROCEDURE, adding req.body/params data at procedure.
  mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
    // If no errors, then show the document in JSON format
    if (!err) {
      // sending document from mysql as response
      res.json({ Status: "Employee successfully updated :)" });
      console.log(
        'Query: Call cp_addOrEdit(@id, @name, @salary), [id, name, salary] ("/:id", PUT, Edit)'
      );
    } else {
      console.log(err);
    }
  });
});

// DELETE ONE DOCUMENT
router.delete("/:id", (req, res) => {
  const { id } = req.params; // Get id from url (button delete from Form simulation or button)
  // Query, DELETE directly, set 'id' from req.params (url) in the query
  mysqlConnection.query(
    "DELETE FROM employees WHERE id = ?",
    [id],
    (err, rows, fields) => {
      // If no errors, then show the document in JSON format
      if (!err) {
        // sending document from mysql as response
        res.json({ Status: "Employee successfully deleted :(" });
        console.log(
          'Query: Delete from employees where id = ?, [id] ("/:id", DELETE, Delete)'
        );
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
