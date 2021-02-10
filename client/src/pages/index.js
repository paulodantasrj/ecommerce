import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Products from './products';
import Login from './auth/login';
import Register from './auth/register';
import Cart from './cart';
import NotFound from '../components/NotFound';

const index = () => {
  return (
    //recebe vários componentes Route e dado o caminho que for passado na URL um deles é renderizado.
    <Switch>
      {/*uma rota do nosso sistema*/}
      <Route path="/" exact component={Products} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/cart" exact component={Cart} />

      <Route path="*" exact component={NotFound} />
    </Switch>
  );
};

export default index;
