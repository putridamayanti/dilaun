import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import classnames from "classnames";
import {COLOR} from "../constants/theme";

const styles = {
    formControl: {
        width: '100%',
        margin: '5px 0',
        textAlign: 'left',
    },
    input: {
        '& .MuiOutlinedInput-root': {
            minHeight: 45,
            borderRadius: 15,
            fontWeight: 500,
            '& fieldset': {
                border: 'none',
                borderRadius: 10,
            },
        },
        '& .MuiOutlinedInput-marginDense': {
            fontSize: 14
        },
        '& .MuiOutlinedInput-input': {
            fontSize: 14,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 10
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
}

class CustomTextArea extends React.Component {
    render() {
        const { classes, label, input, rows, helperText, color, InputProps, ...props } = this.props
        return (
            <FormControl className={classes.formControl} { ...props }>
                { label && (
                    <Typography variant="caption">{ label }</Typography>
                )}
                <TextField
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={rows}
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

export default withStyles(styles)(CustomTextArea)
