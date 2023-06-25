import {
    SALE_PRODUCTS_REQUEST,
    SALE_PRODUCTS_SUCCESS,
    SALE_PRODUCTS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    CLEAR_ERRORS

} from '../constants/productConstants'

export const saleProductsReducer = (state = { saleProducts: [] }, action) => {
    switch (action.type) {
        case SALE_PRODUCTS_REQUEST:
        case ADMIN_PRODUCTS_REQUEST:
            return {
                loading: true,
                saleProducts: []
            }

        case SALE_PRODUCTS_SUCCESS:
            return {
                loading: false,
                saleProducts: action.payload.products,
            }

        case ADMIN_PRODUCTS_SUCCESS:
            return {
                loading: false,
                saleProducts: action.payload
            }

        case SALE_PRODUCTS_FAIL:
        case ADMIN_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}
