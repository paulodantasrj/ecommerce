const cloudinary = require('cloudinary');
const router = require('express').Router();
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
const fs = require('fs');

//criar a conexao de upload de imagem no cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//upload da imagem -- somente admin
router.post('/upload', auth, authAdmin, (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ msg: 'Nenhum arquivo encontrado' });
    }
    const file = req.files.file;
    //verifica se o tamanho eh maior que 1mb ex(1024*1024*(n) eh o numero de mb - 1024*1024*3 = 3mb )
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      res.status(400).json({ msg: 'imagem muito grande' });
    }

    //verifica a extensao do arquivo
    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      removeTmp(file.tempFilePath);
      res.status(400).json({ msg: 'Formato de imagem incorreto' });
    }

    //faz o upload da imagem
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: 'ecommerce' },
      async (error, result) => {
        if (error) throw error;
        res.json({ public_id: result.public_id, url: result.secure_url });
      },
    );
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//delete da imagem -- somente admin
router.post('/delete', auth, authAdmin, (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ msg: 'Nao existe foto' });

    cloudinary.v2.uploader.destroy(public_id, async (error, result) => {
      if (error) throw error;
      res.json({ msg: 'Imagem deletada' });
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//remove a pasta 'temp' que criar automaticamente no projeto toda faz que realiza o upload da img
const removeTmp = (path) => {
  fs.unlink(path, (error) => {
    if (error) throw err;
  });
};

module.exports = router;
