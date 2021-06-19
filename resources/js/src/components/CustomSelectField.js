import React from "react";
import classnames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {COLOR} from "../constants/theme";

const styles = {
    formControl: {
        textAlign: 'left',
        margin: '10px 0'
    },
    input: {
        '& .MuiOutlinedInput-root': {
            height: 50,
            borderRadius: 15,
            fontSize: 14,
            fontWeight: 500,
            color: COLOR.DARK,
            '& fieldset': {
                border: 'none',
                borderRadius: 15,
            },
            '& .MuiSelect-outlined.MuiSelect-outlined': {
                height: '100%',
                paddingTop: 0,
                paddingBottom: 0,
                display: 'flex',
                alignItems: 'center',
                borderRadius: 15,
            }
        },
        '& .MuiOutlinedInput-marginDense': {
            height: 50,
            fontSize: 14
        },
    },
    light: {
        '& .MuiOutlinedInput-root': {
            background: COLOR.LIGHT_GREY
        }
    },
    white: {
        '& .MuiOutlinedInput-root': {
            background: COLOR.WHITE
        },
        '& .MuiSelect-select:focus': {
            background: COLOR.WHITE
        }
    }
}

class CustomSelectField extends React.Component {
    render() {
        const { classes, input, children, label, helperText,
            placeholder, color, onChange, ...props } = this.props

        return (
            <FormControl fullWidth className={classes.formControl} { ...props }>
                { label && (
                    <Typography variant="caption">{ label }</Typography>
                )}
                <TextField
                    variant="outlined"
                    placeholder={placeholder}
                    classes={{
                        root: classnames(
                            classes.input,
                            color ? classes[color] : classes.light
                        )
                    }}
                    select
                    onChange={onChange}
                    { ...input }
                    { ...props }
                    helperText={helperText}
                    onKeyDown={onChange}
                >
                    { children }
                </TextField>
            </FormControl>
        );
    }
}

export default withStyles(styles)(CustomSelectField)
