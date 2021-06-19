import {convertParam, del, get, patch, post} from '../utils/api';

export const FETCH_ALL_USER             = 'FETCH_ALL_USER';
export const FETCH_ALL_USER_SUCCESS     = 'FETCH_ALL_USER_SUCCESS';
export const FETCH_ALL_USER_FAILURE     = 'FETCH_ALL_USER_FAILURE';

export const FETCH_ONE_USER             = 'FETCH_ONE_USER';
export const FETCH_ONE_USER_SUCCESS     = 'FETCH_ONE_USER_SUCCESS';
export const FETCH_ONE_USER_FAILURE     = 'FETCH_ONE_USER_FAILURE';

export const CREATE_USER                = 'CREATE_USER';
export const CREATE_USER_SUCCESS        = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE        = 'CREATE_USER_FAILURE';

export const UPDATE_USER                = 'UPDATE_USER';
export const UPDATE_USER_SUCCESS        = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE        = 'UPDATE_USER_FAILURE';

export const DELETE_USER                = 'DELETE_USER';
export const DELETE_USER_SUCCESS        = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE        = 'DELETE_USER_FAILURE';

const fetchAllSuccess   = (payload) => ({ type: FETCH_ALL_USER_SUCCESS, payload });
const fetchAllFailure   = (payload) => ({ type: FETCH_ALL_USER_FAILURE, payload });

const fetchOneSuccess   = (payload) => ({ type: FETCH_ONE_USER_SUCCESS, payload });
const fetchOneFailure   = (payload) => ({ type: FETCH_ONE_USER_FAILURE, payload });

const createUserSuccess = (payload) => ({ type: CREATE_USER_SUCCESS, payload });
const createUserFailure = (payload) => ({ type: CREATE_USER_FAILURE, payload });

const updateUserSuccess = (payload) => ({ type: UPDATE_USER_SUCCESS, payload });
const updateUserFailure = (payload) => ({ type: UPDATE_USER_FAILURE, payload });

const deleteUserSuccess = (payload) => ({ type: DELETE_USER_SUCCESS, payload });
const deleteUserFailure = (payload) => ({ type: DELETE_USER_FAILURE, payload });

export const fetchAllUser = (data) => {
    return dispatch => {
        dispatch(({
            type: FETCH_ALL_USER
        }));

        const endpoint = `user${data ? '?' + convertParam(data) : ''}`;

        get(endpoint)
            .then(result => {
                const { data, current_page, last_page, total } = result.data.data;
                const payload = {
                    data,
                    pagination: {
                        current_page,
                        last_page,
                        total
                    }
                };

                dispatch(fetchAllSuccess(payload));
            })
            .catch(err => {
                dispatch(fetchAllFailure(err));
            });
    }
}

export const fetchOneUser = (id) => {
    return dispatch => {
        dispatch(({
            type: FETCH_ONE_USER
        }));

        get('user/' + id)
            .then(result => {
                if (result?.data?.status === 'success') {
                    dispatch(fetchOneSuccess(result.data.data));
                } else {
                    dispatch(fetchOneFailure('Something wrong! Please try again.'));
                }
            })
            .catch(err => {
                dispatch(fetchOneFailure(err));
            });
    }
}

export const createUser = (data) => {
    return dispatch => {
        dispatch(() => ({
            type: CREATE_USER
        }));

        post('user', data)
            .then(result => {
                if (result?.data?.status === 'success') {
                    dispatch(createUserSuccess(result.data.message));
                } else {
                    dispatch(createUserFailure(result.data.errors));
                }
            })
            .catch(err => {
                dispatch(createUserFailure('Something wrong! Please try again.'));
            });
    }
}

export const updateUser = (id, data) => {
    return dispatch => {
        dispatch(() => ({
            type: UPDATE_USER
        }));

        patch('user/' + id, data)
            .then(result => {
                if (result?.data?.status === 'success') {
                    dispatch(updateUserSuccess(result.data.message));
                } else {
                    dispatch(updateUserFailure(result.data.errors));
                }
            })
            .catch(err => {
                dispatch(updateUserFailure('Something wrong! Please try again.'));
            });
    }
}

export const deleteUser = (id) => {
    return dispatch => {
        dispatch(() => ({
            type: DELETE_USER
        }));

        del('user/' + id)
            .then(result => {
                if (result?.data?.status === 'success') {
                    dispatch(deleteUserSuccess(result.data.message));
                } else {
                    dispatch(deleteUserFailure(result.data.errors));
                }
            })
            .catch(err => {
                dispatch(deleteUserFailure('Something Wrong! Please try again.'));
            });
    }
}
