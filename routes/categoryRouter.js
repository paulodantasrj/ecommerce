const router = require('express').Router();
const categoryCtrl = require('../controllers/caterogyCtrl');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

/*
 ** Setando os metodos (GET,POST,DELETE,PUT, etc...) de cada rota
 ** ex: rota '/category' existem para essa rota as chamadas - GET e POST.
 ** '/category/:id' = recebe o id como parametro da requisicao
 ** ex: rota '/category/:id' existem para essa rota as chamadas - delete e put.
 */

router
  .route('/category')
  .get(categoryCtrl.getCategories)
  .post(auth, authAdmin, categoryCtrl.createCategory);

router
  .route('/category/:id')
  .delete(auth, authAdmin, categoryCtrl.deleteCategory)
  .put(auth, authAdmin, categoryCtrl.updateCategory);

module.exports = router;
