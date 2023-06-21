import React, { Fragment, useState, useEffect } from 'react'
import ProductItemSmall from './ProductItem-Small.js'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import ListReviews from '../review/ListReviews'
import '../../App.css'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, newReview, clearErrors } from '../../actions/productActions'
import { addItemToCart } from '../../actions/cartActions'
import { NEW_REVIEW_RESET } from '../../constants/productConstants'

const ProductDetails = ({ match }) => {

    const [quantity, setQuantity] = useState(1)
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, product } = useSelector(state => state.productDetails)
    const { user } = useSelector(state => state.auth)
    const { error: reviewError, success } = useSelector(state => state.newReview)

    useEffect(() => {
        dispatch(getProductDetails(match.params.id))

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors())
        }

        if (success) {
            alert.success('Đánh giá thành công')
            dispatch({ type: NEW_REVIEW_RESET })
        }

    }, [dispatch, alert, error, reviewError, match.params.id, success])

    const addToCart = () => {
        dispatch(addItemToCart(match.params.id, quantity));
        alert.success('Đã thêm vào giỏ hàng')
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
                                        <img src="/images/image-product/product5_2.jpeg" alt="Image Product of Cart" />
                                    </div>
                                    <div className="product-content-left-small-img">
                                        <img className="img-small" src="/images/image-product/product5_1.jpeg" alt="Image Product of Cart" />
                                        <img className="img-small" src="/images/image-product/product5_2.jpeg" alt="Image Product of Cart" />
                                        <img className="img-small" src="/images/image-product/product5_2.jpeg" alt="Image Product of Cart" />
                                        <img className="img-small" src="/images/image-product/product5_1.jpeg" alt="Image Product of Cart" />
                                    </div>
                                </div>
                                {/* End Product Content Left */}
                                {/* Product Content Right */}
                                <div className="product-content-right">
                                    <div className="product-content-right-product-name mg-bot">
                                        <h1>MY CHAMPAGE | DRESS IN SUMMER BY SBHN</h1>
                                        <p>ID : 0001DR</p>
                                    </div>

                                    <div className="flex flex-column +o886E mg-bot">
                                        <div className="flex items-center">
                                            <div className="flex items-center nmrSND">
                                                <div className="Y3DvsN">₫499.000</div>
                                                <div className="flex items-center">
                                                    <div className="pqTWkA">₫369.000</div>
                                                    <div className="_0voski">26% giảm</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product-content-right-product-color-img row-cart mg-bot">
                                        <img src="/images/image-color/spcolor1.jpeg" alt="pinkcolor" />
                                        <img src="/images/image-color/spcolor3.jpeg" alt="blackcolor" />
                                    </div>

                                    <div className="product-content-right-product-size mg-bot">
                                        <p>SIZE GUIDE</p>
                                        <div className="size">
                                            <span className="size-hover">S</span>
                                            <span className="size-hover"> M</span>
                                            <span className="size-hover">L</span>
                                            <span className="size-hover">XL</span>
                                            <span className="size-hover">...</span>
                                        </div>
                                    </div>
                                    <div className="quantity mg-bot">
                                        <p className="gap" style={{ fontWeight: 'bold' }}>Quantity: </p>
                                        <input type="number" min="0" defaultValue="1" />
                                    </div>
                                    <p className="alert-size" style={{ color: 'rgb(229, 62, 62)' }}>Size can't be blank, please!</p>
                                    <div className="product-btn-buy-wrapper">
                                        <div className="product-btn-buy mg-bot">
                                            <a href="#">
                                                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                                <p>ADD TO CART</p>
                                            </a>
                                        </div>
                                        <div className="product-btn-buy mg-bot">
                                            <a href="#">
                                                <p>BUY NOW</p>
                                            </a>
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
                        <div className="sz-header-iems-content">
                            <ProductItemSmall />
                            <ProductItemSmall />
                            <ProductItemSmall />
                            <ProductItemSmall />
                            <ProductItemSmall />
                            <ProductItemSmall />


                        </div>
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
                                        <div className="szPD123">
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
                                        </div>
                                        <div className="szPD123">
                                            <div className="szNPD123">PRODUCT DESCRIPTION</div>
                                            <div className="PDO123">
                                                <div className="SZPDD-1">
                                                    <p className="DcssP">
                                                        Size:
                                                        S ngực &lt;86, eo &lt;65, mông &lt;88 M ngực &lt;92, eo &lt;72, mông &lt;93 Đầm tà xéo, một bên
                                                        dài ~95cm, bên còn lại dài ~145cm (tính từ vai). Lin có hỗ trợ sửa theo số
                                                        đo (có phí). Trừơng hợp số đo nằm giữa 2 size, bạn search sp “Sửa theo số
                                                        đo, mua kèm gói sửa này và ghi chú số đo 3 vòng. Trừơng hợp ghi chú số đo
                                                        nhưng ko mua kèm gói sửa, Lin mặc định giao size chuẩn bạn đặt. - Phom dáng:
                                                        đầm cột dây, nhún 2 bên ngực, tà xéo - Chất liệu: lụa, có co giãn nhẹ, thấm
                                                        hút tốt - Ứng dụng: dạo phố, đi tiệc - Bảo quản: giặt riêng với quần áo có
                                                        phụ kiện sắc cạnh, ủi mặt trái.</p>
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
