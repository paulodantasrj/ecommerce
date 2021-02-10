import React, { useContext } from 'react';
import { GlobalState } from '../../GlobalState';
import ProductItem from './ProductItem';

const Productsindex = () => {
  //usando o contextGlobal - tudo que esta no value passado no arquivo GlobalState.js
  const state = useContext(GlobalState);

  //especifica oq dentro do estado estou querendo usar - obs: a constant {products} foi feito destructuring somente de produtos nao usando o setProducts
  const { products } = state.ProductsAPI.products;

  return (
    <div className="products">
      {products.map((product) => {
        //feito o map e para cada interacao sera criado um component passando o array de produto - obs: boa pratica passar key como parametro
        return <ProductItem key={product._id} product={product} />;
      })}
    </div>
  );
};

export default Productsindex;
