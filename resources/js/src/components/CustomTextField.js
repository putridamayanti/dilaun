import React from "react";
import classnames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {COLOR} from "../constants/theme";

const styles = (theme) => ({
    formControl: {
        width: '100%',
        margin: '10px 0',
        textAlign: 'left',
    },
    input: {
        '& .MuiOutlinedInput-root': {
            height: 50,
            borderRadius: 15,
            fontWeight: 500,
            '& fieldset': {
                border: 'none',
                borderRadius: 15,
            },
        },
        '& .MuiOutlinedInput-marginDense': {
            height: 50,
            fontSize: 14
        },
        '& .MuiOutlinedInput-input': {
            height: 50,
            fontSize: 14,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 15
        },
        '& .MuiSvgIcon-root': {
            color: COLOR.DARK
        }
    },
    light: {
        '& .MuiOutlinedInput-root': {
            background: COLOR.LIGHT_GREY
        }
    },
    white: {
        '& .MuiOutlinedInput-root': {
            background: COLOR.WHITE
        }
    }
});

class CustomTextField extends React.Component {
    render() {
        const { classes, label, input, helperText, color, InputProps, ...props } = this.props
        return (
            <FormControl className={classes.formControl} { ...props }>
                { label && (
                    <Typography variant="caption">{ label }</Typography>
                )}
                <TextField
                    fullWidth
                    variant="outlined"
                    classes={{
                        root: classnames(
                            classes.input,
                            color ? classes[color] : classes.light
                        )
                    }}
                    helperText={helperText}
                    InputProps={InputProps}
                    { ...input }
                    { ...props }
                />
            </FormControl>
        );
    }
}

export default withStyles(styles)(CustomTextField)
