import React, {useEffect, useRef, useState} from "react";
import Title from "../../components/Title";
import AdminLayout from "../../components/AdminLayout";
import { useParams } from "react-router-dom";
import {Button, Card, CardContent, Grid} from "@material-ui/core";
import CustomTextField from "../../components/CustomTextField";
import CustomSelectField from "../../components/CustomSelectField";
import CustomImagePicker from "../../components/CustomImagePicker";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {connect} from "react-redux";
import {createProduct, fetchOneProduct, updateProduct} from "../../actions/ProductAction";
import CustomCropper from "../../components/cropper/CustomCropper";
import Typography from "@material-ui/core/Typography";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {fetchAllServices} from "../../actions/ServiceAction";
import {AddOutlined, DeleteOutlined} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import {SORT_DEFAULT} from "../../constants/sort";
import Hidden from "@material-ui/core/Hidden";
import AlertMessage from "../../components/AlertMessage";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '80%',
        margin: 'auto',
        padding: 15,

        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    }
}));

function FormProductScreen(props) {
    const classes = useStyles();
    const { id } = useParams();
    const {
        history, fetch, loading, product, create, update, submitLoading,
        success, errors, fetchService, services
    } = props;
    const [form, setForm] = useState({});
    const [image, setImage] = useState(null);
    const [tempImage, setTempImage] = useState(null);
    const [updateImage, setUpdateImage] = useState(false);
    const [productServices, setProductServices] = useState([
        { service_id: null, price_per_kg: null, price_per_pcs: null }
    ]);
    const mounted = useRef(false);

    useEffect(() => {
        if (!mounted.current) {
            if (id) {
                fetch(id);
            }

            fetchService({ sort: SORT_DEFAULT.NAME });
            mounted.current = true;
        }
    });

    useEffect(() => {
        if (!form.id && product?.id) {
            setForm(product);

            if (product.image) setImage(product.image);

            if (product.services.length > 0) setProductServices(product.services);
        }
    }, [form, product]);

    useEffect(() => {
        if (success) {
            setForm({});
            history.push('/product');
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

    const handleAddServiceRow = () => {
        setProductServices([
            ...productServices,
            { service_id: null, price: null}
        ]);
    };

    const handleUpdateServiceRow = (i, { target }) => {
        const { name, value } = target;
        let currServices = productServices;

        currServices[i] = {
            ...currServices[i],
            [name]: value
        };

        setProductServices([
            ...currServices
        ]);
    };

    const handleRemoveServiceRow = (i) => {
        let currServices = productServices;

        if (currServices[i].id) {
            currServices[i].deleted = true;
        } else {
            delete currServices[i];
        }

        setProductServices([
            ...currServices
        ]);
    };

    const handleSubmit = () => {
        const params = {
            ...form,
            services: productServices
        };

        if (id) {
            if (!updateImage) delete params.image;

            update(id, params);
        } else {
            create(params);
        }
    };
    console.log(productServices);
    return (
        <AdminLayout history={history}>
            <Title title={id ? 'Update Product' : 'Create Product'} actionBack={() => history.goBack()}/>

            {errors && (
                <AlertMessage severity='error' messages={errors}/>
            )}

            <CustomCropper
                open={tempImage !== null}
                image={tempImage}
                onClose={() => setTempImage(null)}
                onFinishCapture={handleFinishCapture}/>

            <Card>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item lg={12} container justify='center'>
                            <CustomImagePicker
                                image={image}
                                onChange={handleChangeImage}/>
                        </Grid>
                        <Grid item lg={12} sm={12} xs={12}>
                            <CustomTextField
                                label='Name'
                                placeholder='Product name'
                                name='name'
                                value={form.name ?? ''}
                                onChange={handleChangeForm}/>
                        </Grid>
                        <Grid item lg={12} sm={12} xs={12}>
                            <Typography variant='h4'>Variants</Typography>
                        </Grid>
                        <Grid item lg={12} sm={12} xs={12}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Variant</TableCell>
                                        <Hidden smDown>
                                            <TableCell width={300}>Price per kg</TableCell>
                                            <TableCell width={300}>Price per pcs</TableCell>
                                        </Hidden>
                                        <TableCell width={50}/>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {productServices.filter(item => item.deleted === undefined).map((item, i) => (
                                        <TableRow key={i}>
                                            <Hidden smDown>
                                                <TableCell>
                                                    <CustomSelectField
                                                        name='service_id'
                                                        value={item.service_id ?? 0}
                                                        onChange={(e) => handleUpdateServiceRow(i, e)}>
                                                        <MenuItem disabled value={0}>Select Service</MenuItem>
                                                        {services.map((item, i) => (
                                                            <MenuItem key={i} value={item.id}>{item.name}</MenuItem>
                                                        ))}
                                                    </CustomSelectField>
                                                </TableCell>
                                                <TableCell>
                                                    <CustomTextField
                                                        placeholder='Product price per kg'
                                                        name='price_per_kg'
                                                        value={item.price_per_kg ?? ''}
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position='start'>$</InputAdornment>,
                                                            endAdornment: <InputAdornment position='end'>Kg</InputAdornment>
                                                        }}
                                                        onChange={(e) => handleUpdateServiceRow(i, e)}/>
                                                </TableCell>
                                                <TableCell>
                                                    <CustomTextField
                                                        placeholder='Product price per pcs'
                                                        name='price_per_pcs'
                                                        value={item.price_per_pcs ?? ''}
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position='start'>$</InputAdornment>,
                                                            endAdornment: <InputAdornment position='end'>Pcs</InputAdornment>
                                                        }}
                                                        onChange={(e) => handleUpdateServiceRow(i, e)}/>
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton onClick={() => handleRemoveServiceRow(i)}>
                                                        <DeleteOutlined fontSize='small'/>
                                                    </IconButton>
                                                </TableCell>
                                            </Hidden>
                                            <Hidden mdUp>
                                                <TableCell>
                                                    <CustomSelectField
                                                        name='service_id'
                                                        value={item.service_id ?? 0}
                                                        onChange={(e) => handleUpdateServiceRow(i, e)}>
                                                        <MenuItem disabled value={0}>Select Service</MenuItem>
                                                        {services.map((item, i) => (
                                                            <MenuItem key={i} value={item.id}>{item.name}</MenuItem>
                                                        ))}
                                                    </CustomSelectField>
                                                    <CustomTextField
                                                        placeholder='Product price per kg'
                                                        name='price_per_kg'
                                                        value={item.price_per_kg ?? ''}
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position='start'>$</InputAdornment>,
                                                            endAdornment: <InputAdornment position='end'>Kg</InputAdornment>
                                                        }}
                                                        onChange={(e) => handleUpdateServiceRow(i, e)}/>
                                                    <CustomTextField
                                                        placeholder='Product price per pcs'
                                                        name='price_per_pcs'
                                                        value={item.price_per_pcs ?? ''}
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position='start'>$</InputAdornment>,
                                                            endAdornment: <InputAdornment position='end'>Pcs</InputAdornment>
                                                        }}
                                                        onChange={(e) => handleUpdateServiceRow(i, e)}/>
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton>
                                                        <DeleteOutlined fontSize='small'/>
                                                    </IconButton>
                                                </TableCell>
                                            </Hidden>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Grid>
                        <Grid item lg={12} sm={12} xs={12}>
                            <Button
                                variant='outlined'
                                color='primary'
                                size='small'
                                startIcon={<AddOutlined/>}
                                onClick={handleAddServiceRow}>
                                Add
                            </Button>
                        </Grid>
                        <Grid item lg={12} container justify='flex-end'>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </AdminLayout>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetch: (id) => dispatch(fetchOneProduct(id)),
        create: (data) => dispatch(createProduct(data)),
        update: (id, data) => dispatch(updateProduct(id, data)),
        fetchService: (data) => dispatch(fetchAllServices(data))
    }
};

const mapStateToProps = ({ product, service }) => {
    return {
        loading: product.fetchOneLoading || service.fetchLoading,
        product: product.oneProduct,
        submitLoading: product.submitLoading,
        success: product.submitSuccess,
        errors: product.submitErrors,
        services: service.services
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FormProductScreen);
