import React, {useEffect, useRef, useState} from 'react';
import {
    Grid,
    makeStyles,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TablePagination,
    TableRow,
    Typography
} from "@material-ui/core";
import Title from "../../components/Title";
import AdminLayout from "../../components/AdminLayout";
import {Add, DeleteOutlined, EditOutlined, VisibilityOutlined} from "@material-ui/icons";
import FloatingButton from "../../components/FloatingButton";
import CustomSelectField from "../../components/CustomSelectField";
import {SORT_DEFAULT} from "../../constants/sort";
import {connect} from "react-redux";
import {deleteService, fetchAllServices} from "../../actions/ServiceAction";
import Spinner from "../../components/Spinner";
import Customer from '../../assets/customer.png';
import CustomDialog from "../../components/CustomDialog";
import DeleteConfirm from "../../components/DeleteConfirm";
import CustomTable from "../../components/CustomTable";
import TableHead from "@material-ui/core/TableHead";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import CustomMenu from "../../components/CustomMenu";

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
    }
}));

function ServiceScreen(props) {
    const classes = useStyles();
    const {
        history, fetch, loading, services, pagination, deleteService, success
    } = props;
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
        deleteService(deleteItem.data.id);
    };

    return (
        <AdminLayout history={history}>
            <Title title='Services' />

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
                                <Hidden smDown>
                                    <TableCell>Icon</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell width={200}>Options</TableCell>
                                </Hidden>
                                <Hidden mdUp>
                                    <TableCell>Icon</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell align='right'>Options</TableCell>
                                </Hidden>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {services.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={3} align='center'>No Data</TableCell>
                                </TableRow>
                            )}
                            {services.map((item, i) => (
                                <TableRow key={i}>
                                    <Hidden smDown>
                                        <TableCell>
                                            <img alt='icon' src={item.image ?? Customer} className={classes.thumbnail}/>
                                        </TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => setDetail({ open: true, data: item })}>
                                                <VisibilityOutlined fontSize='small'/>
                                            </IconButton>
                                            <IconButton onClick={() => history.push('/service/update/'+ item.id)}>
                                                <EditOutlined fontSize='small'/>
                                            </IconButton>
                                            <IconButton onClick={() => setDeleteItem({ open: true, data: item })}>
                                                <DeleteOutlined fontSize='small'/>
                                            </IconButton>
                                        </TableCell>
                                    </Hidden>
                                    <Hidden mdUp>
                                        <TableCell>
                                            <img alt='icon' src={item.image ?? Customer} className={classes.thumbnail}/>
                                        </TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell align='right'>
                                            <CustomMenu>
                                                <MenuItem onClick={() => setDetail({ open: true, data: item })}>Detail</MenuItem>
                                                <MenuItem onClick={() => history.push('/service/update/'+ item.id)}>Edit</MenuItem>
                                                <MenuItem onClick={() => setDeleteItem({ open: true, data: item })}>Delete</MenuItem>
                                            </CustomMenu>
                                        </TableCell>
                                    </Hidden>
                                </TableRow>
                            ))}
                        </TableBody>
                    </CustomTable>

                    {services.length !== 0 && (
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

            <CustomDialog title='Detail Service' open={detail.open} onClick={() => setDetail({ open: false, data: null })}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell><Typography variant='subtitle2'>Name</Typography></TableCell>
                            <TableCell><Typography variant='subtitle1'>{detail.data?.name}</Typography></TableCell>
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

            <FloatingButton color='primary' onClick={() => history.push('/service/create')}>
                <Add/>
            </FloatingButton>
        </AdminLayout>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetch: (data) => dispatch(fetchAllServices(data)),
        deleteService: (id) => dispatch(deleteService(id))
    }
};

const mapStateToProps = ({ service }) => {
    return {
        loading: service.fetchLoading,
        services: service.services,
        pagination: service.pagination,
        success: service.submitSuccess
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceScreen);
