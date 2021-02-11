import React from 'react';
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/logo.png';

const index = () => {
  return (
    <header>
      <div>
        <Link to="/">
          <img className="logo" src={Logo} alt="Logo" />
        </Link>
      </div>
      <div className="box">
        <div className="user">
          <AiOutlineUser />
          <span>
            ola, que bom que voce apareceu!
            <p>
              <Link to="/login">login</Link>ou
              <Link to="/register">cadastre-se</Link>
            </p>
          </span>
          <p></p>
        </div>
        <div className="cart-icon">
          <span>0</span>
          <Link to="/cart">
            <AiOutlineShoppingCart />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default index;
