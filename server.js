require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  }),
);
app.use('/user', require('./routes/userRouter'));

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

app.get('/', (req, res) => {
  res.json({ msg: 'oi' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('server rodando');
});
