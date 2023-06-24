import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'

import MetaData from '../layout/MetaData'
import Product from '../product/Product'
import Loader from '../layout/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { getProducts } from '../../actions/productActions';
import '../../../src/components/layout/Category.css';




const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)

const Search = ({ match }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 1000000])
    const [rating, setRating] = useState(0)



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
                    <h1 id="products-heading" className="product_title"> Search result "{keyword}"</h1>
                    <section id="products" className="">
                        {
                            <div className="brand-product">
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
                                                        visible: false
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

export default Search
