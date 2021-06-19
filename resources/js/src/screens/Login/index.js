import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import {Button, Card, CardContent} from "@material-ui/core";
import CustomTextField from "../../components/CustomTextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import {AccountCircleOutlined, LockOutlined} from "@material-ui/icons";
import { Alert, AlertTitle } from '@material-ui/lab';
import {COLOR} from "../../constants/theme";
import {login} from "../../actions/AuthAction";
import AlertMessage from "../../components/AlertMessage";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        [theme.breakpoints.down('sm')]: {
            padding: 20
        }
    },
    form: {
        width: '45%',
        padding: 30,
        textAlign: 'center',

        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    logo: {
        marginBottom: 20,
        color: COLOR.PRIMARY
    },
    button: {
        marginTop: 15
    }
}));

function LoginScreen(props) {
    const classes = useStyles();
    const { login, loading, success, errors } = props;
    const [form, setForm] = useState({});

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1000)
        }
    }, [success]);

    const handleChangeForm = ({ target }) => {
          const { name, value } = target;

          setForm({
              ...form,
              [name]: value
          });
    };

    const handleSubmit = () => {
        login(form);
    };

    return (
        <div className={classes.root}>
            <Card className={classes.form}>
                <CardContent>
                    <Typography variant='h4' className={classes.logo}>dilaun.</Typography>
                    <Typography variant='h6'>Login</Typography>

                    {errors && (
                        <AlertMessage severity="error" messages={errors}/>
                    )}

                    {success && (
                        <AlertMessage severity='success' messages={success}/>
                    )}

                    <CustomTextField
                        label='Username'
                        placeholder='Your username or email'
                        name='username'
                        onChange={handleChangeForm}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <AccountCircleOutlined/>
                                </InputAdornment>
                            )
                        }} />
                    <CustomTextField
                        label='Password'
                        placeholder='Your password'
                        type='password'
                        name='password'
                        onChange={handleChangeForm}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <LockOutlined/>
                                </InputAdornment>
                            )
                        }} />
                    <Button
                        fullWidth
                        className={classes.button}
                        variant='contained'
                        color={loading ? 'default' : 'primary'}
                        size='large'
                        disabled={loading}
                        onClick={handleSubmit}>
                        Login
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        login: (data) => dispatch(login(data))
    }
};

const mapStateToProps = ({ auth }) => {
    return {
        loading: auth.loading,
        success: auth.success,
        errors: auth.errors
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
