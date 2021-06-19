import React, {useEffect, useRef, useState} from 'react';
import { connect } from "react-redux";
import {
    Typography, makeStyles, Table, TableHead, TableRow, TableCell, TableBody,
    Grid, MenuItem, TablePagination, Hidden, Chip
} from "@material-ui/core";
import {
    Add, DeleteOutlined, EditOutlined, VisibilityOutlined
} from '@material-ui/icons';
import Title from "../../components/Title";
import FloatingButton from "../../components/FloatingButton";
import AdminLayout from "../../components/AdminLayout";
import CustomTextField from "../../components/CustomTextField";
import CustomSelectField from "../../components/CustomSelectField";
import {SORT_DEFAULT} from "../../constants/sort";
import CustomTable from "../../components/CustomTable";
import CustomDialog from "../../components/CustomDialog";
import IconButton from "@material-ui/core/IconButton";
import CustomMenu from "../../components/CustomMenu";
import {fetchAllUser} from "../../actions/UserAction";
import Spinner from "../../components/Spinner";
import {ROLE} from "../../constants/role";

const useStyles = makeStyles((theme) => ({
    filter: {
        marginBottom: 20
    }
}));

function UserScreen(props) {
    const classes = useStyles();
    const {
        history, fetchUsers, loading, users, pagination
    } = props;
    const [currPage, setCurrPage] = useState(0);
    const [detail, setDetail] = useState({ open: false, data: null });
    const [filter, setFilter] = useState({
        sort: SORT_DEFAULT.NAME
    });
    const mounted = useRef(false);

    useEffect(() => {
        if (!mounted.current) {
            fetchUsers(filter);

            mounted.current = true;
        }
    });

    const handleChangeFilter = ({ target }) => {
        const { name, value } = target;
        setFilter({
            ...filter,
            [name]: value
        });

        fetchUsers({
            ...filter,
            [name]: value
        });
    };

    const handleChangePage = (event, newPage) => {
        setCurrPage(newPage);
    };

    return (
        <AdminLayout history={history}>
            <Title title='User' />

            <div className={classes.filter}>
                <Grid container spacing={3} justify='space-between'>
                    <Grid item lg={6} xs={8}>
                        <CustomTextField
                            color='white'
                            label='Search'
                            placeholder='Search name or email address'
                            value={filter.keyword ?? ''}
                            name='keyword'
                            onChange={handleChangeFilter}/>
                    </Grid>
                    <Grid item lg={3} xs={4}>
                        <CustomSelectField
                            color='white'
                            label='Sort by'
                            value={filter.sort ?? ''}
                            name='sort'
                            onChange={handleChangeFilter}>
                            {Object.keys(SORT_DEFAULT).map(i => (
                                <MenuItem key={i} value={SORT_DEFAULT[i]}>{SORT_DEFAULT[i]}</MenuItem>
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
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell width={200}>Options</TableCell>
                                </Hidden>
                                <Hidden mdUp>
                                    <TableCell>User</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell align='right'>Options</TableCell>
                                </Hidden>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6}>No Data</TableCell>
                                </TableRow>
                            )}
                            {users.map((item, i) => (
                                <TableRow key={i}>
                                    <Hidden smDown>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>
                                            <Chip label={item.role} color={item.role === ROLE.ADMIN ? 'primary' : 'secondary'} size='small'/>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => setDetail({ open: true, data: item })}>
                                                <VisibilityOutlined fontSize='small'/>
                                            </IconButton>
                                            <IconButton onClick={() => history.push('/user/update/' + item.id)}>
                                                <EditOutlined fontSize='small'/>
                                            </IconButton>
                                            <IconButton>
                                                <DeleteOutlined fontSize='small'/>
                                            </IconButton>
                                        </TableCell>
                                    </Hidden>
                                    <Hidden mdUp>
                                        <TableCell>
                                            <Typography variant='subtitle2'>John Doe</Typography>
                                            <Typography variant='body2'>johndoe@email.com</Typography>
                                        </TableCell>
                                        <TableCell>Employee</TableCell>
                                        <TableCell align='right'>
                                            <CustomMenu>
                                                <MenuItem onClick={() => setDetail({ open: true, data: item })}>Detail</MenuItem>
                                                <MenuItem onClick={() => history.push('/user/update/' + item.id)}>Edit</MenuItem>
                                                <MenuItem>Delete</MenuItem>
                                            </CustomMenu>
                                        </TableCell>
                                    </Hidden>
                                </TableRow>
                            ))}
                        </TableBody>
                    </CustomTable>

                    <TablePagination
                        labelRowsPerPage=''
                        rowsPerPageOptions={[]}
                        component="div"
                        count={pagination.total ?? 0}
                        rowsPerPage={20}
                        page={currPage}
                        onChangePage={handleChangePage} />
                </div>
            )}

            <CustomDialog title='Detail User' open={detail.open} onClick={() => setDetail({ open: false, data: null })}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell><Typography variant='subtitle2'>Fullname</Typography></TableCell>
                            <TableCell><Typography variant='subtitle1'>{detail.data?.name}</Typography></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Typography variant='subtitle2'>Email</Typography></TableCell>
                            <TableCell><Typography variant='subtitle1'>{detail.data?.email}</Typography></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Typography variant='subtitle2'>Username</Typography></TableCell>
                            <TableCell><Typography variant='subtitle1'>{detail.data?.username}</Typography></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Typography variant='subtitle2'>Role</Typography></TableCell>
                            <TableCell><Typography variant='subtitle1'>{detail.data?.role}</Typography></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CustomDialog>

            <FloatingButton color='primary' onClick={() => history.push('/user/create')}>
                <Add/>
            </FloatingButton>
        </AdminLayout>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers: (data) => dispatch(fetchAllUser(data))
    }
};

const mapStateToProps = ({ user }) => {
    return {
        loading: user.fetchLoading,
        users: user.users,
        pagination: user.pagination,
        success: user.submitSuccess
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
