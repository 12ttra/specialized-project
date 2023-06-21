import React from 'react';
import { ProductItemSliderSmall } from './ProductItemSlider-Small';

const ProductItemSmall = () => {
  return (
    <div className="product-wrapper-item-small">
    <div className="product-item-slider-small">
      <ProductItemSliderSmall />
    </div>
    <div className="product-item-descrip-small">
      <div className="css-product-item-small">
        <a href="/product/view/:id">Dress| Champage so sexy by HN</a>
      </div>
      <div className="css-product-item-price-small">
        <span className="product-item-price-small old-price-small">$20</span>
        <span className="product-item-price-small new-price-small ">$18</span>
      </div>
      <div className="icon-product-small">
        <div className="coupon-small">
          <a className="img-icon-small voucher-small" href="#">Sale 20%</a>
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
