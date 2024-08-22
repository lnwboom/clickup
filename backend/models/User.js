const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatarUrl : String || "https://via.placeholder.com/40" ,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);