// This applications can be tested in API manager app (Postman, Insomnia,etc)
const express = require("express");
const app = express(); // Initialize Express

// SETTINGS
app.set("port", process.env.PORT || 3000); // Set port

// MIDDLEWARES
app.use(express.json()); // Express support JSON format
// ROUTES
app.use(require("./routes/employees")); // employees path
// START SERVER
app.listen(app.get("port"), () => {
  console.log("server on port ", app.get("port"));
});
