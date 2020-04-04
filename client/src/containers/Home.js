import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Navbar from '../components/Navbar'
import CartButton from '../components/CartButton'
import List from '../components/List'

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

const Home = () => {
    const classes = useStyles()

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

export default Home
