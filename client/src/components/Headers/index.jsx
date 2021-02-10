import React from 'react'
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Logo from '../../assets/img/logo.png'

const index = () => {
  return (
    <header>
      <div>
        <Link to='/'>
          <img className='logo' src={Logo} alt='Logo' />
        </Link>
      </div>
      <div className='user'>
        <div className='user_box'>
          <AiOutlineUser />
          <span>
            Faça seu
            <Link to='/login'>login</Link>
            ou
            <Link to='/register'>cadastre-se</Link>
          </span>
        </div>
        <div className='cart-icon'>
          <span>0</span>
          <Link to='/cart'>
            <AiOutlineShoppingCart />
          </Link>
        </div>
      </div>

      {/*<div className='user'>
        <AiOutlineUser size='50px' />
        <span>
          Faça seu
          <Link to='/login'>login</Link>
          ou
          <Link to='/register'>cadastre-se</Link>
        </span>
      </div>
      <div className='cart-icon'>
        <span>0</span>
        <Link to='/cart'>
          <AiOutlineShoppingCart />
        </Link>
      </div>*/}
    </header>
  )
}

export default index
