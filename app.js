// External requires
const express = require("express");
const path = require("path");

// Security features
const mongoSanitize = require("express-mongo-sanitize");
const toobusy = require("toobusy-js");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const dotenv = require("dotenv").config('./.env');

// Log features
const morgan = require("morgan");

// Connection to database MongoDB
const mongoose = require("./db/db");

// Routes used
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

// Creating Express application
const app = express();

// Creating log for errors
app.use(morgan("dev"));

// Setting CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Parsing req using Express method
app.use(express.json({limit: "1mb"}));

// Using helmet to secure headers
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

// Block request when server is too busy
app.use(function(req,res,next) {
  if(toobusy()) {
    res.status(503).json({ message: "I'm busy right now, sorry."});
  } else {
    next();
  }
});

// Limit requests for a period of time
const limiter = rateLimit({
  windowMS: 15 * 60 * 1000, //15 minutes
  max: 100, // Limit each IP to 100 requests per "window"
  standardHeaders: true,
  legacyHeaders: false,
})

// Prevention of NoSQL injection
app.use(mongoSanitize());
app.use(limiter);

// Use of routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);


// Exporting app
module.exports = app;
