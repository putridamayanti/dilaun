import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import theme, {COLOR} from "../../../constants/theme";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import classnames from "classnames";
import {CheckOutlined} from "@material-ui/icons";

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
        fontSize: 16,
        marginTop: 5,
        marginBottom: 15
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

export default function CardService(props) {
    const classes = useStyles();
    const { image, name, active, onClick } = props;

    return (
        <Card onClick={onClick} variant='outlined' className={classnames(
            classes.root,
            active && classes.active
        )}>
            {active && (
                <div className={classes.check}>
                    <CheckOutlined />
                </div>
            )}
            <img alt='icon' src={image} className={classes.image} />
            <Typography variant='h6' className={classes.content}>{name}</Typography>
        </Card>
    )
}
