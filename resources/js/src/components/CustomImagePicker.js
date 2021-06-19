import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import {COLOR} from "../constants/theme";

const useStyles = makeStyles(() => ({
    root: {
        '& label': {
            width: 150,
            height: 150,
            borderRadius: 20,
            color: COLOR.GREY,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',

            '& img': {
                width: 150,
                borderRadius: 18
            }
        },

        '& input': {
            display: 'none'
        }
    },
    picker: {
        border: `2px dashed ${COLOR.GREY}`
    },
    image: {
        border: `2px solid ${COLOR.GREY}`
    }
}));

export default function CustomImagePicker(props) {
    const classes = useStyles();
    const { onChange, image } = props;

    return (
        <div className={classes.root}>
            <input
                type="file"
                name="file"
                id='file'
                onChange={onChange} />
            { image ? (
                <label htmlFor="file" className={classes.image}>
                    <img src={image}/>
                </label>
            ) : (
                <label htmlFor="file" className={classes.picker}>
                    <AddOutlinedIcon fontSize="large"/>
                </label>
            )}
        </div>
    )
}
