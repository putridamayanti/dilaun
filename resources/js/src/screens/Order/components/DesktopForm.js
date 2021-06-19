import React, {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
    AppBar,
    Button,
    Card,
    CardContent,
    Grid,
    Tab,
    Tabs
} from "@material-ui/core";
import CardProduct from "./CardProduct";
import Typography from "@material-ui/core/Typography";
import ServiceIcon from '../../../assets/customer.png';
import ProductIcon from '../../../assets/box.png';
import CardService from "./CardService";
import EmptyData from "../../../components/EmptyData";
import CustomDialog from "../../../components/CustomDialog";

const cartWidth = 400;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    left: {
        width: `calc(100% - ${cartWidth + 20}px)`
    },
    card: {
        marginTop: 15
    },
    right: {
        width: cartWidth,
        maxHeight: '100%',
        marginLeft: 20,
        overflow: 'auto'
    },
    content: {
        marginTop: 30
    },
    thumbnail: {
        width: '100%'
    },
    cart: {
        width: 'inherit',
        position: 'fixed',

        '& .MuiCard-root': {
            height: 'calc(100vh - 320px)',
            overflow: 'auto',

            '& h5': {
                fontWeight: 600,
                marginTop: 20,
                marginBottom: 20
            }
        }
    },
    total: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        margin: '15px 0',

        '& h5': {
            fontWeight: 600
        }
    },
    action: {
        marginTop: 20
    }
}));

export default function DesktopForm(props) {
    const classes = useStyles();
    const {
        services, products, items, selectedService, onSelectService, selectedProducts, onSelectProduct
    } = props;
    const tabs = [
        { id: 0, name: 'All Services', image: ServiceIcon },
        ...services
    ];
    const [selectedTab, setSelectedTab] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [tempProduct, setTempProduct] = useState(null);

    const handleChangeTab = (e, value) => {
        setSelectedTab(value);
    };

    const handleSelectProduct = (product) => {
        setTempProduct(product);
    };

    return (
        <div style={{ display: 'flex' }}>
            <div className={classes.left}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant='h4'>Services</Typography>
                        <div className={classes.content}>
                            <Grid container spacing={3}>
                                {services.map((item, i) => (
                                    <Grid key={i} item lg={3} sm={6} xs={6}>
                                        <CardService
                                            name={item.name}
                                            image={item.image ?? ServiceIcon}
                                            active={Boolean(selectedService === item.id)}
                                            onClick={() => onSelectService(item.id)}/>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </CardContent>
                </Card>

                {selectedService && (
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant='h4'>Products</Typography>
                            <div className={classes.content}>
                                {products.length === 0 ? (
                                    <EmptyData/>
                                ) : (
                                    <Grid container spacing={3}>
                                        {products.map((item, i) => (
                                            <Grid key={i} item lg={3} sm={6} xs={6}>
                                                <CardProduct
                                                    name={item.name}
                                                    image={item.image ?? ServiceIcon}
                                                    pricePerKg={item.price_per_kg}
                                                    pricePerPcs={item.price_per_pcs}
                                                    active={Boolean(selectedProducts.indexOf(item.id) !== -1)}
                                                    onClick={() => onSelectProduct(item.id)}/>
                                            </Grid>
                                        ))}
                                    </Grid>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            <div className={classes.right}>
                <div className={classes.cart}>
                    <Typography variant='h5'>Order</Typography>
                    <Card>
                        <CardContent>
                            <div className={classes.cartContent}>
                                {/*{products.map((item, i) => (*/}
                                {/*    <CartItem*/}
                                {/*        name={item.name}*/}
                                {/*        image={item.image}*/}
                                {/*        prices={item.prices}*/}
                                {/*        price={item.prices[0]}*/}
                                {/*        qty={1}/>*/}
                                {/*))}*/}
                            </div>
                        </CardContent>
                    </Card>
                    <div className={classes.action}>
                        <div className={classes.total}>
                            <Typography variant='subtitle1'>Total</Typography>
                            <Typography variant='h5'>$1223</Typography>
                        </div>
                        <Button
                            fullWidth
                            variant='contained'
                            color='primary'>
                            Pay
                        </Button>
                    </div>
                </div>
            </div>

            <CustomDialog open={Boolean(tempProduct)}>

            </CustomDialog>
        </div>
    )
}
