import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
  return (
    <div className="product_card">
      <>
      <Link className="btn_detail" to={`detail/${product._id}`}>
        <img src={product.images.url} alt={product.title} />
        <div className="product_box">
          <h2 title={product.title}>{product.title}</h2>
          <p>{product.description}</p>
        </div>
      </Link>
      <div className="row_btn">
          <Link className="btn_cart" to="#!">
            R${product.price}
          </Link>
        </div>
      </>
    </div>
  );
};

export default ProductItem;
