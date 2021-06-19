import React from 'react';
import Layout from "../../components/Layout";
import {
    Grid, Card, CardContent, Typography, makeStyles, Button, Table, TableHead, TableRow, TableBody,
    TableCell, Hidden
} from "@material-ui/core";
import Title from "../../components/Title";
import AdminLayout from "../../components/AdminLayout";
import CustomTable from "../../components/CustomTable";
import {Line} from "react-chartjs-2";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
    widget: {
        textAlign: 'center'
    },
    addButton: {
        height: 80
    },
    title: {
        marginTop: 20,
        marginBottom: 10
    }
}));

const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
        {
            label: '# of Votes',
            data: [123, 234, 121, 456, 342, 128],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
        },
    ],
};

const options = {
    // scales: {
    //     yAxes: [
    //         {
    //             ticks: {
    //                 beginAtZero: true,
    //             },
    //         },
    //     ],
    // },
};

function DashboardScreen(props) {
    const classes = useStyles();
    const { history } = props;

    return (
        <AdminLayout history={history}>
            <Title title='Dashboard' />

            <Grid container spacing={3}>
                <Grid item lg={12} sm={12} xs={12}>
                    <Button
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.addButton}>
                        Create Order
                    </Button>
                </Grid>
                <Grid item lg={6} sm={12} xs={12}>
                    <Card>
                        <CardContent className={classes.widget}>
                            <Typography>Today Transaction</Typography>
                            <Typography variant='h3'>12930</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={6} sm={12} xs={12}>
                    <Card>
                        <CardContent className={classes.widget}>
                            <Typography>Today Complete Transaction</Typography>
                            <Typography variant='h3'>12930</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={6} sm={12} xs={12}>
                    <Typography variant='h5' className={classes.title}>Order</Typography>
                    <Card>
                        <CardContent>
                            <Line width={400} height={200} type='line' data={data} options={options}/>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={6} sm={12} xs={12}>
                    <Typography variant='h5' className={classes.title}>Order Complete</Typography>
                    <Card>
                        <CardContent>
                            <Line width={400} height={200} type='line' data={data} options={options}/>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={12} sm={12} xs={12}>
                    <Typography variant='h5' className={classes.title}>Recent Order</Typography>
                    <CustomTable>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order Id</TableCell>
                                <Hidden smDown>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Type</TableCell>
                                </Hidden>
                                <TableCell>Amount</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[1,2,3,4,5].map((item, i) => (
                                <TableRow>
                                    <TableCell>#12354</TableCell>
                                    <Hidden smDown>
                                        <TableCell>John Doe</TableCell>
                                        <TableCell>Dry Cleaning</TableCell>
                                    </Hidden>
                                    <TableCell>5Kg</TableCell>
                                    <TableCell>11:34 AM</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </CustomTable>
                </Grid>
            </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
