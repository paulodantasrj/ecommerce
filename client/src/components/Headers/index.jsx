import React from 'react';
import { AiOutlineMenuUnfold, AiOutlineClose,AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/logo.jpg'

const index = () => {
  return (
    <header>
      <div className='menu'>
        <AiOutlineMenuUnfold size='35px' />
      </div>
      <div className='logo'>
        <Link to='/'>
          <img src={Logo} alt="Logo" />
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
            <AiOutlineClose size='35px' />
          </div>
        </li>
      </ul>
      <div className='cart-icon'>
        <span>0</span>
        <Link to='/cart'>
          <AiOutlineShoppingCart size='35px' />
        </Link>
      </div>
    </header>
  );
};

export default index;
