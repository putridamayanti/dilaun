import React from "react";
import makeStyles from '@material-ui/core/styles/makeStyles';
import {Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {ArrowBackIosOutlined} from "@material-ui/icons";
import {COLOR} from "../constants/theme";

const useStyles = makeStyles((theme) => ({
    root: {
        height: 48,
        display: 'flex',
        alignItems: 'center',
        marginBottom: 20,

        '& h6': {
            fontSize: 36,
            fontWeight: 500,
            color: COLOR.DARK
        },

        '& .MuiIconButton-root': {
            marginRight: 15
        }
    }
}));

export default function Title(props) {
    const classes = useStyles();
    const { title, actionBack } = props;

    return (
        <div className={classes.root}>
            {actionBack && (
                <IconButton onClick={actionBack}>
                    <ArrowBackIosOutlined fontSize='small'/>
                </IconButton>
            )}
            <Typography variant='h6'>{title}</Typography>
        </div>
    )
}
