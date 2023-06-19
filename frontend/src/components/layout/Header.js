import React, { Fragment } from 'react'
import { Route, Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from '../../actions/userActions'

import Search from './Search'


import '../../Header.css'

const Header = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)

    const logoutHandler = () => {
        dispatch(logout());
        alert.success('Logout Successed!')
    }

    return (
        <Fragment>
            <div id="header">
                <div id="fullnav">
                    <div id="left_nav">
                        <ul className="menu">
                            <li className="item lv1"><a href="/">Home</a></li>
                            <li className="menunav item lv1">
                                <a href="/">SecondHand</a>
                                <ul className="subnav">
                                    <li><a href="/">Man</a></li>
                                    <li><a href="/">Woman</a></li>
                                    <li><a href="/">Unisex</a></li>
                                    <li><a href="/">T-Shirt</a></li>
                                    <li><a href="/">Dress</a></li>
                                    <li><a href="/">Shirts</a></li>
                                    <li><a href="/">Pants</a></li>
                                    <li><a href="/">All Clothing</a></li>
                                </ul>
                            </li>
                            <li className="menunav item lv1">
                                <a href="/">New Clothes</a>
                                <ul className="subnav">
                                    <li><a href="/">Man</a></li>
                                    <li><a href="/">Woman</a></li>
                                    <li><a href="/">Unisex</a></li>
                                    <li><a href="/">T-Shirt</a></li>
                                    <li><a href="/">Dress</a></li>
                                    <li><a href="/">Shirts</a></li>
                                    <li><a href="/">Pants</a></li>
                                    <li><a href="/">All Clothing</a></li>
                                </ul>
                            </li>
                            <li className="item lv1"><a href="/">Seller Channel</a></li>
                            <li className="menunav item lv1">
                                <a href="/">More</a>
                                <ul className="subnav">
                                    <li><a href="/">Sale</a></li>
                                    <li><a href="/">Contact</a></li>
                                    <li><a href="/">Transport</a></li>
                                    <li><a href="/">About Us</a></li>
                                    <li><a href="/">Language</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    <div id="main_logo">
                        <img src="/images/Image/mainlogo.png" alt="SPREZZA_logo"/>
                    </div>

                    <div id="search_nav">
                        <form action="" className="search" method="post">
                            <div>
                                <input type="text" placeholder="Search . . ." required />
                            </div>
                        </form>
                    </div>
                    <div id="right_nav">
                        <ul>
                            <li className="menunav item lv1">
                                <div className="cart-wrap-draw" id="cart-icon">
                                    <img
                                        id="img-buynow"
                                        className="icon bag-img"
                                        src="/images/iconheader/bag.svg"
                                        alt="Addtocart"
                                    />
                                    <div id="quatity-in-cart">21</div>

                                    <div className="cart" id="mini-cart">
                                        <h2 className="cart-tilte">Your Cart</h2>
                                        {/* Content cart */}
                                        <div className="cart-content">
                                            <div className="cart-box">
                                                <img
                                                    src="/images/image-product/product1_1.jpeg"
                                                    alt=""
                                                    className="cart-img"
                                                />
                                                <div className="detail-box">
                                                    <div className="cart-product-tilte">
                                                        SUMMERSTIME DRESS BALCLOS
                                                    </div>
                                                    <div className="cart-price">$36</div>
                                                    <input
                                                        type="number"
                                                        defaultValue="1"
                                                        className="cart-quantity"
                                                    />
                                                </div>
                                                {/* Remove cart */}
                                                <img
                                                    src="/images/iconheader/delete.svg"
                                                    alt=""
                                                    className="cart-remove icon-cart"
                                                />
                                            </div>
                                        </div>
                                        {/* Total */}
                                        <div className="total">
                                            <div className="total-tilte">Subtotal: </div>
                                            <div className="total-price">$0</div>
                                        </div>

                                        {/* Buy Button */}
                                        <button type="button" className="btn-buy">
                                            Checkout
                                        </button>
                                        <a className="view-cart" href="/cart/product-in-cart">
                                            View cart &#8594;
                                        </a>
                                        {/* Cart Close */}
                                        <img
                                            src="/images/iconheader/close.svg"
                                            alt=""
                                            className="icon-cart"
                                            id="cart-close"
                                        />
                                    </div>
                                </div>
                            </li>
                            <li className="menunav item lv1">
                                <a href="/wishlist">
                                    <img
                                        className="icon like-img"
                                        src="/images/iconheader/heart.svg"
                                        alt="Like"
                                    />
                                </a>
                            </li>
                            <li className="menunav item lv1">
                                <a href="">
                                    <img
                                        className="icon bell-img"
                                        src="/images/iconheader/bell.svg"
                                        alt="Notice"
                                    />
                                </a>
                            </li>
                            <li className="menunav item lv1">
                                <a href="/account/login">
                                    <img
                                        className="icon account-img"
                                        src="/images/iconheader/profile.svg"
                                        alt="Login"
                                    />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
        </Fragment>
    );
}

export default Header
