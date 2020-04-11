import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import { amber, green } from '@material-ui/core/colors'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import WarningIcon from '@material-ui/icons/Warning'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { putCompra, clearCart } from '../actions/productActions'
import { API_URL } from '../actions/typeActions'
import axios from 'axios'

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
}

const useStyle = makeStyles(theme => ({
    form: {
        width: '100%'
    },
    input: {
        width: '100%',
        marginTop: 10
    }
}))

const useStyles1 = makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}))

function MySnackbarContentWrapper(props) {
    const classes = useStyles1()
    const { className, message, onClose, variant, ...other } = props
    const Icon = variantIcon[variant]
  
    return (
      <SnackbarContent
        className={clsx(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
            <span id="client-snackbar" className={classes.message}>
                <Icon className={clsx(classes.icon, classes.iconVariant)} />
                {message}
            </span>
        }
        action={[
            <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                <CloseIcon className={classes.icon} />
            </IconButton>,
        ]}
        {...other}
      />
    )
}
  
MySnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
}

const FinalizarCompraModal = (props) => {
    const classes = useStyle()
    const [inputValue, changeInputValue] = React.useState({ name: "", email: "", phone: "" })
    const [openSnack, setOpenSnak] = React.useState(false)
    const [variant, setVariant] = React.useState('success')
    const [message, setMessage] = React.useState('')

    const handdleChangeInput = event => {
        changeInputValue({ ...inputValue, [event.target.name]: event.target.value })
    }

    const handlePayment = () => {
        let { name, email, phone } = inputValue
        
        axios.post(`${API_URL}/put_compra.php`, {
            "vouchers": props.cart,
            "name": name,
            "email": email,
            "phone": phone
        })
        .then(result => {
            console.log(result)
            let { status, statusText, data } = result

            if (status === 200) {
                if (data.success) {
                    setVariant('warning')
                    setMessage('Aguarde, você será redirecionado para a página de pagamento.')
                    setOpenSnak(true)
                    
                    props.clearCart()
                    props.onClose()

                    setTimeout(() => {
                        console.log('asd')
                        window.open(`https://checkout.vouchers.grtech.space/?idc=${data.compra_id}&idpg=${data.preference_id}`, '_blank');
                    }, 1000)
                } else {
                    setVariant('error')
                    setMessage('Algo deu errado, tente novamente mais tarde.')
                    setOpenSnak(true)
                }

                return
            }

            setVariant('error')
            setMessage('Estamos com problemas, tente novamente mais tarde.')
            setOpenSnak(true)
        })
    }

    let { name, email, phone } = inputValue

    return (
        <>
            <Dialog
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                
                <DialogTitle id="alert-dialog-title">Precisamos de mais algumas informações...</DialogTitle>
                <form>
                    <DialogContent>
                            <div className={classes.form}>
                                <TextField 
                                    className={classes.input} 
                                    id="standard-basic"
                                    name="name"
                                    onChange={e => handdleChangeInput(e)}
                                    value={inputValue['name']}
                                    label="Nome" 
                                />
                                <TextField 
                                    className={classes.input} 
                                    id="standard-basic"
                                    name="email"
                                    onChange={e => handdleChangeInput(e)}
                                    value={inputValue['email']} 
                                    label="Email" 
                                />
                                <TextField 
                                    className={classes.input} 
                                    id="standard-basic"
                                    name="phone"
                                    onChange={e => handdleChangeInput(e)}
                                    value={inputValue['phone']} 
                                    label="Celular (DDD + Número)" 
                                />
                            </div>
                            <br/>
                            <Typography variant="caption">
                                Ao prosseguir para o pagamento, você concorda que leu e aceita os <a href="https://vouchersbellastudio.grtech.space/docs/termos_uso_vouchers_bellastudio.pdf" target="_blank">Termos de uso</a> 
                            </Typography>
                            <br/><br/>
                            <Typography variant="caption">
                                * Após a compra o frete será negóciado por fora. (Frete grátis para a região da Granja Viana)
                                <br/>
                                ** Após prosseguir para o pagamento, o seu carrinho será apagado e não poderá ser recuperado 
                            </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.onClose} color="primary">
                            Cancelar
                        </Button>
                        <Button 
                            onClick={props.onClose}
                            color="primary"
                            autoFocus
                            disabled={ (!name || !email || !phone) ? true : false }
                            onClick={() => handlePayment()}
                        >
                            Ir para Pagamento
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={openSnack}
                autoHideDuration={6000}
                onClose={e => setOpenSnak(false)}
            >
                <MySnackbarContentWrapper
                    onClose={e => setOpenSnak(false)}
                    variant={variant}
                    message={message}
                />
            </Snackbar>
        </>
    )
}

const mapStateToProps = state => ({
    cart: state.ProductReducers.cart,
    payment: state.ProductReducers.payment
})

export default connect(mapStateToProps, { putCompra, clearCart })(FinalizarCompraModal)