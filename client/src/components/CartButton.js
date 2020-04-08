import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import CartIcon from '@material-ui/icons/ShoppingCartOutlined'
import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Badge from '@material-ui/core/Badge'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import InteresseModal from './InteresseModal'

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        right: 10,
        bottom: 10,
        '& > *': {
            margin: theme.spacing(1),
        }
    },
    list: {
        width: 300
    }
}))

const CartButton = (props) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    const { cart } = props

    const list = (anchor) => (
        <div
            className={clsx(classes.list)}
            role="presentation"
            onKeyDown={() => setOpen(false)}
        >
            <List style={{ width: '100%' }}>
                {cart.map((item, index) => (
                    <>
                        <ListItem key={item.id} style={{ width: '100%' }}>
                            <div style={{ width: '100%' }}>   
                                <Typography variant="h6">
                                    {item.name}
                                </Typography>
                                <Typography variant="subtitle2">
                                    {item.desc}
                                </Typography>
                                <br/>
                                <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                                    <Button size="small" style={{ marginRight: 10 }}>+</Button>
                                    {item.quantity}
                                    <Button size="small" style={{ marginLeft: 10 }}>-</Button>
                                </div>
                            </div>
                        </ListItem>
                        <Divider />
                    </>
                ))}
            </List>
        </div>
    )

    return (
        <div className={classes.root}>
            <Fab color="primary" aria-label="add" variant="extended" onClick={() => setOpen(true)}>
                {/* <Badge badgeContent={cart.length} color="secondary">
                    <CartIcon />
                </Badge> */}
                Tenho interesse
            </Fab>
            {/* <Drawer anchor={'right'} open={open} onClose={() => setOpen(false)}>
                {list('right')}
            </Drawer> */}
            <InteresseModal open={open} onClose={() => setOpen(false)} />
        </div>
    )
}

const mapStateToProps = state => ({
    cart: state.ProductReducers.cart
})

export default connect(mapStateToProps, null)(CartButton)
