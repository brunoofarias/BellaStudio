import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
    filter: {
        width: 'calc(100% - 30px)',
        padding: 10
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    list: {
        width: 'calc(100% - 30px)',
        padding: 10,
    },
    listItems: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    media: {
        height: 140,
    },
    card: {
        width: 'calc(33% - 20px)',
        marginBottom: 20,
        marginRight: 20,
        [theme.breakpoints.down('sm')]: {
            minWidth: 300,
            width: '100%'
        }
    }
}))

const types = [
    { 'id': 1, 'name': 'Serviços' },
    { 'id': 2, 'name': 'Produtos' },
    { 'id': 3, 'name': 'Combos' }
]

const items = [
    {
        id: 1,
        name: 'Name x',
        desc: 'Desc aaa',
        type: 1,
        price: 99.99,
        currentPrice: 79.99 
    },
    {
        id: 2,
        name: 'Name y',
        desc: 'Desc aaa',
        type: 1,
        price: 99.99,
        currentPrice: 79.99 
    },
    {
        id: 3,
        name: 'Name z',
        desc: 'Desc aaa',
        type: 1,
        price: 99.99,
        currentPrice: 79.99 
    },
    {
        id: 4,
        name: 'Name a',
        desc: 'Desc aaa',
        type: 2,
        price: 99.99,
        currentPrice: 79.99 
    },
    {
        id: 5,
        name: 'Name b',
        desc: 'Desc aaa',
        type: 1,
        price: 99.99,
        currentPrice: 79.99 
    },
    {
        id: 6,
        name: 'Name c',
        desc: 'Desc aaa',
        type: 2,
        price: 99.99,
        currentPrice: 79.99 
    },
    {
        id: 7,
        name: 'Name d',
        desc: 'Desc aaa',
        type: 2,
        price: 99.99,
        currentPrice: 79.99 
    },
    {
        id: 8,
        name: 'Name e',
        desc: 'Desc aaa',
        type: 3,
        price: 29.99,
        currentPrice: 20.99 
    },
    {
        id: 9,
        name: 'Name f',
        desc: 'Desc aaa',
        type: 3,
        price: 60.99,
        currentPrice: 10.99
    }
]

const List = () => {
    const classes = useStyles()

    return (
        <>
            <div className={classes.filter}>
                <Paper component="form" className={classes.root}>
                    <InputBase
                        className={classes.input}
                        placeholder="Pesquisar..."
                        inputProps={{ 'aria-label': 'search products' }}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <Chip variant="outlined" style={{ marginLeft: 10 }} size="small" label="Serviços" />
                    <Chip variant="outlined" style={{ marginLeft: 10 }} size="small" label="Produtos" />
                    <Chip variant="outlined" style={{ marginLeft: 10 }} size="small" label="Combos" />
                    <Chip variant="default" color="primary" style={{ marginLeft: 10 }} size="small" label="Tudo" />
                </div>
            </div>
            <div className={classes.list}>
                {types.map(type => {
                    let products = items.filter(item => item.type === type.id)

                    return (
                        <>
                            <Typography variant="h6" gutterBottom key={`type${type.id}`}>
                                {type.name}
                            </Typography>
                            <div className={classes.listItems}>
                                {products.map(product => {
                                    return (
                                        <Card className={classes.card} key={`product${product.id}`}>
                                            <CardActionArea>
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        {product.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                       {product.desc}
                                                       <p>De: <span style={{ textDecoration: 'line-through' }}>{product.price}</span></p>
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions>
                                                <Button size="small" color="primary">
                                                    Adicionar
                                                </Button>
                                                <p style={{ fontSize: 14, }}>
                                                    Por: {product.currentPrice}
                                                </p>
                                            </CardActions>
                                        </Card>
                                    )
                                })}
                            </div>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default List
