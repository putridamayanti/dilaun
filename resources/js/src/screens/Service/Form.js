import React, {useEffect, useRef, useState} from "react";
import Title from "../../components/Title";
import AdminLayout from "../../components/AdminLayout";
import { useParams } from "react-router-dom";
import {Button, Card, CardContent, Grid} from "@material-ui/core";
import CustomTextField from "../../components/CustomTextField";
import CustomImagePicker from "../../components/CustomImagePicker";
import {connect} from "react-redux";
import {createService, fetchOneService, updateService} from "../../actions/ServiceAction";
import Spinner from "../../components/Spinner";
import AlertMessage from "../../components/AlertMessage";
import CustomCropper from "../../components/cropper/CustomCropper";

function FormServiceScreen(props) {
    const { id } = useParams();
    const {
        history, fetch, loading, service, create, update, submitLoading, success, errors
    } = props;
    const [form, setForm] = useState({});
    const [image, setImage] = useState(null);
    const [tempImage, setTempImage] = useState(null);
    const [updateImage, setUpdateImage] = useState(false);
    const mounted = useRef(false);

    useEffect(() => {
        if (!mounted.current) {
            if (id) {
                fetch(id);
            }

            mounted.current = true;
        }
    });

    useEffect(() => {
        if (!form.id && service?.id) {
            setForm(service);

            if (service.image) setImage(service.image);
        }
    }, [form, service]);

    useEffect(() => {
        if (success) {
            handleGoBack();
        }
    }, [success, history]);

    const handleChangeForm = ({ target }) => {
        setForm({
            ...form,
            [target.name]: target.value
        });
    };

    const handleChangeImage = (e) => {
        setUpdateImage(true);

        e.preventDefault();

        let file = e.target.files[0];
        let reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setTempImage(reader.result);
        };
    };

    const handleFinishCapture = (image) => {
        setImage(image);
        setForm({
            ...form,
            image: image
        });
        setTempImage(null);
    };

    const handleSubmit = () => {
        if (id) {
            if (!updateImage) delete form.image;

            update(id, form);
        } else {
            create(form);
        }
    };

    const handleGoBack = () => {
        setForm({});
        history.goBack();
    }

    return (
        <AdminLayout history={history}>
            <Title title={id ? 'Update Service' : 'Create Service'} actionBack={handleGoBack}/>

            <CustomCropper
                open={tempImage !== null}
                image={tempImage}
                onClose={() => setTempImage(null)}
                onFinishCapture={handleFinishCapture}/>

            <Card>
                <CardContent>
                    {errors && (
                        <AlertMessage severity='error' messages={errors}/>
                    )}

                    {loading ? (
                        <Spinner/>
                    ) : (
                        <Grid container spacing={3}>
                            <Grid item lg={12} container justify='center'>
                                <CustomImagePicker
                                    image={image}
                                    onChange={handleChangeImage}/>
                            </Grid>
                            <Grid item lg={12} sm={12} xs={12}>
                                <CustomTextField
                                    label='Name'
                                    placeholder='Service name'
                                    name='name'
                                    value={form.name ?? ''}
                                    onChange={handleChangeForm}/>
                            </Grid>
                            <Grid item lg={12} container justify='flex-end'>
                                <Button
                                    variant='contained'
                                    color={submitLoading ? 'default' : 'primary'}
                                    disabled={submitLoading}
                                    onClick={handleSubmit}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    )}
                </CardContent>
            </Card>
        </AdminLayout>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetch: (id) => dispatch(fetchOneService(id)),
        create: (data) => dispatch(createService(data)),
        update: (id, data) => dispatch(updateService(id, data))
    }
};

const mapStateToProps = ({ service }) => {
    return {
        loading: service.fetchOneLoading,
        service: service.oneService,
        submitLoading: service.submitLoading,
        success: service.submitSuccess,
        errors: service.submitErrors
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FormServiceScreen);
