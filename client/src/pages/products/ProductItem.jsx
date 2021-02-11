import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { Link } from 'react-router-dom'

//recebe produtos como parametro
const ProductItem = ({ product }) => {
  return (
    <Link to={`/detail/${product._id}`}>
      <div className='product_card'>
        <div className='product_img'>
          <img src={product.images.url} alt={product.title} />
        </div>
        <div className='product_box'>
          <h2 title={product.title}>{product.title}</h2>
          <p>{product.description}</p>
        </div>
        <div className='product_star'>
          <ReactStars
            count={5}
            size={24}
            edit={false}
            value={product.rate}
            isHalf={true}
            activeColor='#ffd700'
          />
        </div>
        <div className='product_price'>
          <span>R${product.price}</span> à vista.
          <p>
            ou em até 6x de <strong>R${(product.price / 6).toFixed(2)}</strong>{' '}
            no cartão.
          </p>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem
