const Category = require('../models/categoryModel');

const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      //se o user role = 1 --> admin
      //somente a role 1 entra nessa funcao
      const { name } = req.body;

      //procura no mongo a categoria com o mesmo nome
      const category = await Category.findOne({ name });
      if (category) return res.status(400).json({ msg: 'categoria ja existe' });

      //cria uma nova categoria
      const newCategory = new Category({ name });

      //salva a categoria
      await newCategory.save();
      res.json({ msg: 'Categoria criada' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.json({ msg: 'categoria deletada' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await Category.findByIdAndUpdate({ _id: req.params.id }, { name });
      res.json({ msg: 'Categoria atualizada' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = categoryCtrl;
