// External requires
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Schema for a user using mongoose
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Veuillez renseigner une adresse email"],
    unique: [true, "L'adresse email est déjà utilisée"],
  },
  password: { type: String,
    required: [true, "Veuillez renseigner un mot de passe"] },
  role: { type: String, required: true, default: "User"}
});

// Verifying if unique with plugin
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
