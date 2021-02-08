const mongoose = require('mongoose');

//modelo que eh salvo no mongodb
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    //criado em ...
    //alterado em ...
    timestamps: true,
  },
);

module.exports = mongoose.model('Category', categorySchema);
