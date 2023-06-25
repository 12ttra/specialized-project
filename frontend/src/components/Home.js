import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'

import '../App.css'
import MetaData from './layout/MetaData'
import Product from './product/Product'
import Loader from './layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { getProducts } from '../actions/productActions';

import Sliderr from '../components/layout/Slider'

import '../../src/components/layout/Category.css';




const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)

const Home = ({ match }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 1000000])
    const [rating, setRating] = useState(0)
    const [category, setCategory] = useState('')


    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products)

    const keyword = match.params.keyword

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }

        dispatch(getProducts(keyword, currentPage, price, rating));


    }, [dispatch, alert, error, keyword, currentPage, price, rating])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = productsCount;
    if (keyword) {
        count = filteredProductsCount
    }


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

                    <h1 id="products-heading" className="product_title">&emsp;&emsp;&emsp;</h1>
                    <h3 className='text-center'>Products</h3>

                    <section id="products" className="">
                        {
                            <div className="brand-product">

                                {keyword ? (
                                    <Fragment>
                                        <div className="col-6 col-md-3">

                                            <div className="px-5">
                                                <h4 className="mb-5">
                                                    Khoảng giá
                                                </h4>
                                                <Range
                                                    marks={{
                                                        10000: `10.000`,
                                                        1000000: `1.000.000`
                                                    }}
                                                    min={10}
                                                    max={1000000}
                                                    defaultValue={[1, 1000000]}
                                                    tipFormatter={value => `${value}`}
                                                    tipProps={{
                                                        placement: "top",
                                                        visible: true
                                                    }}
                                                    value={price}
                                                    onChange={price => setPrice(price)}
                                                />
                                                <br />
                                                <hr className="my-3" />

                                                <div className="mt-5">
                                                    <h4 className="mb-3">
                                                        Đánh giá
                                                    </h4>

                                                    <ul className="pl-0">
                                                        {[5, 4, 3, 2, 1].map(star => (
                                                            <li
                                                                style={{
                                                                    cursor: 'pointer',
                                                                    listStyleType: 'none'
                                                                }}
                                                                key={star}
                                                                onClick={() => setRating(star)}
                                                            >
                                                                <div className="rating-outer">
                                                                    <div className="rating-inner"
                                                                        style={{
                                                                            width: `${star * 20}%`
                                                                        }}
                                                                    >
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                            </div>
                                        </div>'


                                        <div className="brand-product col-6 col-md-3">
                                            <div className="brand-product-wrapper">
                                                {products.map(product => (
                                                    <Product key={product._id} product={product} col={4} />
                                                ))}
                                            </div>
                                        </div>
                                    </Fragment>
                                ) : (
                                    products.map(product => (
                                        <Product key={product._id} product={product} col={2} />
                                    ))
                                )}

                            </div>
                        }
                    </section>

                    {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Back'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )}

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
