// External requires
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Model used
const User = require("../../models/User");

// Method for loging in with authentification confirmed via token
exports.logIn = async (req, res) => {
  try {
    const {email, password} = req.body;


    await User.findOne({email: email})
      .then((user) => {
        if (!user) {
          return res.status(401).json({error: "Utilisateur non trouvé"});
        }
        bcrypt
          .compare(password, user.password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({error: "Mot de passe invalide"});
            }
            res
              .status(200)
              .json({
                userId: user._id,
                  role: user.role,
                token: jwt.sign({userId: user._id}, process.env.JWT_TOKEN, {
                  expiresIn: "24h",
                }),
              });
          })
      })
  } catch (err) {
    res.status(500).json({error : err})
  }
}
