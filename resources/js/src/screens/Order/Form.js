import React, {useEffect, useRef, useState} from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Hidden } from '@material-ui/core';
import AdminLayout from '../../components/AdminLayout';
import Title from '../../components/Title';
import DesktopForm from './components/DesktopForm';
import MobileForm from "./components/MobileForm";
import {connect} from "react-redux";
import {fetchAllServices, fetchOneService} from "../../actions/ServiceAction";
import {fetchAllProducts} from "../../actions/ProductAction";
import Spinner from "../../components/Spinner";
import {SORT_DEFAULT} from "../../constants/sort";

const cartWidth = 400;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    left: {
        width: `calc(100% - ${cartWidth + 20}px)`
    },
    right: {
        width: cartWidth,
        maxHeight: '100%',
        marginLeft: 20,
        overflow: 'auto'
    },
    tabBar: {
        background: 'transparent'
    },
    tab: {
        '& img': {
            height: 20
        }
    },
    content: {
        marginTop: 30
    },
    cart: {
        width: 'inherit',
        position: 'fixed',

        '& .MuiCard-root': {
            height: 'calc(100vh - 320px)',
            overflow: 'auto',

            '& h5': {
                fontWeight: 600,
                marginTop: 20,
                marginBottom: 20
            }
        }
    },
    total: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        margin: '15px 0',

        '& h5': {
            fontWeight: 600
        }
    },
    action: {
        marginTop: 20
    }
}));

const services = [
    {
        name: 'Wash',
        image: 'https://image.flaticon.com/icons/png/512/1104/1104627.png'
    },
    {
        name: 'Dry Cleaning',
        image: 'https://image.flaticon.com/icons/png/512/1104/1104627.png'
    },
    {
        name: 'Wash & Iron',
        image: 'https://image.flaticon.com/icons/png/512/1104/1104627.png'
    },
    {
        name: 'Ironing',
        image: 'https://image.flaticon.com/icons/png/512/1104/1104627.png'
    },
    {
        name: 'Wash',
        image: 'https://image.flaticon.com/icons/png/512/1104/1104627.png'
    },
    {
        name: 'Wash',
        image: 'https://image.flaticon.com/icons/png/512/1104/1104627.png'
    },
    {
        name: 'Wash',
        image: 'https://image.flaticon.com/icons/png/512/1104/1104627.png'
    },
    {
        name: 'Wash',
        image: 'https://image.flaticon.com/icons/png/512/1104/1104627.png'
    },
    {
        name: 'Washing',
        image: 'https://image.flaticon.com/icons/png/512/1104/1104627.png'
    }
];

const products = [
    {
        name: 'Shirt',
        image: 'https://image.flaticon.com/icons/png/512/3893/3893019.png',
        prices: [
            { unit: 'Kg', price: 20 },
            { unit: 'Pcs', price: 5 }
        ]
    },
    {
        name: 'T-Shirt',
        image: 'https://image.flaticon.com/icons/png/512/941/941358.png',
        prices: [
            { unit: 'Kg', price: 15 },
            { unit: 'Pcs', price: 3 }
        ]
    },
    {
        name: 'Jeans',
        image: 'https://image.flaticon.com/icons/png/512/599/599388.png',
        prices: [
            { unit: 'Kg', price: 25 },
            { unit: 'Pcs', price: 7 }
        ]
    },
    {
        name: 'Bed Cover',
        image: 'https://image.flaticon.com/icons/png/512/2737/2737833.png',
        prices: [
            { unit: 'Kg', price: 29 },
            { unit: 'Pcs', price: 10 }
        ]
    }
];

function FormOrderScreen(props) {
    const classes = useStyles();
    const {
        history, fetchProducts, fetchServices, loading, services,
        fetchService, service
    } = props;
    const [selectedTab, setSelectedTab] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const mounted = useRef(false);

    useEffect(() => {
        if (!mounted.current) {
            fetchProducts({ sort: SORT_DEFAULT.NAME });
            fetchServices({ sort: SORT_DEFAULT.NAME });

            mounted.current = true;
        }
    });

    useEffect(() => {
        if (service?.id) {
            setProducts(service?.products ?? []);
        }
    });

    const handleSelectService = (id) => {
        if (selectedService === id) {
            setSelectedService(null);
        } else {
            setSelectedService(id);

            fetchService(id);
        }
    };

    const handleSelectProduct = (id) => {
        if (selectedProducts.indexOf(id) !== -1) {
            setSelectedProducts(selectedProducts.filter(item => item !== id));
        } else {
            setSelectedProducts([
                ...selectedProducts,
                id
            ]);
        }
    };

    const handleChangeTab = (e, value) => {
        setSelectedTab(value);
    };

    return (
        <AdminLayout history={history}>
            <Title title='Create Order' />

            {loading ? (
                <Spinner/>
            ) : (
                <div>
                    <Hidden mdDown>
                        <DesktopForm
                            services={services}
                            products={products}
                            items={cartItems}
                            selectedService={selectedService}
                            onSelectService={handleSelectService}
                            selectedProducts={selectedProducts}
                            onSelectProduct={handleSelectProduct}/>
                    </Hidden>

                    <Hidden lgUp>
                        <MobileForm
                            services={services}
                            products={products}
                            items={cartItems}/>
                    </Hidden>
                </div>
            )}
        </AdminLayout>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchServices: (data) => dispatch(fetchAllServices(data)),
        fetchProducts: (data) => dispatch(fetchAllProducts(data)),
        fetchService: (id) => dispatch(fetchOneService(id))
    }
};

const mapStateToProps = ({ service, product }) => {
    return {
        loading: service.fetchLoading || product.fetchLoading,
        services: service.services,
        products: product.products,
        service: service.oneService
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FormOrderScreen);
