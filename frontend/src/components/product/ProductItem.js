import React from 'react';
import { ProductItemSlider } from './ProductItemSlider';

const ProductItem = () => {
  return (
    <div className="product-wrapper-item">
        <div className="product-item-slider">
      <ProductItemSlider />
      </div>
      <div className="product-item-descrip">
        <div className="css-product-item">
          <a href="/product/view/:id">Dress| Champage so sexy by HN</a>
        </div>
        <div className="css-product-item-price">
          <p className="product-item-price old-price">$20</p>
          <p className="product-item-price new-price">$18</p>
        </div>
        <span className="sold">BOUGHT : 10</span>
        <div className="icon-product">
          <div className="coupon">
            <a className="img-icon voucher" href="#">Sale 20%</a>
          </div>
          <div className="wishlish">
            <img className="img-icon wishlist" src="/images/iconheader/heart.svg" alt="wishlist" />
          </div>
          <div className="add">
            <img className="img-icon img-buynow" src="/images/iconheader/white-shopping-bag.svg" alt="btn buy now" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductItem;
