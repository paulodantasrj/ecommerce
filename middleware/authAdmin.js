const Users = require('../models/userModel');

//dada uma requisição que está chegando, verifica se ela possui admin ou nao
const authAdmin = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      _id: req.user.id,
    });
    if (user.role === 0)
      return res.status(400).json({ msg: 'Recursos de administrador negado' });

    //função next que passa para o próximo estágio de execução das funções no pipeline do middleware do Express
    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = authAdmin;
