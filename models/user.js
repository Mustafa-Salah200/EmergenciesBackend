const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    point: {
      type: Number,
      default: 0,
    },

  }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
