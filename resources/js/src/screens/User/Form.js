import React, {useEffect, useRef, useState} from "react";
import {useParams} from 'react-router-dom';
import AdminLayout from "../../components/AdminLayout";
import Title from "../../components/Title";
import {Button, Card, CardContent, Grid, MenuItem} from "@material-ui/core";
import CustomTextField from "../../components/CustomTextField";
import CustomSelectField from "../../components/CustomSelectField";
import {connect} from "react-redux";
import {createUser, fetchOneUser, updateUser} from "../../actions/UserAction";
import AlertMessage from "../../components/AlertMessage";
import Spinner from "../../components/Spinner";

const ROLE = {
    EMPLOYEE: 'Employee',
    ADMIN: 'Admin'
};

function FormUserScreen(props) {
    const { id } = useParams();
    const { history, fetch, user, create, update, loading, submitLoading, success, errors } = props;
    const [form, setForm] = useState({
        role: ROLE.EMPLOYEE
    });
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
         if (!form.id && user?.id) {
             setForm(user);
         }
    }, [form, user]);

    useEffect(() => {
        if (success) {
            setForm({
                role: ROLE.EMPLOYEE
            });
            history.push('/user');
        }
    }, [success, history]);

    const handleChangeForm = ({ target }) => {
        if (target.name) {
            setForm({
                ...form,
                [target.name]: target.value
            });
        }
    };

    const handleSubmit = () => {
        if (id) {
            update(id, form)
        } else {
            create(form);
        }
    };

    return (
        <AdminLayout history={history}>
            <Title title={id ? 'Update User' : 'Create User'} actionBack={() => history.goBack()}/>

            {errors && (
                <AlertMessage severity='error' messages={errors}/>
            )}

            {loading ? (
                <Spinner/>
            ) : (
                <Card>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item lg={6} sm={12} xs={12}>
                                <CustomTextField
                                    label='Fullname'
                                    placeholder='User fullname'
                                    name='name'
                                    value={form.name ?? ''}
                                    onChange={handleChangeForm}/>
                            </Grid>
                            <Grid item lg={6} sm={12} xs={12}>
                                <CustomTextField
                                    label='Email Address'
                                    placeholder='User email address'
                                    name='email'
                                    value={form.email ?? ''}
                                    onChange={handleChangeForm}/>
                            </Grid>
                            <Grid item lg={6} sm={12} xs={12}>
                                <CustomTextField
                                    label='Username'
                                    placeholder='Username'
                                    name='username'
                                    value={form.username ?? ''}
                                    onChange={handleChangeForm}/>
                            </Grid>
                            <Grid item lg={6} sm={12} xs={12}>
                                <CustomSelectField
                                    label='Role'
                                    name='role'
                                    value={form.role ?? ROLE.EMPLOYEE}
                                    onChange={handleChangeForm}>
                                    {Object.keys(ROLE).map(i => (
                                        <MenuItem key={i} value={ROLE[i]}>{ROLE[i]}</MenuItem>
                                    ))}
                                </CustomSelectField>
                            </Grid>
                            <Grid item lg={6} sm={12} xs={12}>
                                <CustomTextField
                                    label='Password'
                                    placeholder='User password'
                                    name='password'
                                    value={form.password ?? ''}
                                    onChange={handleChangeForm}
                                    type='password'
                                    helperText={id && 'Leave it empty if do not want to change password'}/>
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
                    </CardContent>
                </Card>
            )}
        </AdminLayout>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetch: (id) => dispatch(fetchOneUser(id)),
        create: (data) => dispatch(createUser(data)),
        update: (id, data) => dispatch(updateUser(id, data))
    }
};

const mapStateToProps = ({ user }) => {
    return {
        loading: user.fetchOneLoading,
        user: user.oneUser,
        submitLoading: user.submitLoading,
        errors: user.submitErrors,
        success: user.submitSuccess
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FormUserScreen);
