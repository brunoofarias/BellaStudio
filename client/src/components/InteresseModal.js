import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/styles'
import { putInteresse } from '../actions/productActions'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};


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
}));

function MySnackbarContentWrapper(props) {
    const classes = useStyles1();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];
  
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
    );
}
  
MySnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};

const InteresseModal = (props) => {
    const classes = useStyle()
    const [inputValue, changeInputValue] = React.useState({ name: "", email: "", phone: "" })
    const [openSnack, setOpenSnak] = React.useState(false)
    const [variant, setVariant] = React.useState('success')
    const [message, setMessage] = React.useState('')

    const handdleChangeInput = event => {
        changeInputValue({ ...inputValue, [event.target.name]: event.target.value })
    }

    const sendForm = () => {
        let { name, email, phone } = inputValue

        putInteresse(name, email, phone)
        .then(result => {
            console.log(result)
            let { ok, status } = result

            if (ok && status === 200) {
                result
                .json()
                .then(response => {
                    setVariant(response.success ? 'success' : 'error')
                    setMessage(response.msg)
                    setOpenSnak(true)
                    props.onClose()
                })
            } else {
                setVariant('error')
                setMessage('Estamos com problemas. Por favor, tente mais tarde.')
                setOpenSnak(true)
            }
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
                <DialogTitle id="alert-dialog-title">Registre o seu interesse</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Entraremos em contato com você quando as vendas estirem liberadas.
                    </DialogContentText>
                    <form className={classes.form}>
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
                    </form>
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
                    onClick={() => sendForm()}
                >
                    Enviar
                </Button>
                </DialogActions>
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

export default InteresseModal