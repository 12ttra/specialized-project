import { ADD_TO_WISHLIST, REMOVE_ITEM_WISHLIST, SAVE_SHIPPING_INFO } from '../constants/wishlistConstant'

export const wishlistReducer = (state = { wishlistItems: [], shippingInfo: {} }, action) => {
    switch (action.type) {

        case ADD_TO_WISHLIST:
            const item = action.payload;

            const isItemExist = state.wishlistItems.find(i => i.product === item.product)

            if (isItemExist) {
                return {
                    ...state,
                    wishlistItems: state.wishlistItems.map(i => i.product === isItemExist.product ? item : i)
                }
            } else {
                return {
                    ...state,
                    wishlistItems: [...state.wishlistItems, item]
                }
            }

        case REMOVE_ITEM_WISHLIST:
            return {
                ...state,
                wishlistItems: state.wishlistItems.filter(i => i.product !== action.payload)
            }


        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            }


        default:
            return state
    }
}