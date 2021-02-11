import React, { createContext, useState } from 'react'
import ProductsAPI from './api/ProductsAPI'

//cria um contexto
export const GlobalState = createContext()

//cria uma funcao que retorna esse contexto com um provider
export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false)

  //cria um objeto para ser passado no value do provider
  const state = {
    token: [token, setToken],

    ProductsAPI: ProductsAPI(),
  }
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>
}
