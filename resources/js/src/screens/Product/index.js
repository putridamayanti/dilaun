import React, {useEffect, useRef, useState} from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    makeStyles,
    MenuItem,
    TablePagination,
    Table,
    TableBody, TableRow, TableCell, TableHead, Hidden
} from "@material-ui/core";
import Title from "../../components/Title";
import AdminLayout from "../../components/AdminLayout";
import {Add, DeleteOutlined, EditOutlined, VisibilityOutlined} from "@material-ui/icons";
import FloatingButton from "../../components/FloatingButton";
import CustomSelectField from "../../components/CustomSelectField";
import {SORT_DEFAULT} from "../../constants/sort";
import {connect} from "react-redux";
import {deleteProduct, fetchAllProducts} from "../../actions/ProductAction";
import Spinner from "../../components/Spinner";
import Product from '../../assets/box.png';
import CustomDialog from "../../components/CustomDialog";
import DeleteConfirm from "../../components/DeleteConfirm";
import IconButton from "@material-ui/core/IconButton";
import CustomMenu from "../../components/CustomMenu";
import CustomTable from "../../components/CustomTable";

const useStyles = makeStyles((theme) => ({
    filter: {
        marginBottom: 20
    },
    thumbnail: {
        width: 60,
        borderRadius: 10,
        marginRight: 10
    },
    image: {
        width: 100,
        borderRadius: 10
    },
    priceBox: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '10px 0'
    }
}));

function ProductScreen(props) {
    const classes = useStyles();
    const { history, fetch, loading, products, pagination, deleteProduct, success } = props;
    const [sort, setSort] = useState(SORT_DEFAULT.NAME);
    const [currPage, setCurrPage] = useState(0);
    const [detail, setDetail] = useState({ open: false, data: null });
    const [deleteItem, setDeleteItem] = useState({ open: false, data: null });

    const mounted = useRef(false);

    useEffect(() => {
        if (!mounted.current) {
            fetch({ sort: sort });

            mounted.current = true;
        }
    });

    useEffect(() => {
        if (success && deleteItem.open) {
            fetch({ sort });
            setDeleteItem({ open: false, data: null});
        }
    }, [success, deleteItem, fetch, sort]);

    const handleChangePage = (event, newPage) => {
        setCurrPage(newPage);
    };

    const handleDelete = () => {
        deleteProduct(deleteItem.data.id);
    };

    return (
        <AdminLayout history={history}>
            <Title title='Product' />

            <div className={classes.filter}>
                <Grid container spacing={3} justify='flex-end'>
                    <Grid item lg={3} xs={4}>
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
                                <TableCell>Icon</TableCell>
                                <TableCell>Name</TableCell>
                                <Hidden smDown>
                                    <TableCell width={200}>Options</TableCell>
                                </Hidden>
                                <Hidden mdUp>
                                    <TableCell align='right'>Options</TableCell>
                                </Hidden>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={3} align='center'>No Data</TableCell>
                                </TableRow>
                            )}

                            {products.map((item, i) => (
                                <TableRow key={i}>
                                    <Hidden smDown>
                                        <TableCell>
                                            <img alt='icon' src={item.image ?? Product} className={classes.thumbnail}/>
                                        </TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => setDetail({ open: true, data: item })}>
                                                <VisibilityOutlined fontSize='small'/>
                                            </IconButton>
                                            <IconButton onClick={() => history.push('/product/update/'+ item.id)}>
                                                <EditOutlined fontSize='small'/>
                                            </IconButton>
                                            <IconButton onClick={() => setDeleteItem({ open: true, data: item })}>
                                                <DeleteOutlined fontSize='small'/>
                                            </IconButton>
                                        </TableCell>
                                    </Hidden>
                                    <Hidden mdUp>
                                        <TableCell>
                                            <img alt='icon' src={item.image ?? Product} className={classes.thumbnail}/>
                                        </TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell align='right'>
                                            <CustomMenu>
                                                <MenuItem onClick={() => setDetail({ open: true, data: item })}>Detail</MenuItem>
                                                <MenuItem onClick={() => history.push('/product/update/'+ item.id)}>Edit</MenuItem>
                                                <MenuItem onClick={() => setDeleteItem({ open: true, data: item })}>Delete</MenuItem>
                                            </CustomMenu>
                                        </TableCell>
                                    </Hidden>
                                </TableRow>
                            ))}
                        </TableBody>
                    </CustomTable>

                    {products.length !== 0 && (
                        <Grid item lg={12} sm={12} xs={12}>
                            <TablePagination
                                labelRowsPerPage=''
                                rowsPerPageOptions={[]}
                                component="div"
                                count={pagination.total ?? 0}
                                rowsPerPage={20}
                                page={currPage}
                                onChangePage={handleChangePage} />
                        </Grid>
                    )}
                </div>
            )}

            <CustomDialog title='Detail User' open={detail.open} onClick={() => setDetail({ open: false, data: null })}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell><Typography variant='subtitle2'>Name</Typography></TableCell>
                            <TableCell><Typography variant='subtitle1'>{detail.data?.name}</Typography></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Typography variant='subtitle2'>Price</Typography></TableCell>
                            <TableCell>
                                {detail.data?.services.map((item, i) => item.service && (
                                    <div className={classes.priceBox} key={i}>
                                        <Typography variant='body2'>{item.service.name}</Typography>
                                        <Typography variant='subtitle2'>${item.price_per_kg}/kg</Typography>
                                        <Typography variant='subtitle2'>${item.price_per_pcs}/pcs</Typography>
                                    </div>
                                ))}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Typography variant='subtitle2'>Icon</Typography></TableCell>
                            <TableCell>
                                {detail.data?.image ? (
                                    <img alt='icon' src={detail.data?.image} className={classes.image}/>
                                ) : '-'}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CustomDialog>

            <DeleteConfirm
                open={deleteItem.open}
                onClose={() => setDeleteItem({ open: false, data: null })}
                onSubmit={handleDelete}/>

            <FloatingButton color='primary' onClick={() => history.push('/product/create')}>
                <Add/>
            </FloatingButton>
        </AdminLayout>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetch: (data) => dispatch(fetchAllProducts(data)),
        deleteProduct: (id) => dispatch(deleteProduct(id))
    }
};

const mapStateToProps = ({ product }) => {
    return {
        loading: product.fetchLoading,
        products: product.products,
        pagination: product.pagination,
        success: product.submitSuccess
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen);
