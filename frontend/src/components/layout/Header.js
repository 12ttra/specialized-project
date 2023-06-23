import React, { Fragment ,useState} from 'react'
import { Route, Link } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from '../../actions/userActions'

import Search from './Search'


import '../../Header.css'
import '../../App.css'

const Header = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const [showAdminPage, setShowAdminPage] = useState(false);
    const { user, loading } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)

    const logoutHandler = () => {
        dispatch(logout());
        alert.success('Logout Successed!')
    }
    const handleAdminPageToggle = () => {
        setShowAdminPage(!showAdminPage);
    };
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
                    <Route render={({ history }) => <Search history={history} />} />
                    </div>
                    <div id="right_nav">
                        <ul >
                            <li className="menunav item lv1">
                                <div className="cart-wrap-draw" id="cart-icon">
                                    <img
                                        id="img-buynow"
                                        className="icon bag-img"
                                        src="/images/iconheader/bag.svg"
                                        alt="Addtocart"
                                    />
                                    <Link to="/cart" style={{ textDecoration: 'none' }} ><div id="quatity-in-cart">{cartItems.length}</div></Link>
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
                               
                                <div className="btn-login text-center">
                                   
                                    {user ? <>
                                        <div className="dropdown ">
                                            <a
                                                href="#!"
                                                className="btn dropdown-toggle-1 text-white mr-4"
                                                id="dropDownMenuButton"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                                onClick={handleAdminPageToggle}
                                            >
                                                <figure className="avatar avatar-nav">
                                                    <img
                                                        src={user.avatar && user.avatar.url}
                                                        alt={user && user.name}
                                                        className="rounded-circle"
                                                    />
                                                </figure>
                                                <span className='css-username' >{user && user.name}</span>
                                            </a>

                                            {showAdminPage && (<ul className="dropdown-menu " aria-labelledby="dropDownMenuButton">
                                                {user.role == 'admin'? (
                                                 
                                                    <li>
                                                        <Link className="dropdown-item" to="/dashboard">Admin Page</Link>
                                                        <Link className="dropdown-item" to="/dashboard">Profile</Link>
                                                        <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                                                        Logout
                                                    </Link>


                                                    </li>
                                                  
                                                ):(
                                                    <li>
                                                        <Link className="dropdown-item" to="/orders/me">My Order</Link>
                                                        <Link className="dropdown-item" to="/me">My Information</Link>
                                                        <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                                                        Logout
                                                    </Link>
                                                    </li>
                                                )}

                                            </ul>)}
                                        </div>
                                        </> : (<Link to="/login" className="btn ml-4" id="login_btn">Login</Link>)}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
        </Fragment>
    );
}

export default Header
