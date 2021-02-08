const mongoose = require('mongoose');

//modelo que eh salvo no mongodb
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    cart: {
      type: Array,
      default: [],
    },
  },
  {
    //criado em ...
    //alterado em ...
    timestamps: true,
  },
);
module.exports = mongoose.model('User', userSchema);
