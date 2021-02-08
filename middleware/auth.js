const jwt = require('jsonwebtoken');

//dada uma requisição que está chegando, verifica se ela possui um JWT válido
const auth = (req, res, next) => {
  try {
    //guarda na constante token o header[authorization]
    const token = req.header('Authorization');

    if (!token) return res.status(400).json({ msg: 'autenticacao invalida' });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
      req.user = user;

      //função next que passa para o próximo estágio de execução das funções no pipeline do middleware do Express
      next();
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = auth;
