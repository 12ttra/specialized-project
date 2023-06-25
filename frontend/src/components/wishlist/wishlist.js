import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import MetaData from '../layout/MetaData'

import { useDispatch, useSelector } from 'react-redux'
import { addItemToWishlist, removeItemFromWishlist } from '../../actions/wishlistAction'

const Wishlist = ({ history }) => {

    const dispatch = useDispatch();

    const { wishlistItems } = useSelector(state => state.wishlist)

    const removeWishlistItemHandler = (id) => {
        dispatch(removeItemFromWishlist(id))
    }

    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1;

        if (newQty > stock) return;

        dispatch(addItemToWishlist(id, newQty))
    }

    const decreaseQty = (id, quantity) => {

        const newQty = quantity - 1;

        if (newQty <= 0) return;

        dispatch(addItemToWishlist(id, newQty))

    }

    const checkoutHandler = () => {
        history.push('/')
    }

    

    return (
      <Fragment>
          <MetaData title={'Your wishlist'} />
          {wishlistItems.length === 0 ?
          // wishlist is empty
              <div className="container-fluid mt-100">
                  <div className="row-1 mg-top css-item">
                      <div className="col-md-12">
                          <div className="card">
                              <div className="card-header">
                                  <h5>Wishlist</h5>
                              </div>
                              <div className="card-body cart">
                                  <div className="col-sm-12 empty-cart-cls text-center"> <img src="https://cdn-icons-png.flaticon.com/512/2037/2037457.png" width={130} height={130} className="img-fluid mb-4 mr-3" alt='' />
                                      <h3><strong>Your wishlist is empty</strong></h3>
                                      <h4>Let's add something to the Wishlist filled with love!</h4> <Link to="/" className="btn btn-primary wishlist-btn-transform m-3" data-abc="true">Continue Shopping</Link>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              : (
                  <Fragment>
                      <h3 className="mt-5">Your wishlist is available : <b>{wishlistItems.length} Item</b></h3>

                      <div className="row d-flex justify-content-between mg-top">
                          <div className="col-12 col-lg-8">

                              {wishlistItems.map(item => (
                                  <Fragment>
                                      <hr />

                                      <div className="wishlist-item" key={item.product}>
                                          <div className="row ">
                                              <div className="col-4 col-lg-3">
                                                  <img src={item.image} alt=".." height="90" width="115" />
                                              </div>

                                              <div className="col-5 col-lg-3">
                                                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                                              </div>


                                              <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                  <p className='text-primary'>{(item.price).toLocaleString()}đ</p>
                                              </div>

                                              <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                  <div className="stockCounter d-inline">
                                                      <span className="btn btn-danger minus" onClick={() => decreaseQty(item.product, item.quantity)}>-</span>

                                                      <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

                                                      <span className="btn btn-primary plus" onClick={() => increaseQty(item.product, item.quantity, item.stock)}>+</span>
                                                  </div>
                                              </div>

                                              <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                  <i id="delete_wishlist_item" className="fa fa-trash btn btn-danger" onClick={() => removeWishlistItemHandler(item.product)} ></i>
                                              </div>

                                          </div>
                                      </div>
                                      <hr />
                                  </Fragment>
                              ))}

                          </div>

                          <div className="col-12 col-lg-4 my-4">
                              <div id="order_summary">
                                  <h4 className='text-center'>Total Wishlist Value</h4>
                                  <hr />
                                  <p>Quantity:  <span className="order-summary-values">{wishlistItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (Items)</span></p>
                                  <p>Total: <span className="order-summary-values">{(wishlistItems.reduce((acc, item) => acc + item.quantity * item.price, 0)).toLocaleString()}VND</span></p>

                                  <hr />
                                  <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkoutHandler}>Home</button> {/* onClick={checkoutHandler} */}

                              </div>
                          </div>
                      </div>
                  </Fragment>
              )}
      </Fragment>
  )
}

export default Wishlist;