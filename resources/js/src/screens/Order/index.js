import React, {useState} from 'react';
import Layout from "../../components/Layout";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    makeStyles,
    MenuItem,
    TableHead,
    TableRow,
    TableCell, TableBody, Hidden, TablePagination
} from "@material-ui/core";
import Title from "../../components/Title";
import AdminLayout from "../../components/AdminLayout";
import CustomTextField from "../../components/CustomTextField";
import CustomSelectField from "../../components/CustomSelectField";
import {SORT_DEFAULT} from "../../constants/sort";
import IconButton from "@material-ui/core/IconButton";
import {Add, DeleteOutlined, EditOutlined, VisibilityOutlined} from "@material-ui/icons";
import CustomTable from "../../components/CustomTable";
import FloatingButton from "../../components/FloatingButton";
import CustomMenu from "../../components/CustomMenu";
import {connect} from "react-redux";
import {fetchAllServices} from "../../actions/ServiceAction";
import {fetchAllProducts} from "../../actions/ProductAction";
import Spinner from "../../components/Spinner";

const useStyles = makeStyles((theme) => ({
    filter: {
        marginBottom: 20
    }
}));

function OrderScreen(props) {
    const classes = useStyles();
    const { history, loading, services, products } = props;
    const [keyword, setKeyword] = useState('');
    const [sort, setSort] = useState(SORT_DEFAULT.NAME);
    const [currPage, setCurrPage] = useState(1);
    const [rowPerPage, setRowPerPage] = useState(20);
    const [detail, setDetail] = useState({ open: false, data: null });

    const handleChangePage = (event, newPage) => {
        setCurrPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowPerPage(parseInt(event.target.value, 10));
        setCurrPage(0);
    };

    return (
        <AdminLayout history={history}>
            <Title title='Order' />

            <div className={classes.filter}>
                <Grid container spacing={3} justify='space-between'>
                    <Grid item lg={6}>
                        <CustomTextField
                            color='white'
                            label='Search'
                            placeholder='Search name or email address'
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}/>
                    </Grid>
                    <Grid item lg={3}>
                        <CustomSelectField
                            color='white'
                            label='Sort by'
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}>
                            {Object.keys(SORT_DEFAULT).map(i => (
                                <MenuItem value={SORT_DEFAULT[i]}>{SORT_DEFAULT[i]}</MenuItem>
                            ))}
                        </CustomSelectField>
                    </Grid>
                </Grid>
            </div>

            {loading ? (
                <Spinner/>
            ) : (
                <div>
                    <CustomTable>
                        <TableHead>
                            <TableRow>
                                <Hidden smDown>
                                    <TableCell>Order Id</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Total</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell width={150}>Options</TableCell>
                                </Hidden>
                                <Hidden mdUp>
                                    <TableCell>Order</TableCell>
                                    <TableCell>Total</TableCell>
                                    <TableCell align='right'>Options</TableCell>
                                </Hidden>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[1,2,3,4,5,6,7,8].map((i) => (
                                <TableRow>
                                    <Hidden smDown>
                                        <TableCell sortDirection={'asc'}>#12354</TableCell>
                                        <TableCell>John Doe</TableCell>
                                        <TableCell>Dry Cleaning</TableCell>
                                        <TableCell>5Kg</TableCell>
                                        <TableCell>$123</TableCell>
                                        <TableCell>20 May 2021 11:34 AM</TableCell>
                                        <TableCell>
                                            <IconButton>
                                                <VisibilityOutlined fontSize='small'/>
                                            </IconButton>
                                            <IconButton>
                                                <EditOutlined fontSize='small'/>
                                            </IconButton>
                                            <IconButton>
                                                <DeleteOutlined fontSize='small'/>
                                            </IconButton>
                                        </TableCell>
                                    </Hidden>
                                    <Hidden mdUp>
                                        <TableCell>
                                            <Typography variant='subtitle2'>#1234 - John Doe</Typography>
                                            <Typography variant='body2'>Dry Clean - 5Kg</Typography>
                                            <Typography variant='caption'>20 May 2021 11:34 AM</Typography>
                                        </TableCell>
                                        <TableCell>$123</TableCell>
                                        <TableCell align='right'>
                                            <CustomMenu>
                                                <MenuItem>Detail</MenuItem>
                                                <MenuItem>Edit</MenuItem>
                                                <MenuItem>Delete</MenuItem>
                                            </CustomMenu>
                                        </TableCell>
                                    </Hidden>
                                </TableRow>
                            ))}
                        </TableBody>
                    </CustomTable>

                    <TablePagination
                        labelRowsPerPage='Rows'
                        rowsPerPageOptions={[5, 10, 20, 50]}
                        component="div"
                        count={100}
                        rowsPerPage={rowPerPage}
                        page={currPage}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />

                    <FloatingButton color='primary' onClick={() => history.push('/order/create')}>
                        <Add/>
                    </FloatingButton>
                </div>
            )}
        </AdminLayout>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchService: (data) => dispatch(fetchAllServices(data)),
        fetchProduct: (data) => dispatch(fetchAllProducts(data))
    }
};

const mapStateToProps = ({ service, product }) => {
    return {
        loading: service.fetchLoading || product.fetchLoading,
        services: service.services,
        products: product.products
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);
