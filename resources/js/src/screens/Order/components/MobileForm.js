import React, {useState} from "react";
import makeStyles from "@material-ui/styles/makeStyles/makeStyles";
import {AppBar, Button, Card, CardContent, Drawer, Grid, Tab, Tabs} from "@material-ui/core";
import CardProduct from "./CardProduct";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import {COLOR} from "../../../constants/theme";
import {ShoppingCartOutlined} from "@material-ui/icons";
import CartItem from "../../../components/custom/CartItem";
import classnames from "classnames";

const useStyles = makeStyles(() => ({
    tabBar: {
        backgroundColor: 'transparent !important'
    },
    tab: {
        '& img': {
            height: 20
        }
    },
    content: {
        marginTop: 30,
        marginBottom: 20
    },
    cart: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0
    },
    card: {
        margin: '0 15px',
        background: COLOR.PRIMARY,
        color: COLOR.WHITE,
        borderBottomLeftRadius: '0 !important',
        borderBottomRightRadius: '0 !important',

        '& .MuiCardContent-root': {
            padding: '10px 15px'
        }
    },
    cardWhite: {
        background: COLOR.WHITE,
        color: COLOR.DARK
    },
    cartExpand: {
        maxHeight: 450,
        overflow: 'auto',
        overflowX: 'hidden'
        // background: COLOR.WHITE
    }
}));

export default function MobileForm(props) {
    const classes = useStyles();
    const { services, products, items } = props;

    const [selectedTab, setSelectedTab] = useState(0);
    const [openCart, setOpenCart] = useState(false);

    const handleChangeTab = (e, value) => {
        setSelectedTab(value);
    };

    return (
        <div>
            <AppBar
                position='static'
                color='default'
                elevation={0}
                className={classes.tabBar}>
                <Tabs
                    value={selectedTab}
                    onChange={handleChangeTab}
                    variant='scrollable'
                    scrollButtons='on'
                    indicatorColor='primary'
                    textColor='primary'
                    aria-label='scrollable force tabs example'
                >
                    {services.map((item, i) => (
                        <Tab className={classes.tab} label={item.name} icon={<img src={item.image} alt='icon'/>}/>
                    ))}
                </Tabs>
            </AppBar>

            <div className={classes.content}>
                <Grid container spacing={3}>
                    {products.map((item, i) => (
                        <Grid item lg={3} sm={3} xs={6}>
                            <CardProduct
                                name={item.name}
                                image={item.image}
                                prices={item.prices}
                                cartAction={true}/>
                        </Grid>
                    ))}
                </Grid>
            </div>

            <div className={classes.cart}>
                <Card className={classnames(
                    classes.card,
                    openCart && classes.cardWhite
                )}>
                    <CardContent>
                        <Grid container justify='space-between' alignItems='center' onClick={() => setOpenCart(!openCart)}>
                            <Grid item xs={4}>
                                <Typography variant='caption'>Items</Typography>
                                <Typography>3 Items</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography variant='caption'>Total</Typography>
                                <Typography variant='h6'>$1234</Typography>
                            </Grid>
                            <Grid item xs={2} container justify='center'>
                                Pay
                                <ArrowForwardIosOutlinedIcon/>
                            </Grid>
                        </Grid>
                        {openCart && (
                            <div className={classes.cartExpand}>
                                {products.map((item, i) => (
                                    <div>
                                        <CartItem
                                            name={item.name}
                                            image={item.image}
                                            prices={item.prices}
                                            price={item.prices[0]}
                                            qty={1}/>
                                    </div>
                                ))}
                                <Button
                                    fullWidth
                                    variant='contained'
                                    color='primary'>
                                    Proceed
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
