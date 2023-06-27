import React, { Fragment, useState, useEffect } from 'react'
import ProductItemSmall from './ProductItem-Small.js'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import ListReviews from '../review/ListReviews'
import '../../App.css'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, newReview, clearErrors, getSaleProducts } from '../../actions/productActions'
import { addItemToCart } from '../../actions/cartActions'
import { NEW_REVIEW_RESET } from '../../constants/productConstants'
import Product from "./Product";

const ProductDetails = ({ match }) => {

    const [quantity, setQuantity] = useState(1)
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');

    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, product } = useSelector(state => state.productDetails);
    let firstImage = product.images ? product.images[0].url : "#";
    const { user } = useSelector(state => state.auth)
    const { error: reviewError, success } = useSelector(state => state.newReview);
    const { loading: saleLoading, error: saleError, saleProducts} = useSelector(state => {
        return state.saleProducts;
    })
    const colors = [
        'Black',
        'White',
        'Pastel',
        'Yellow',
        'Pink',
        'Orange',
        'Blue',
        'Pastel',
        'Purples',
        'Reds',
        'Burnt oranges',
        'Browns',
        'Darker greens',
        'Royal blue',
        'Emerald green',
        'Hot pink',
        'Sea blue'
    ]
    const sizes = [
        'S',
        'M',
        'L',
        'XL',
        'XXL'
    ]
    useEffect(() => {
        dispatch(getProductDetails(match.params.id))
        dispatch(getSaleProducts())

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors())
        }

        if (success) {
            alert.success('Rate Successfully!')
            dispatch({ type: NEW_REVIEW_RESET })
        }

    }, [dispatch, alert, error, reviewError, match.params.id, success])

    const addToCart = () => {
        dispatch(addItemToCart(match.params.id, quantity));
        alert.success('Added to cart!')
    }

    const increaseQty = () => {
        const count = document.querySelector('.count')

        if (count.valueAsNumber >= product.stock) return;

        const qty = count.valueAsNumber + 1;
        setQuantity(qty)
    }

    const decreaseQty = () => {

        const count = document.querySelector('.count')

        if (count.valueAsNumber <= 1) return;

        const qty = count.valueAsNumber - 1;
        setQuantity(qty)

    }

    function setUserRatings() {
        const stars = document.querySelectorAll('.star');

        stars.forEach((star, index) => {
            star.starValue = index + 1;

            ['click', 'mouseover', 'mouseout'].forEach(function (e) {
                star.addEventListener(e, showRatings);
            })
        })

        function showRatings(e) {
            stars.forEach((star, index) => {
                if (e.type === 'click') {
                    if (index < this.starValue) {
                        star.classList.add('orange');

                        setRating(this.starValue)
                    } else {
                        star.classList.remove('orange')
                    }
                }

                if (e.type === 'mouseover') {
                    if (index < this.starValue) {
                        star.classList.add('yellow');
                    } else {
                        star.classList.remove('yellow')
                    }
                }

                if (e.type === 'mouseout') {
                    star.classList.remove('yellow')
                }
            })
        }
    }

    const reviewHandler = () => {
        const formData = new FormData();

        formData.set('rating', rating);
        formData.set('comment', comment);
        formData.set('productId', match.params.id);

        dispatch(newReview(formData));
    }
    let finalPrice = product.price - parseFloat(product.price)*(parseFloat(product.dist_count)/100);
    const getFirstImage = ()=>{
        console.log(product.images,"aaaa");
        if(product.images.length){
            return product.images[0].url;
        }
        return "#";
    }
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={product.name} />
                    <div className="product">
                        <div className="product-top row-cart text-align-left color">
                            <p className="text">Home</p> <span>&#10230; </span>
                            <p className="text">Woman</p> <span>&#10230; </span>
                            <p className="text">New Clothing</p> <span>&#10230; </span>
                            <p className="text">Black dress highend</p>
                        </div>

                        <div className="container-product">
                            <div className="product-content row-cart">
                                {/* Product Content Left */}
                                <div className="product-content-left row-cart">
                                    <div className="product-content-left-big-img">
                                        <img src={firstImage} id="main-image-pdp" alt="Image Product of Cart" />
                                    </div>
                                    <div className="product-content-left-small-img">
                                        {product.images && product.images.map(image => (
                                            <img className="d-block w-100 img-thumbnail" src={image.url} alt={product.title} />
                                        ))}
                                    </div>
                                </div>
                                {/* End Product Content Left */}
                                {/* Product Content Right */}
                                <div className="product-content-right">
                                    <div className="product-content-right-product-name mg-bot">
                                        <h1>{product.name}</h1>
                                    </div>

                                    <div className="flex flex-column +o886E mg-bot">
                                        <div className="flex items-center">
                                            <div className="flex items-center nmrSND">
                                                <div className="flex items-center css-product-item-price-small">
                                                    <div className="final-price pqTWkA ">{finalPrice}đ</div>
                                                    {product.dist_count > 0 && <span className="product-item-price old-price-small">{product.price}đ</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product-content-right-product-color-img row-cart mg-bot">
                                        <label htmlFor="color_field" style={{ marginRight: '10px' }}>Color</label>
                                        <select className="form-control" id="color_field" value={color} onChange={(e) => setColor(e.target.value)} style={{ width: '30%' }}>
                                            {colors.map(color => (
                                                <option key={color} value={color} >{color}</option>
                                            ))}

                                        </select>
                                    </div>

                                    <div className="product-content-right-product-size-img row-cart mg-bot">
                                        <label htmlFor="size_field" style={{ marginRight: '10px' }}>Size</label>
                                        <select className="form-control" id="size_field" value={size} onChange={(e) => setSize(e.target.value)} style={{ width: '30%' }}>
                                            {sizes.map(size => (
                                                <option key={size} value={size} >{size}</option>
                                            ))}

                                        </select>
                                    </div>
                                    <div className="stockCounter d-inline">
                                        <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                                        <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                                        <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                                    </div>
                                    <p>Product Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'} >{product.stock > 0 ? 'STOCK' : 'SOLD OUT'}</span></p>
                                    {/* <p className="alert-size" style={{ color: 'rgb(229, 62, 62)' }}>Size can't be blank, please!</p> */}
                                    <div className="product-btn-buy-wrapper">
                                        <div className="product-btn-buy mg-bot">
                                            <button disabled={product.stock === 0} onClick={addToCart}>
                                                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                                <a href="javascript:void(0)">ADD TO CART</a>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="flash-sale-wrapper">
                        <div className="flash-sale m-p-css">
                            <div className="img-fs-wrapper">
                                <div className="img-fs">
                                    <img src="/images/iconheader/flash-sale.jpeg" alt="" className="img-title" />
                                </div>
                                <div className="FsAt __FsAtT _0voski-1">Buy 2 sale 3%</div>
                                <div className="FsAt __FsAtT _0voski-1">Buy 3 sale 7%</div>
                                <a className="k-uwoE UR+0VK" href="#">
                                    View All<i className="fa fa-arrow-right" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                        {saleProducts.length ? (
                            <div className="sz-header-iems-content">
                                {saleProducts.map(product => (
                                    <ProductItemSmall key={product._id} product={product} />
                                ))}
                            </div>)
                            : (
                                <div className="sz-header-iems-content">
                                </div>
                            )
                        }
                    </section>
                    <section className="infor-wrapper">
                        <div className="store-wrapper">
                            <div className="rowNL page-product__shop">
                                <div className="shop-intro">
                                    <a href="#" className="link-store">
                                        <div className="sz-avatar szNL">
                                            <div className="sz-avatar_placeholder">
                                                <img src="/images/avatar/avatar.jpeg" alt="" />
                                            </div>
                                        </div>
                                    </a>
                                    <div className="sz-shopPI">
                                        <div className="sz-shop__name">EL.REVER WM</div>
                                        <div className="active-inactive__status">
                                            <div className="status">Offline 3 hours ago</div>
                                        </div>
                                        <div className="contact-shop">
                                            <button type="button" className="btn btn-chat set-w-h">
                                                <i className="fa fa-comments-o" aria-hidden="true" /> Chat Now
                                            </button>
                                            <div className="see-shop set-w-h">
                                                <a href="#" className="css-text">
                                                    <i className="fa fa-shopping-basket" aria-hidden="true" /> Visit
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="shop-rate">
                                    <div className="SZW123">
                                        <p className="szlb1">Rating</p>
                                        <span className="Xkm22X">436,1k</span>
                                    </div>
                                    <div className="SZW123">
                                        <p className="szlb1">Response Rate</p>
                                        <span className="Xkm22X">90%</span>
                                    </div>
                                    <div className="SZW123">
                                        <p className="szlb1">Participated</p>
                                        <span className="Xkm22X">2 months ago</span>
                                    </div>
                                    <a className="SZW123 p48aHT" href="#">
                                        <p className="szlb1">Product</p>
                                        <span className="Xkm22X">30</span>
                                    </a>
                                    <div className="SZW123">
                                        <p className="szlb1">Time Response</p>
                                        <span className="Xkm22X">1 hour</span>
                                    </div>
                                    <div className="SZW123">
                                        <p className="szlb1">Follower</p>
                                        <span className="Xkm22X">300k</span>
                                    </div>
                                </div>
                            </div>

                            <div className="page-product-detail__contain">
                                <div className="page-product-detail__contain-left">
                                    <div className="product-detail page-product__detail">
                                        {/* <div className="szPD123">
                                            <div className="szNPD123">PRODUCT DETAIL</div>
                                            <div className="PDO123">
                                                <div className="PDO888">
                                                    <p className="PDO999">Category</p>
                                                    <div className="SZPD-X flex items-center">
                                                        <a href="#">
                                                            <div className="flex color-1 size-text">
                                                                <p className="text-1">Home</p> <span>⟶ </span>
                                                                <p className="text-1">Woman</p> <span>⟶ </span>
                                                                <p className="text-1">New Clothing</p> <span>⟶ </span>
                                                                <p className="text-1">Black dress highend</p>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="PDO888">
                                                    <p className="PDO999">Brand</p>
                                                    <a className="color-1" href="#">RE.eLVER</a>
                                                </div>
                                                <div className="PDO888">
                                                    <p className="PDO999">Storage</p>
                                                    <div>30</div>
                                                </div>
                                                <div className="PDO888">
                                                    <p className="PDO999">Type</p>
                                                    <div>New Clothes</div>
                                                </div>
                                                <div className="PDO888">
                                                    <p className="PDO999">Send from</p>
                                                    <div>Ho Chi Minh City</div>
                                                </div>
                                            </div>
                                        </div> */}
                                        <div className="szPD123">
                                            <div className="szNPD123">PRODUCT DESCRIPTION</div>
                                            <div className="PDO123">
                                                <div className="SZPDD-1">
                                                    <p className="DcssP">{product.description}</p>
                                                    <p id="product_seller mb-3">Xuất xứ: <strong>{product.seller}</strong></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Fragment>
            )}
        </Fragment>
    )
}

export default ProductDetails
