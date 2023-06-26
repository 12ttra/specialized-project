import React from 'react';
import { ProductItemSliderSmall } from './ProductItemSlider-Small';
import {Link} from "react-router-dom";

const ProductItemSmall = ({product}) => {
  let priceDistCount = product.price - parseFloat(product.price)*(parseFloat(product.dist_count)/100);
  return (
    <div className="product-wrapper-item-small">
      <ProductItemSliderSmall images={product.images}/>
      <div className="product-item-descrip-small">
        <div className="css-product-item-small">
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </div>
        <div className="css-product-item-price-small">
          <span className="product-item-price-small old-price-small">{product.price}đ</span>
          <span className="product-item-price-small new-price-small ">{priceDistCount}đ</span>
        </div>
        <div className="icon-product-small">
          <div className="coupon-small">
            <a className="img-icon-small voucher-small" href="#">Sale {product.dist_count}%</a>
          </div>
          <div className="wishlish-small">
            <img className="img-icon-small wishlist-small" src="/images/iconheader/heart.svg" alt="wishlist" />
          </div>
          <div className="add-small">
            <img className="img-icon-small img-buynow-small" src="/images/iconheader/white-shopping-bag.svg" alt="btn buy now" />
          </div>
        </div>
    </div>
  </div>
  
  );
}
export default ProductItemSmall;
