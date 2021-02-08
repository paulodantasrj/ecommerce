const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');

/*
 ** Setando os metodos (GET,POST,DELETE,PUT, etc...) de cada rota
 ** ex: rota '/register' existe para essa rota a chamada - POST.
 */

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/logout', userCtrl.logout);
router.get('/refresh_token', userCtrl.refreshToken);
router.get('/info', auth, userCtrl.getUser);
module.exports = router;
