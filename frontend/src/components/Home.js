import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'

import '../App.css'
import MetaData from './layout/MetaData'
import Product from './product/Product'
import Loader from './layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import {getBestSellerProducts, getProducts} from '../actions/productActions';

import Sliderr from '../components/layout/Slider'
import '../../src/components/layout/Category.css';


const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)

const Home = ({ match }) => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, bestProducts} = useSelector(state => {
        console.log(state.bestSellerProducts);
        return state.bestSellerProducts;
    })

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }

        dispatch(getBestSellerProducts());


    }, [dispatch, alert,error])

    return (
        <Fragment>
            <Sliderr />
            <br />
            <div id="section-below-header">
                <div className="home-category-list">
                    <div className="category-name">
                        <a href="#"><b>CATEGORY</b></a>
                    </div>
                    <div className="category-wrapper">
                        <div className="category-item">
                            <div className="item-img">
                                <img src="/images/image-category/second-hand.png" alt="schand" className="item-img" />
                            </div>
                            <div className="item-descrip">
                                <a href="#">Secondhand</a>
                            </div>
                        </div>
                        <div className="category-item">
                            <div className="item-img">
                                <img src="/images/image-category/man.png" alt="man-clothing" className="item-img" />
                            </div>
                            <div className="item-descrip">
                                <a href="#">Man</a>
                            </div>
                        </div>
                        <div className="category-item">
                            <div className="item-img">
                                <img src="/images/image-category/homosexual.png" alt="gender" className="item-img" />
                            </div>
                            <div className="item-descrip">
                                <a href="#">Unisex</a>
                            </div>
                        </div>
                        <div className="category-item">
                            <div className="item-img">
                                <img src="/images/image-category/tshirt.png" alt="t-shirt" className="item-img" />
                            </div>
                            <div className="item-descrip">
                                <a href="#">T-Shirt</a>
                            </div>
                        </div>
                        <div className="category-item">
                            <div className="item-img">
                                <img src="/images/image-category/trousers.png" alt="trousers" className="item-img" />
                            </div>
                            <div className="item-descrip">
                                <a href="#">Pant</a>
                            </div>
                        </div>
                        <div className="category-item">
                            <div className="item-img">
                                <img src="/images/image-category/voucher.png" alt="coupon" className="item-img" />
                            </div>
                            <div className="item-descrip">
                                <a href="#">Voucher</a>
                            </div>
                        </div>
                        <div className="category-item">
                            <div className="item-img">
                                <img src="/images/image-category/new.png" alt="new-clothing" className="item-img" />
                            </div>
                            <div className="item-descrip">
                                <a href="#">New Clothing</a>
                            </div>
                        </div>
                        <div className="category-item">
                            <div className="item-img">
                                <img src="/images/image-category/woman.png" alt="women-clothing" className="item-img" />
                            </div>
                            <div className="item-descrip">
                                <a href="#">Woman</a>
                            </div>
                        </div>
                        <div className="category-item">
                            <div className="item-img">
                                <img src="/images/image-category/dress.png" alt="dress" className="item-img" />
                            </div>
                            <div className="item-descrip">
                                <a href="#">Dress</a>
                            </div>
                        </div>
                        <div className="category-item">
                            <div className="item-img">
                                <img src="/images/image-category/cloth.png" alt="somi" className="item-img" />
                            </div>
                            <div className="item-descrip">
                                <a href="#">Somi</a>
                            </div>
                        </div>
                        <div className="category-item">
                            <div className="item-img">
                                <img src="/images/image-category/gift-box.png" alt="gift" className="item-img" />
                            </div>
                            <div className="item-descrip">
                                <a href="#">Gifts</a>
                            </div>
                        </div>
                        <div className="category-item">
                            <div className="item-img">
                                <img src="/images/image-category/delivery-truck.png" alt="truck" className="item-img" />
                            </div>
                            <div className="item-descrip">
                                <a href="#">Delivery</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <br />
            {/* <br />
            <div className="button">
                <p className="btnText">{category}</p>
                <div className="btnTwo">
                    <p className="btnText2">GO!</p>
                </div>
            </div> */}
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'SPREZZA-Ecommerce'} />
                    <section id="products" className="">
                        {
                            <div className="brand-product">
                                {bestProducts.map(product => (
                                    <Product key={product._id} product={product} col={4} />
                                ))}
                            </div>
                        }
                    </section>
                </Fragment>

            )}
            <Fragment>
                <div className="contact-send-email">
                    <div className="contact section-name">
                        <h2 className="contact-heading">#sprezza.e-commerce</h2>
                        <p className="sub-contact-heading"><i>Fashion is what you adopt when you don't know who you are.</i></p>
                        <div className="form-email-btn">
                            <form>
                                <input type="email" name="Email" placeholder="Enter your email!" required />
                                <button type="submit"><img src="/images/iconheader/send.svg" width="30px" alt="Send-email" /></button>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>

        </Fragment>

    )
}

export default Home
