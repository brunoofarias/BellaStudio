import {
    ADD_TO_CART,
    FETCH_TYPES,
    FETCH_PAYMENT,
    FETCH_VOUCHER
} from '../actions/typeActions'

const INITIAL_STATE = {
    products: [],
    cart: [],
    types: [],
    payment: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return { ...state, cart: action.payload }

        case FETCH_TYPES:
            return { ...state, types: action.payload }

        case FETCH_VOUCHER:
            return { ...state, products: action.payload }

        case FETCH_PAYMENT:
            return { ...state, payment: action.payload }

        default:
            return state;
    }
}
