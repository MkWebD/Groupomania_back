// External requires
const express = require("express");
const bouncer = require("express-bouncer")(30000, 120000, 3)

// Importing middleware
const passwordValidator = require("../middleware/validators/passwordValidator");
const emailValidator = require("../middleware/validators/emailValidator");

// Importing methods for users
const {signUp} = require("../controllers/user/signup");
const {logIn} = require("../controllers/user/login");

// Creating express Router
const router = express.Router();

// Custom error message for bouncer
bouncer.blocked = function (req, res, next, remaining) {
  res.status(429).json({message: "Too many requests have been made. Please wait " + remaining/1000 + " seconds."});
};

// Routing for users
router.post("/signup", passwordValidator, emailValidator, signUp);
router.post("/login", bouncer.block, emailValidator, logIn);

// Exportation of module router
module.exports = router;
