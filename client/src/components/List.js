import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import { addToCart } from '../actions/productActions'

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
        height: 200,
    },
    card: {
        width: 'calc(33% - 20px)',
        marginBottom: 20,
        marginRight: 20,
        [theme.breakpoints.down('sm')]: {
            minWidth: 300,
            width: '100%'
        }
    },
    aLink: {
        textDecoration: 'none'
    }
}))

const List = (props) => {
    const classes = useStyles()
    const [currentfilter, changeCurrentFilter] = React.useState('all')
    const [search, changeSearch] = React.useState('')

    const handleLink = (link) => {
        changeCurrentFilter(link)
    }

    const handleSearch = event => (
        changeSearch(event.target.value)
    )

    const handleClick = (item) => {
        props.addToCart(item)
    }

    const renderImage = (image) => {
        if (image) {
            return (
                <CardMedia
                    className={classes.media}
                    image={`/images/${image}`}
                    title={image}
                />
            )
        }
    }

    let types = props.types
    let items = props.products

    return (
        <>
            <div className={classes.filter} id="all">
                <Paper component="form" className={classes.root}>
                    <InputBase
                        className={classes.input}
                        placeholder="Pesquisar..."
                        name="search"
                        value={search}
                        onChange={e => handleSearch(e)}
                        inputProps={{ 'aria-label': 'search products' }}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                    {types.map(type => (
                        <a href={`#${type.nome_tipo}`} onClick={() => handleLink(type.nome_tipo)} key={type.tipo_id} className={classes.aLink}>
                            <Chip variant={currentfilter === type.nome_tipo ? "default" : "outlined"} color="primary" style={{ marginLeft: 10 }} size="small" label={type.nome_tipo} />
                        </a>
                    ))}
                    <a href={`#all`} key={234234} className={classes.aLink} onClick={() => handleLink('all')}>
                        <Chip variant={currentfilter === 'all' ? "default" : "outlined"} color="primary" style={{ marginLeft: 10 }} size="small" label="Tudo" />
                    </a>
                    
                </div>
            </div>
            <div className={classes.list}>
                {types.map(type => {
                    let products = items.filter((item) => {
                        if (item.tipo_voucher_id_fk === type.tipo_id) {
                            if (search.length > 3) {
                                let name = item.voucher_nome.toLowerCase();
                                if (name.search(search.toLocaleLowerCase()) !== -1) {
                                    return true
                                }

                                return false
                            }

                            return true
                        }

                        return false
                    })
                    
                    return (
                        <>
                            <Typography variant="h6" id={type.nome_tipo} gutterBottom key={`type${type.tipo_id}`} style={{ color: ''}}>
                                {type.nome_tipo}
                            </Typography>
                            <div className={classes.listItems}>
                                {products.map(product => {
                                    return (
                                        <Card className={classes.card} key={`product${product.voucher_id}`}>
                                            <div>
                                                {renderImage(product.voucher_image)}
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        {product.voucher_nome}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                       {product.voucher_desc}
                                                       <p>De: <span style={{ textDecoration: 'line-through' }}>R${product.voucher_preco_antigo}</span></p>
                                                       <p style={{ color: '#2ecc71' }}>Por: R${product.voucher_preco_novo} </p>
                                                    </Typography>
                                                </CardContent>
                                            </div>
                                            <CardActions>
                                                <Button 
                                                    size="small" 
                                                    color="primary"
                                                    disabled={true}
                                                    onClick={() => handleClick({
                                                        id: product.voucher_id,
                                                        name: product.voucher_nome,
                                                        desc: product.voucher_desc,
                                                        price: product.voucher_preco_novo,
                                                        quantity: 1
                                                    })}
                                                >
                                                        Em Breve
                                                </Button>
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

const mapStateToProps = state => ({
    cart: state.ProductReducers.cart,
    types: state.ProductReducers.types,
    products: state.ProductReducers.products
})

export default connect(mapStateToProps, { addToCart })(List)
