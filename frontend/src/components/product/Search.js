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
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";




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
                        
                                    <Fragment>

                                        <div className="brand-product">
                                            <div className="brand-product-wrapper">
                                                {products.map(product => (
                                                    <Product key={product._id} product={product} col={4} />
                                                ))}
                                            </div>
                                        </div>
                                    </Fragment>
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
