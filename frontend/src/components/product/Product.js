import React from 'react'
import { Link } from 'react-router-dom'

// import { useDispatch } from 'react-redux'
// import { useAlert } from 'react-alert';
import { ProductItemSlider } from './ProductItemSlider';
import './ProductItem.css';
export const Product = ({ product, col}) => {
    const images = product ? product.images : '#';
    return (
        <div className="product-wrapper-item">
        <div className="product-item-slider">
            <ProductItemSlider images={images}/>
        </div>
      <div className="product-item-descrip">
        <div className="css-product-item">
        <Link to={`/product/${product._id}`}>{product.name}</Link>
        </div>
        <div className="css-product-item-price">
          <h2 className="product-item-price new-price">{(product.price).toLocaleString()}  VND</h2>
        </div>
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
    )
}

export default Product
