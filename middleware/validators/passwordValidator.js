// External requires
const passwordValidator = require("password-validator");

module.exports = async (req, res, next) => {
  try {
    const {password} = req.body;
    // Creation of schema for password
    const passwordSchema = new passwordValidator();

    passwordSchema
      .is().min(8)                                      // Minimum length 8
      .is().max(12)                                    // Maximum length 12
      .has().uppercase()                                     // Must have uppercase letter
      .has().lowercase()                                     // Must have lowercase letter
      .has().digits(2)                                 // Must have at least 2 digits
      .has().not().spaces()                                  // Should not have spaces
      .is().not().oneOf(['Passw0rd', 'Password123'])     // Blacklist these values
    if (passwordSchema.validate(password)) {
      next();
    } else {
      res.status(400).json({message: `Le mot de passe doit contenir ${passwordSchema.validate('password', {list: true})}`})
    }
  } catch (err) {
    res.status(400).json({message: "Le mot de passe est invalide"})
  }
}
