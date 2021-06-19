import React, {useState} from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    makeStyles,
    MenuItem,
    Table,
    TableBody,
    TableRow,
    TableCell, TableHead, TablePagination, Hidden
} from "@material-ui/core";
import Title from "../../components/Title";
import AdminLayout from "../../components/AdminLayout";
import CustomTextField from "../../components/CustomTextField";
import CustomSelectField from "../../components/CustomSelectField";
import {SORT_DEFAULT} from "../../constants/sort";
import CustomDialog from "../../components/CustomDialog";
import CustomTable from "../../components/CustomTable";
import IconButton from "@material-ui/core/IconButton";
import {DeleteOutlined, EditOutlined, VisibilityOutlined} from "@material-ui/icons";
import CustomDatePicker from "../../components/CustomDatePicker";
import CustomMenu from "../../components/CustomMenu";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
    filter: {
        marginBottom: 20
    },
    date: {
        display: 'flex',
        alignItems: 'center',

        '& p': {
            margin: 10,
            paddingTop: 20
        }
    }
}));

function ReportScreen(props) {
    const classes = useStyles();
    const { history } = props;
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
            <Title title='Report' />

            <div className={classes.filter}>
                <Grid container spacing={2} justify='space-between'>
                    <Grid item lg={4} sm={12} xs={12}>
                        <CustomTextField
                            color='white'
                            label='Search'
                            placeholder='Search name or email address'
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}/>
                    </Grid>
                    <Hidden smDown>
                        <Grid item lg={5}>
                            <div className={classes.date}>
                                <CustomDatePicker
                                    label='Start date'
                                    color='white'/>
                                <Typography>-</Typography>
                                <CustomDatePicker
                                    label='Start date'
                                    color='white'/>
                            </div>
                        </Grid>
                    </Hidden>
                    <Hidden mdUp>
                        <Grid item sm={12} xs={12}>
                            <CustomDatePicker
                                label='Start date'
                                color='white'/>
                        </Grid>
                        <Grid item sm={12} xs={12}>
                            <CustomDatePicker
                                label='Start date'
                                color='white'/>
                        </Grid>
                    </Hidden>
                    <Grid item lg={3} sm={12} xs={12}>
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

            <CustomDialog title='Detail User' open={detail.open} onClick={() => setDetail({ open: false, data: null })}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell><Typography variant='subtitle2'>Fullname</Typography></TableCell>
                            <TableCell><Typography variant='subtitle1'>John Doe</Typography></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CustomDialog>

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
        </AdminLayout>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {

    }
};

const mapStateToProps = ({ user }) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportScreen);
