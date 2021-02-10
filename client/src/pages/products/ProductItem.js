import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';

const ProductItem = ({ product }) => {
  console.log(product);
  return (
    <div className="product_card">
      <Link className="btn_detail" to={`detail/${product._id}`}>
        <img src={product.images.url} alt={product.title} />
        <div className="product_box">
          <h2 title={product.title}>{product.title}</h2>
          <p>{product.description}</p>
        </div>
        <div className="row_btn">
          <Link className="btn_cart" to="#!">
            R${product.price}
          </Link>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
