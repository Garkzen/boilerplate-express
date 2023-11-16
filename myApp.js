// Import the Express.js framework
let express = require('express');

// Create an instance of the Express application
let app = express();

// Load dotenv
require('dotenv').config()

// Define a middleware function that logs the HTTP method, request path, and client IP address to the console
const middlewareLogger = (req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  // Call the next function in the middleware chain to pass control to the next middleware or route handler
  next();
}

// Mount the middlewareLogger on the entire application
app.use(middlewareLogger);

// Display index.html at the root path
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Serve a JSON object at the /json path and apply .env condition
app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
  res.json({"message": "HELLO JSON"});
  } else {
  res.json({"message": "Hello json"});
  }
});

// Serve the files in the /public directory statically at the /public path
app.use("/public", express.static(__dirname + '/public'));


console.log("Hello World");  

































 module.exports = app;
