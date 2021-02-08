const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userCtrl = {
  //cria usuario
  register: async (req, res) => {
    try {
      //recebe do browser os parametros
      const { name, email, password } = req.body;

      //verifica no mongo se ja tem um user com esse email
      const user = await Users.findOne({ email });
      if (user) return res.status(400).json({ msg: 'Email ja existe' });

      //verifica se a senha tem mais de 6 digitos
      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: 'Senha deve conter mais de 6 caracteres' });

      //encript a senha
      const passordHash = await bcrypt.hash(password, 10);

      //cria o user para salvar no banco sequindo os parametros do userModel
      const newUser = new Users({
        name,
        email,
        password: passordHash,
      });

      //salva usuario
      await newUser.save();

      //criando o jwt para autenticacao
      const accesstoken = createAccessToken({ id: newUser._id });
      const refreshtoken = createRefreshToken({ id: newUser._id });

      //cria um cookie para armazenar os dados
      res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: '/user/refresh_token',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });

      res.json({ accesstoken });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  // login usuario
  login: async (req, res) => {
    try {
      //recupera os dados do body da requisicao
      const { email, password } = req.body;

      //verifica no mongo se tem algum usuario com o email passado caso positivo quarda os dados completos na variavel
      const user = await Users.findOne({ email });
      if (!user) res.status(400).json({ msg: 'Usuario nao existe' });

      //verifica se a senha eh a mesma
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) res.status(400).json({ msg: 'Senha incorreta' });

      //criando o jwt para autenticacao
      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });

      //cria um cookie para armazenar os dados
      res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: '/user/refresh_token',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });

      res.json({ accesstoken });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  // logout usuario
  logout: async (req, res) => {
    try {
      //limpar o cookie do navegador
      res.clearCookie('refreshtoken', { path: '/user/refresh_token' });

      return res.json({ msg: 'Feito logout' });
    } catch (error) {
      return res.json({ msg: error.message });
    }
  },
  //verifica token
  refreshToken: (req, res) => {
    try {
      //recupera o token do cookie e verifica se existe
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: 'Logue ou cadastre-se' });

      //compara se o token do cookie eh igual ao token do .env
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: 'Logue ou cadastre-se' });

        //cria o token
        const accesstoken = createAccessToken({ id: user.id });

        res.json({ accesstoken });
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  //busca os usuarios
  getUser: async (req, res) => {
    try {
      //verifica no mongo se tem algum usuario com o id passado caso positivo quarda os dados completos na variavel - retornando sem o password
      const user = await Users.findById(req.user.id).select('-password');
      if (!user) return res.status(400).json({ msg: 'usuario nao existe' });

      res.json(user);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

//metodo para criar o token que expira em 1 dia
const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};

//metodo que diz quando vai alterar o token ja existente que expira em 7 dias
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

module.exports = userCtrl;
