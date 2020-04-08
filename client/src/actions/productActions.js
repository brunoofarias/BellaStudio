import {
    FETCH_TYPES,
    FETCH_VOUCHER,
    ADD_TO_CART,
    API_URL
} from './typeActions'
import axios from 'axios'

export const addToCart = item => {
    return dispatch => {
        dispatch({
            type: ADD_TO_CART,
            payload: item
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

export const putInteresse = (name, email, phone) => {
    return fetch(`${API_URL}/put_interesse.php?nome=${name}&email=${email}&telefone=${phone}`)
}
