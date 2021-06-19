import React from "react";
import MomentUtils from '@date-io/moment';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {KeyboardTimePicker} from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {COLOR} from "../constants/theme";
import classnames from "classnames";
import {IconButton, InputAdornment} from "@material-ui/core";
import {AlarmOutlined} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '10px 0',
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
            background: COLOR.LIGHT_BODY
        }
    }
}))

export default function CustomTimePicker(props) {
    const classes = useStyles()
    const { label, format, color, value, onChange } = props

    return (
        <Box className={classnames(
            classes.root,
            color ? classes[color] : classes.light
        )}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                { label && (
                    <Typography variant="caption">{label}</Typography>
                )}
                <KeyboardTimePicker
                    fullWidth
                    InputProps={{
                        disableUnderline: true,
                        readOnly: true
                    }}
                    format={format ?? 'HH:mm:ss'}
                    value={value}
                    onChange={onChange} />
            </MuiPickersUtilsProvider>
        </Box>
    );
}
