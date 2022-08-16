// External requires
const mongoose = require("mongoose");

// Schema for a post using mongoose
const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  title: {
    type: String,
    minlength: [3, "Le titre du post renseigné est trop court"],
    maxlength: [30, "Le titre du post renseigné est trop long"],
    required: [true, "Veuillez renseigner un titre"] },
  content: {
    type: String,
    minlength: [2, "Le contenu du post est trop court"],
    maxlength: [3000, "Le post ne doit pas excéder 3000 caractères"],
    required: [true, "Veuillez renseigner un contenu"] },
  imageUrl: {
    type: String,
    required: [true, "Veuillez ajouter une image"] },
  date: {
    type: Date,
    required: true},
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: Array, default: [] },
  usersDisliked: { type: Array, default: [] },
});

module.exports = mongoose.model("Post", postSchema);
