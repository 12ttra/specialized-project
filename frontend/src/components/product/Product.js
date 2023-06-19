import React from 'react'
import { Link } from 'react-router-dom'

// import { useDispatch } from 'react-redux'
// import { useAlert } from 'react-alert';

import ProductItem from './ProductItem.js'
import './ProductItem.css';
const Product = ({ product}) => {

    return (
        <div class="brand-product">
            <div class="brand-product-wrapper">
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
           
            </div>
        </div>
        
        
    )
}

export default Product
