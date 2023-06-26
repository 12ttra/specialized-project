import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { useAlert } from 'react-alert';
import { ProductItemSlider } from './ProductItemSlider';
import { addItemToCart } from '../../actions/cartActions'
import './ProductItem.css';
import { addItemToWishlist } from '../../actions/wishlistAction';
export const Product = ({ product, col}) => {
    const images = product ? product.images : '#';
    const dispatch = useDispatch();
    const alert = useAlert();
    const [quantity, setQuantity] = useState(1)
    const addToCart = (id) => {
      dispatch(addItemToCart(id, quantity));
      alert.success('Added to cart!')
    }
    const addToWishlist = (id) => {
      dispatch(addItemToWishlist(id, quantity));
      alert.success('Added to wishlist!')
    }
    let priceDistCount = product.price - parseFloat(product.price)*(parseFloat(product.dist_count)/100);

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
          <h2 className="product-item-price old-price">{product.price}đ</h2>
          <h2 className="product-item-price new-price">{priceDistCount}đ</h2>
        </div>
        <div className="icon-product">
          <div className="coupon">
            <a className="img-icon voucher" href="#">Sale {product.dist_count}%</a>
          </div>
          <div className="wishlish">
            <button disabled={product.stock === 0} onClick={() =>addToWishlist(product._id)} style={{cursor: 'pointer'}}>
              <img className="img-icon wishlist" src="/images/iconheader/heart.svg" alt="wishlist" />
            </button>
          </div>
          <div className="add">
            <button disabled={product.stock === 0} onClick={() =>addToCart(product._id)} style={{cursor: 'pointer'}}>
              <img className="img-icon img-buynow" src="/images/iconheader/white-shopping-bag.svg" alt="btn buy now" />
            </button>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Product
