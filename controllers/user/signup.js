// External requires
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Model used
const User = require("../../models/User");

// Method for signing up with password hashing with bcrypt
exports.signUp = async (req, res) => {
  try {

    const {email, password} = req.body;
    let role = "User";
    User.count((err, count) => {
        if(!err && count === 0) {
            return role = "Admin"
        }
    })

      const hash = await bcrypt.hash(password, 10)
      const user = await User.create({
          email,
          password: hash,
          role
      })

      await user.save()
          .then(() => res.status(201).json({
              userId: user._id,
              token: jwt.sign({userId: user._id}, process.env.JWT_TOKEN, {
                                        expiresIn: "24h",
              }),
              role: user.role
          }))

  } catch (err) {
    res.status(500).json({error: err})
  }
}


