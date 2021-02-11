const mongoose = require('mongoose')

//colections que eh salvo no mongodb
const productSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    images: {
      type: Object,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    sold: {
      type: Number,
      default: 0,
    },
    rate: {
      type: Number,
      default: 5,
    },
  },
  {
    //criado em ...
    //alterado em ...
    timestamps: true,
  }
)

//funcao model espera o parametro 1 - nome da colection / 2 - o que sera salvo na colections
module.exports = mongoose.model('Products', productSchema)
