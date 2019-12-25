const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    category: {
      type: String,
      unique: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("Category", userSchema);

module.exports = User;
