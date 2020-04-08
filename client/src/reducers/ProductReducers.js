import {
    ADD_TO_CART,
    FETCH_TYPES,
    FETCH_VOUCHER
} from '../actions/typeActions'

const INITIAL_STATE = {
    products: [],
    cart: [],
    types: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return { ...state, cart: [ ...state.cart, action.payload] }

        case FETCH_TYPES:
            return { ...state, types: action.payload }

        case FETCH_VOUCHER:
            return { ...state, products: action.payload }

        default:
            return state;
    }
}
