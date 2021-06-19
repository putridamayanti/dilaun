import React from "react";
import makeStyles from "@material-ui/styles/makeStyles/makeStyles";
import MomentUtils from '@date-io/moment';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import classnames from "classnames";
import {COLOR} from "../constants/theme";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '6px 0',
        '& .MuiFormControl-root': {
            height: 50,
            borderRadius: 15,
            '& .MuiInputBase-input': {
                height: 50,
                padding: '0 15px',
                fontWeight: 500,
                fontSize: 14,
                color: COLOR.DARK
            }
        }
    },
    light: {
        '& .MuiFormControl-root': {
            background: COLOR.LIGHT_GREY
        }
    },
    white: {
        '& .MuiFormControl-root': {
            background: COLOR.WHITE
        }
    }
}));

export default function CustomDatePicker(props) {
    const classes = useStyles();
    const { color, label, format, value, onChange } = props;


    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <Box className={classnames(
                classes.root,
                color ? classes[color] : classes.light
            )}>
                { label && (<><Typography variant="caption">{ label }</Typography><br/></>) }
                <KeyboardDatePicker
                    fullWidth
                    InputProps={{
                        disableUnderline: true,
                        readOnly: true
                    }}
                    format={format ?? 'yyyy/MM/DD'}
                    value={value}
                    onChange={onChange}/>
            </Box>
        </MuiPickersUtilsProvider>
    );
}
