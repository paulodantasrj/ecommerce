import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductsAPI = () => {
  //cria o estado produtos usando useState
  const [products, setProducts] = useState([]);

  //para para conectar com o backend no caminho criado /api/products
  const getProducts = async () => {
    const res = await axios.get('/api/products');
    //seta o products com a resposta da chamada
    setProducts(res.data.products);
  };

  //roda ao iniciar o site
  useEffect(
    () => {
      getProducts();
    },
    [] /*executa somente uma vez*/,
  );

  return {
    //retorna um objeto
    products: { products, setProducts },
  };
};

export default ProductsAPI;
