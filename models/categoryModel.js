const mongoose = require('mongoose')

//colections que eh salvo no mongodb
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
  }
)

//funcao model espera o parametro 1 - nome da colection / 2 - o que sera salvo na colections
module.exports = mongoose.model('Category', categorySchema)
