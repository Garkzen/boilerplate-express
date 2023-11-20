let express = require('express'); // Import the Express.js framework
let app = express(); // Create an instance of the Express application
let bodyParser = require('bodyParser'); // Import bodyParser
require('dotenv').config() // Import dotenv

// Define middleware to log HTTP method, req path, and client IP address to console
const middlewareLogger = (req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  // Call "next" function in middleware chain to pass control to next middleware/route handler
  next();
}

app.use(middlewareLogger); // Mount middlewareLogger on the entire application

// Middleware to set current time in request object and respond with a JSON containing the time
app.get('/now', 
  (req, res, next) => {
    req.time = new Date().toString(); // Set current time
    next(); // Pass control to the next middleware
  }, 
  (req, res) => {
    res.json({time: req.time}); // Respond with JSON containing the time
  }
);

// Echo server
app.get('/:word/echo', (req, res) => {
  res.json({echo: req.params.word});
})

// API endpoint
app.get('/name', (req, res) => {
  const {first, last} = req.query;
  res.json({name: `${first} ${last}`});
})

// Mount bodyParser
app.use(bodyParser.urlencoded({extended: false}));

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
