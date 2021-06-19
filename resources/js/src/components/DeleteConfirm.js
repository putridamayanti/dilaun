import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CustomDialog from "./CustomDialog";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    text: {
        textAlign: 'center',
        margin: 15
    },
    action: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 15
,        '& .MuiButton-root': {
            marginRight: 10
        }
    }
}));

export default function DeleteConfirm(props) {
    const { open, question, onClose, onSubmit, isLoading } = props;
    const classes = useStyles();

    return (
        <CustomDialog open={open} onClose={onClose} title="Delete Data">
            <Typography className={classes.text}>
                { question ?? 'Are you sure want to delete this data?' }
            </Typography>
            <div className={classes.action}>
                <Button onClick={onClose} variant="contained">
                    Cancel
                </Button>
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <Button onClick={onSubmit} variant="contained" color="primary">
                        Delete
                    </Button>
                )}
            </div>
        </CustomDialog>
    )
}
