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
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import FinalizarCompraModal from './FinalizarCompraModal'
import { getCart, removeItem, updateInCart, clearCart } from '../actions/productActions'

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
        width: 300,
        maxHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    cartDetails: {
        width: 'calc(100% - 30px)',
        height: 'calc(15vh - 10px)',
        minHeight: 'calc(110px - 30px)',
        padding: 15,
        background: '#e67e22',
        color: '#FFF'
    }
}))

const CartButton = (props) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    const [openModal, setOpenModal] = React.useState(false)
    let { cart } = props

    if (cart) {
        cart = cart.sort((a, b) =>  (a.id > b.id) ? 1 : -1)
    }

    const handleRemove = item => (
        props.removeItem(item)
    )

    const handleAdd = (item) => {
        props.updateInCart({ ...item, quantity: item.quantity + 1 })
    }

    const handleMinus = (item) => {
        if (item.quantity - 1 === 0) {
            return false
        }
        props.updateInCart({ ...item, quantity: item.quantity - 1 })
    }

    const handleClearCart = () => {
        props.clearCart()
    }

    const list = () => {
        let total = 0
        
        if (cart) {
            return (
                <div
                    className={clsx(classes.list)}
                    role="presentation"
                    onKeyDown={() => setOpen(false)}
                >
                    <List style={{ width: '100%', maxHeight: '80vh', height: '80vh', overflow: 'auto' }}>
                        {cart.map((item, index) => {
                            total += parseFloat(item.price) * parseInt(item.quantity)
                            
                            return (
                                <div key={item.id}>
                                    <ListItem style={{ width: '100%' }}>
                                        <div style={{ width: '85%' }}>   
                                            <Typography variant="h6">
                                                {item.name}
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                {item.desc}
                                            </Typography>
                                            <br/>
                                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center' }}>
                                                R$ {(parseFloat(item.price) * parseInt(item.quantity)).toFixed(2).replace('.', ',')}
                                                <div>
                                                    <Button size="small" onClick={() => handleMinus(item)} style={{ marginLeft: 10 }}>-</Button>
                                                        {item.quantity}
                                                    <Button size="small" onClick={() => handleAdd(item)} style={{ marginRight: 10 }}>+</Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ width: '10%' }}>
                                            <IconButton color="danger">
                                                <DeleteIcon onClick={() => handleRemove(item)} />
                                            </IconButton>
                                        </div>
                                    </ListItem>
                                    <Divider />
                                </div>
                            )
                        })}
                    </List>
                    <div className={classes.cartDetails}>
                        <b>Total:</b> R$ {total.toFixed(2).replace('.', ',')}
                        <br/><br/>
                        <Button onClick={() => {setOpenModal(true);setOpen(false)}} variant="contained" color="secondary" size="small">Finalizar Compra</Button>
                        <Button onClick={() => handleClearCart()} size="small">Limpar</Button>
                    </div>
                </div>
            )
        }

        return (
            <Typography>
                Não Há items no seu carrinho
            </Typography>
        )
    }

    return (
        <div className={classes.root}>
            <Fab color="primary" aria-label="add" onClick={() => setOpen(true)}>
                <Badge badgeContent={!cart ? 0 : cart.length} color="secondary">
                    <CartIcon />
                </Badge>
            </Fab>
            <Drawer anchor={'right'} open={open} onClose={() => setOpen(false)}>
                {list()}
            </Drawer>
            <FinalizarCompraModal open={openModal} onClose={() => setOpenModal(false)} />
        </div>
    )
}

const mapStateToProps = state => ({
    cart: state.ProductReducers.cart,
})

export default connect(mapStateToProps, { getCart, removeItem, updateInCart, clearCart })(CartButton)
