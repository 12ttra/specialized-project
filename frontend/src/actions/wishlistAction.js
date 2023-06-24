import axios from 'axios'
import { ADD_TO_WISHLIST, REMOVE_ITEM_WISHLIST, SAVE_SHIPPING_INFO } from '../constants/wishlistConstant'

export const addItemToWishlist = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`)

    dispatch({
        type: ADD_TO_WISHLIST,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity
        }
    })

    localStorage.setItem('wishlistItems', JSON.stringify(getState().wishlist.wishlistItems))
}

export const removeItemFromWishlist = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_ITEM_WISHLIST,
        payload: id
    })

    localStorage.setItem('wishlistItems', JSON.stringify(getState().wishlist.wishlistItems))

}

export const saveShippingInfo = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    })

    localStorage.setItem('shippingInfo', JSON.stringify(data))

}