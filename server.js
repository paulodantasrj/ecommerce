require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

//usando o express
const app = express();

//seta o que o express vai usar
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  }),
);

//Rotas
app.use('/user', require('./routes/userRouter'));
app.use('/api', require('./routes/categoryRouter'));
app.use('/api', require('./routes/upload'));
app.use('/api', require('./routes/productRouter'));

//conexao com banco de dados
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  },
  (error) => {
    if (error) throw error;
    console.log('mongo conectado');
  },
);

//alterar/apagar depois
app.get('/', (req, res) => {
  res.json({ msg: 'oi' });
});

//Startando servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('server rodando');
});
