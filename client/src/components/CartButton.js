import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import CartIcon from '@material-ui/icons/ShoppingCartOutlined'
import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        right: 10,
        bottom: 10,
        '& > *': {
            margin: theme.spacing(1),
        }
    }
}))



const CartButton = () => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={() => setOpen(false)}
            onKeyDown={() => setOpen(false)}
        >
            <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
                </ListItem>
            ))}
            </List>
            <Divider />
            <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
                </ListItem>
            ))}
            </List>
        </div>
    )

    return (
        <div className={classes.root}>
            <Fab color="primary" aria-label="add" onClick={() => setOpen(true)}>
                <CartIcon />
            </Fab>
            <Drawer anchor={'right'} open={open} onClose={() => setOpen(false)}>
                {list('right')}
            </Drawer>
        </div>
    )
}

export default CartButton
