import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import Navbar from '../components/Navbar'
import CartButton from '../components/CartButton'
import List from '../components/List'
import { getTypes, getVouchers, getCart } from '../actions/productActions'

const useStyles = makeStyles(theme => ({
    container: {
        maxWidth: '70%',
        width: '70%',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
            width: '100%'
        }
    }
}))

const Home = (props) => {
    const classes = useStyles()
    
    props.getTypes()
    props.getVouchers()
    props.getCart()

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <div className={classes.container}>
                <Navbar />
                <List/>
            </div>
            <CartButton/>
        </div>
    )
}

export default connect(null, { getTypes, getVouchers, getCart })(Home)
