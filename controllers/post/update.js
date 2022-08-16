// Model used
const Post = require("../../models/Post");
const User = require("../../models/User");

// External requires
const fs = require("fs");

// Method for modifying an existing post
exports.updatePost = async (req, res) => {
  try {

    const user = await User.findById({_id: req.auth.userId});
    const post = await Post.findById({_id: req.params.id})

// destructuring req.body
    const {title, content} = req.body;
    const {userId} = req.auth

    if(userId !== post.userId && user.role !== "Admin") {
      return res.status(401).json({message: "requête non autorisée"})
    }

     // Check if file is updated and delete old one if existing
    if(req.file) {
      const post = await Post.findById({_id: req.params.id}).exec();
      const {imageUrl} = post
      const filename = imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, (err) => {})
    }

    // Populate new object with new image or new datas
    const postObject = req.file
      ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
      : {
        title: title,
        content: content
      };

// Update post data or image
    await Post.findByIdAndUpdate({_id: req.params.id}, {
      ...postObject,
      _id: req.params.id,
      date: Date.now()
    })
    res.status(200).json({message: "Post modifié !"})

} catch(err) {
  res.status(400).json({error: err})
}
}
