const Product = require('../models/productModel');

/*
 ** achei no google como criar filtros
 ** https://github.com/k-awe-some/traveko/blob/master/src/utils/APIFeatures.ts
 */
class APIfeatures {
  //classe recebe 2 parametros query = Product.find() / queryString = req.query
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  //filtro da caixa de texto
  filtering() {
    const queryObj = { ...this.queryString };

    const excludedFields = ['page', 'sort', 'limit'];
    excludedFields.forEach((el) => delete queryObj[el]);

    //    gte = maior ou igual
    //    lte = menor ou igual
    //    lt = menor que
    //    gt = maior que
    //    regex = query de letra
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => '$' + match,
    );
    this.query.find(JSON.parse(queryStr));

    return this;
  }

  //filtro por ordem de algo ex: preco, nome etc...
  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  //paginacao -- nesse caso retorna ate 3 itens
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 20;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

const productCtrl = {
  //busca produtos
  getProducts: async (req, res) => {
    try {
      //tras uma lista com a chamada requisitada pode ou nao conter os filtros filtering() sorting() paginating()
      const feature = new APIfeatures(Product.find(), req.query)
        .filtering()
        .sorting()
        .paginating();

      //cria a query que realiza os filtros
      const products = await feature.query;

      res.json({
        status: 'success',
        result: products.length,
        products: products,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  //cria o produto
  createProducts: async (req, res) => {
    try {
      const {
        product_id,
        title,
        description,
        price,
        content,
        images,
        category,
      } = req.body;

      //verifica se existe imagem
      if (!images)
        return res.status(400).json({ msg: 'Imagem nao encontrada' });

      //procura no mongo a produto com o mesmo nome
      const product = await Product.findOne({ product_id });
      if (product) return res.status(400).json({ msg: 'produto ja existe' });

      ////cria um novo produto
      const newProduct = new Product({
        product_id,
        title: title.toLowerCase(),
        description,
        price,
        content,
        images,
        category,
      });

      //salva o produto
      await newProduct.save();
      res.json({ msg: 'produto criado' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  //deleta o produto
  deleteProducts: async (req, res) => {
    try {
      //busca no mongo pelo id e deleta
      await Product.findByIdAndDelete(req.params.id);

      res.json({ msg: 'Produto deletado' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  //edita o produto
  updateProducts: async (req, res) => {
    try {
      const { title, description, price, content, images, category } = req.body;
      if (!images)
        return res.status(400).json({ msg: 'Imagem nao encontrada' });

      //metodo do mongo busca pelo id
      await Product.findByIdAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          description,
          price,
          content,
          images,
          category,
        },
      );
      res.json({ msg: 'produto atualizado' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = productCtrl;
