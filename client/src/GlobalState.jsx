import React, { createContext, useState } from 'react';
import ProductsAPI from './api/ProductsAPI';

//cria um contexto geral da aplicao
export const GlobalState = createContext();

//cria uma funcao que retorna esse contexto
export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  //cria um objeto que serve como o value a ser passado
  const state = {
    token: [token, setToken],

    ProductsAPI: ProductsAPI(),
  };
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
