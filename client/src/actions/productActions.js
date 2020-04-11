import {
    FETCH_TYPES,
    FETCH_VOUCHER,
    ADD_TO_CART,
    FETCH_PAYMENT,
    API_URL
} from './typeActions'
import axios from 'axios'

const existsInCart = (item, cart) => {
    return cart.filter(product => (product.id === item.id))
}

export const addToCart = item => {
    return dispatch => {
        let cart = localStorage.getItem('cart')

        if (cart) {
            cart = JSON.parse(cart)

            if (existsInCart(item, cart).length > 0) {
                return false
            }

            let newCart = [ ...cart, item ]
            localStorage.setItem('cart', JSON.stringify(newCart))
               
            dispatch({
                type: ADD_TO_CART,
                payload: newCart
            })
        } else {
            cart = [item]
            localStorage.setItem('cart', JSON.stringify(cart))

            dispatch({
                type: ADD_TO_CART,
                payload: cart
            })
        }
    }
}

export const getCart = () => {
    return dispatch => {
        let cart = localStorage.getItem('cart')

        dispatch({
            type: ADD_TO_CART,
            payload: JSON.parse(cart)
        })
    }
}

export const removeItem = item => {
    return dispatch => {
        let cart = JSON.parse(localStorage.getItem('cart'))

        let newCart = cart.filter(product => product.id !== item.id)
        localStorage.setItem('cart', JSON.stringify(newCart))

        dispatch({
            type: ADD_TO_CART,
            payload: newCart
        })
    }
}

export const updateInCart = item => {
    return dispatch => {
        let cart = JSON.parse(localStorage.getItem('cart'))

        let newCart = cart.filter(product => product.id !== item.id)
        newCart = [ ...newCart, item ]
        localStorage.setItem('cart', JSON.stringify(newCart))

        dispatch({
            type: ADD_TO_CART,
            payload: newCart
        })
    }
}

export const clearCart = () => {
    return dispatch => {
        localStorage.removeItem('cart')

        dispatch({
            type: ADD_TO_CART,
            payload: []
        })
    }
}

export const getTypes = () => {
    return dispacth => {
        axios.get(`${API_URL}/get_tipos.php`)
        .then(result => {
            dispacth({
                type: FETCH_TYPES,
                payload: result.data
            })
        })
    }
}

export const getVouchers = () => {
    return dispacth => {
        axios.get(`${API_URL}/get_vouchers.php`)
        .then(result => {
            dispacth({
                type: FETCH_VOUCHER,
                payload: result.data
            })
        })
    }
}

export const putCompra = (name, email, phone, cart) => {
    return axios.post(`${API_URL}/put_compra.php`, {
        "vouchers": cart,
        "name": name,
        "email": email,
        "phone": phone
    })
}

export const putInteresse = (name, email, phone) => {
    return fetch(`${API_URL}/put_interesse.php?nome=${name}&email=${email}&telefone=${phone}`)
}
