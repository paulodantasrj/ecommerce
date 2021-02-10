import React from 'react';
import { AiOutlineMenuUnfold, AiOutlineClose,AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/logo.png'

const index = () => {
  return (
    <header>
      <div className='menu'>
        <AiOutlineMenuUnfold  />
      </div>
      <div className='logo'>
        <Link to='/'>
          <img src={Logo} alt="Logo"  />
        </Link>
      </div>

      <ul>
        <li>
          <Link to='/'>Produtos</Link>
        </li>
        <li>
          <Link to='/login'>Login / Cadastro</Link>
        </li>
        <li>
          <div className='menu' >
            <AiOutlineClose  />
          </div>
        </li>
      </ul>
      <div className='cart-icon'>
        <span>0</span>
        <Link to='/cart'>
          <AiOutlineShoppingCart  />
        </Link>
      </div>
    </header>
  );
};

export default index;
