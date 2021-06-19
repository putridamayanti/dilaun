import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import {AddOutlined, RemoveOutlined} from "@material-ui/icons";
import {Grid, MenuItem} from "@material-ui/core";
import IconButton from "../IconButton";
import {COLOR} from "../../constants/theme";
import CustomSelectField from "../CustomSelectField";

const useStyles = makeStyles((theme) => ({
    root: {
        maxHeight: 80,
        margin: '15px 0'
    },
    image: {
        maxWidth: 50,

        [theme.breakpoints.down('sm')]: {
            maxWidth: 30
        }
    },
    name: {
        fontSize: 14,
        fontWeight: 500
    },
    select: {
        maxHeight: 30,

        '& .MuiSelect-select:focus': {
            maxHeight: 30
        }
    },
    price: {
        fontSize: 14,
        fontWeight: 600,
        color: COLOR.GREY
    },
    qty: {
        display: 'flex',

        '& input': {
            width: 50,
            border: 'none',
            boxShadow: 'none',
            textAlign: 'center',

            [theme.breakpoints.down('sm')]: {
                maxWidth: 40
            }
        },

        '& .MuiButton-containedSizeSmall': {
            minWidth: 20,
            maxHeight: 20,
            padding: 0,

            '& svg': {
                fontSize: 12
            }
        }
    },
    total: {
        fontWeight: 600
    }
}));

export default function CartItem(props) {
    const classes = useStyles();
    const { name, image, price, prices, qty } = props;
    const total = price.price * qty;

    return (
        <div className={classes.root}>
            <Grid container spacing={3} alignItems='center'>
                <Grid item lg={2} xs={2}>
                    <img alt='product' src={image} className={classes.image}/>
                </Grid>
                <Grid item lg={4} xs={4}>
                    <Typography className={classes.name}>{name}</Typography>
                    <CustomSelectField
                        className={classes.select}
                        value={price.unit}>
                        {prices.map((item, i) => (
                            <MenuItem value={item.unit}>${item.price}/{item.unit}</MenuItem>
                        ))}
                    </CustomSelectField>
                    {/*<Typography className={classes.price}>${price}</Typography>*/}
                </Grid>
                <Grid item lg={3} xs={4}>
                    <div className={classes.qty}>
                        <IconButton size='small' color='primary' variant='contained'>
                            <RemoveOutlined fontSize='small'/>
                        </IconButton>
                        <input value={qty}/>
                        <IconButton size='small' color='primary' variant='contained'>
                            <AddOutlined fontSize='small'/>
                        </IconButton>
                    </div>
                </Grid>
                <Grid item lg={3} xs={2} container justify='flex-end'>
                    <Typography className={classes.total}>${total}</Typography>
                </Grid>
            </Grid>
        </div>
    )
}
