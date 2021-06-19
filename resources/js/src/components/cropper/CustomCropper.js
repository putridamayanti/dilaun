import React, {useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Cropper from 'react-easy-crop';
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import {getCroppedImg} from "./cropper";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 400,
        height: 500,
        paddingBottom: 25,
        position: 'relative'
    },
    paper: {
        borderRadius: 20,
        textAlign: 'center'
    },
    action: {
        justifyContent: 'center',
        padding: 10
    }
}));

export default function CustomCropper(props) {
    const classes = useStyles();
    const { open, ratio, onClose, image, onFinishCapture } = props;

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const zoom = 1;
    const aspect = ratio ?? 4 / 4;
    const [finalImage, setFinalImage] = useState(null);

    const handleChangeCrop = (crop) => {
        setCrop(crop);
    }

    const onCropComplete = async (croppedArea, croppedAreaPixels) => {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels, 0);
        setFinalImage(croppedImage);
    }

    return (
        <Dialog open={open} onClose={onClose} classes={{ paper: classes.paper }}>
            <DialogContent classes={{ root: classes.root }}>
                <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspect}
                    onCropChange={handleChangeCrop}
                    onCropComplete={onCropComplete} />
            </DialogContent>
            <DialogActions className={classes.action}>
                <Button variant="contained" color="primary" size="small"
                        onClick={() => onFinishCapture(finalImage)}>Crop</Button>
                <Button variant="contained" size="small"
                        onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}
