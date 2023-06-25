import React, { Fragment ,useState} from 'react'
import { Route, Link } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from '../../actions/userActions'

import Search from './Search'


import '../../Header.css'
import '../../App.css'
import '../../responsive.css'


const Header = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const [showAdminPage, setShowAdminPage] = useState(false);
    const { user, loading } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)
    const { wishlistItems } = useSelector(state => state.wishlist)
    const logoutHandler = () => {
        dispatch(logout());
        alert.success('Logout Successed!')
    }
    const handleAdminPageToggle = () => {
        setShowAdminPage(!showAdminPage);
    };
    return (
        <Fragment>
            <div id="header " >
                  {/*mobile
                  <div className="menu-mb">
                        <div className='icon-wrapper'>
                            <i class="fa fa-bars icon-mb css-mgl" aria-hidden="true"></i>
                        </div>
                        <div className='img-wrapper-mb'>
                             <img src="/images/Image/mainlogo.png" alt="SPREZZA_logo"/>  
                        </div>
                        <div className='icon-login-mb'>
                        <a href="/login">
                                    <img
                                        className="icon-mb "
                                        src="/images/iconheader/profile.svg"
                                        alt="Login"
                                    />
                                </a>
                        </div>

                    </div>*/}
                        {/*Desktop*/}
                <div id="fullnav" >
                    <div id="left_nav" >
                      
                         
                        <ul className="menu">
                            <li className="item lv1"><a href="/">Home</a></li>
                            <li className="menunav item lv1">
                                <a href="/category/secondHand">SecondHand</a>
                                <ul className="subnav">
                                    <li><a href="/category/man">Man</a></li>
                                    <li><a href="/category/woman">Woman</a></li>
                                    <li><a href="/category/unisex">Unisex</a></li>
                                    <li><a href="/category/t-shirt">T-Shirt</a></li>
                                    <li><a href="/category/dress">Dress</a></li>
                                    <li><a href="/category/shirts">Shirts</a></li>
                                    <li><a href="/category/pants">Pants</a></li>
                                    <li><a href="/">All Clothing</a></li>
                                </ul>
                            </li>
                            <li className="menunav item lv1">
                                <a href="/">New Clothes</a>
                                <ul className="subnav">
                                    <li><a href="/category/man">Man</a></li>
                                    <li><a href="/category/woman">Woman</a></li>
                                    <li><a href="/category/unisex">Unisex</a></li>
                                    <li><a href="/category/t-shirt">T-Shirt</a></li>
                                    <li><a href="/category/dress">Dress</a></li>
                                    <li><a href="/category/shirts">Shirts</a></li>
                                    <li><a href="/category/pants">Pants</a></li>
                                    <li><a href="/">All Clothing</a></li>
                                </ul>
                            </li>
                            <li className="item lv1"><a href="/category/Seller Channel">Seller Channel</a></li>
                            <li className="menunav item lv1">
                                <a href="/">More</a>
                                <ul className="subnav">
                                    <li><a href="/category/sale">Sale</a></li>
                                    <li><a href="/contact">Contact</a></li>
                                    <li><a href="/transport">Transport</a></li>
                                    <li><a href="/about-us">About Us</a></li>
                                    <li><a href="/">Language</a></li>
                                </ul>
                            </li>
                        </ul>
                         {/*end Desktop*/}
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
                                    <Link to="/cart" style={{ textDecoration: 'none' }} > <img
                                        id="img-buynow"
                                        className="icon bag-img"
                                        src="/images/iconheader/bag.svg"
                                        alt="Addtocart"
                                    /><div id="quatity-in-cart">{cartItems.length}</div></Link>
                                </div>
                            </li> 
                       
                            <li className="menunav item lv1">
                                <div className="wishlist-wrap-draw" id="wishlist-icon">
                                    <Link to="/wishlist" style={{ textDecoration: 'none' }} >
                                        <img
                                            id="wishlist"
                                            className="icon like-img"
                                            src="/images/iconheader/heart.svg"
                                            alt="wishlist"
                                        />
                                    </Link>
                                </div>
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
                                                        <Link className="dropdown-item" to="/me">Profile</Link>
                                                        <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                                                        Logout
                                                    </Link>
                                                    </li>
                                                )}

                                            </ul>)}
                                        </div>
                                        </> : (<Link to="/login" className="btn ml-4"><img
                                        className="icon account-img"
                                        src="/images/iconheader/profile.svg"
                                        alt="Login"
                                    /></Link>)}
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
