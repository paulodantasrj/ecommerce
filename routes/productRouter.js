const router = require('express').Router();
const productCtrl = require('../controllers/productCtrl');

/*
 ** Setando os metodos (GET,POST,DELETE,PUT, etc...) de cada rota
 ** ex: rota '/products' existem para essa rota as chamadas - GET e POST.
 */

router
  .route('/products')
  .get(productCtrl.getProducts)
  .post(productCtrl.createProducts);

router
  .route('/products/:id')
  .delete(productCtrl.deleteProducts)
  .put(productCtrl.updateProducts);

module.exports = router;
