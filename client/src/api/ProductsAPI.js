import { useState, useEffect } from 'react'
import axios from 'axios'

const ProductsAPI = () => {
  //cria o estado "produtos" usando useState
  const [products, setProducts] = useState([])

  /*
   * funcao que conecta com o backend no caminho criado no servidor node
   ** - app.use('/api', require('./routes/productRouter'));
   *** - router.route('/products').get(productCtrl.getProducts)
   **** - /api/products
   */
  const getProducts = async () => {
    const res = await axios.get('/api/products')
    //seta o products com a resposta da chamada
    setProducts(res.data.products)
  }

  //primeira coisa que executa ao ser chamado
  useEffect(
    () => {
      getProducts()
    },
    [] /*executa somente uma vez*/
  )

  return {
    //retorna um objeto
    products: { products, setProducts },
  }
}

export default ProductsAPI
