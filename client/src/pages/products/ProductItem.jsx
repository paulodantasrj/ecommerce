import React from 'react';
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
  return (
     <Link to={`detail/${product._id}`}>
        <div className="product_card"> 
          <div className="product_img">    
            <img src={product.images.url} alt={product.title} />
          </div>
          <div className="product_box">
            <h2 title={product.title}>{product.title}</h2>
            <p>{product.description}</p>
          </div>
          <div className="product_star">
            <ReactStars
              count={5}
              size={24}
              isHalf={true}
              activeColor="#ffd700"
            />
          </div>
          <div className='product_price'>
            <span>R${product.price}</span> à vista
            <p>ou em até 6x de <strong>R$ 64,83</strong>  no cartão</p>
          </div>
        </div>
     </Link>
  );
};

export default ProductItem;
