import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import theme, {COLOR} from "../../../constants/theme";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import classnames from "classnames";
import {CheckOutlined} from "@material-ui/icons";
import {Grid} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        cursor: 'pointer',
        position: 'relative'
    },
    image: {
        width: '100%'
    },
    content: {
        textAlign: 'center',
        color: COLOR.DARK,
        fontSize: 16
    },
    price: {
        padding: 5,
        display: 'flex',
        justifyContent: 'space-between'
    },
    check: {
        position: 'absolute',
        right: 0,
        padding: '5px 10px',
        background: COLOR.PRIMARY,
        borderBottomLeftRadius: 20,

        '& .MuiSvgIcon-root': {
            color: COLOR.WHITE
        }
    },
    active: {
        border: `${COLOR.PRIMARY} 5px solid`
    }
}));

export default function CardProduct(props) {
    const classes = useStyles();
    const { image, name, pricePerKg, pricePerPcs, active, onClick } = props;

    return (
        <Card onClick={onClick} variant='outlined' className={classnames(
            classes.root,
            active && classes.active
        )}>
            {active && (
                <div className={classes.check}>
                    <CheckOutlined color={COLOR.WHITE}/>
                </div>
            )}
            <img alt='icon' src={image} className={classes.image} />
            <Typography variant='h6' className={classes.content}>{name}</Typography>
            <div className={classes.price}>
                <Typography variant='subtitle2'>${pricePerKg ?? 0}/kg</Typography>
                <Typography variant='subtitle2'>${pricePerPcs ?? 0}/pcs</Typography>
            </div>
        </Card>
    )
}
