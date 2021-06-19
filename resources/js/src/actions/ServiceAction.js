import {convertParam, del, get, patch, post} from '../utils/api';

export const FETCH_ALL_SERVICE             = 'FETCH_ALL_SERVICE';
export const FETCH_ALL_SERVICE_SUCCESS     = 'FETCH_ALL_SERVICE_SUCCESS';
export const FETCH_ALL_SERVICE_FAILURE     = 'FETCH_ALL_SERVICE_FAILURE';

export const FETCH_ONE_SERVICE             = 'FETCH_ONE_SERVICE';
export const FETCH_ONE_SERVICE_SUCCESS     = 'FETCH_ONE_SERVICE_SUCCESS';
export const FETCH_ONE_SERVICE_FAILURE     = 'FETCH_ONE_SERVICE_FAILURE';

export const CREATE_SERVICE                = 'CREATE_SERVICE';
export const CREATE_SERVICE_SUCCESS        = 'CREATE_SERVICE_SUCCESS';
export const CREATE_SERVICE_FAILURE        = 'CREATE_SERVICE_FAILURE';

export const UPDATE_SERVICE                = 'UPDATE_SERVICE';
export const UPDATE_SERVICE_SUCCESS        = 'UPDATE_SERVICE_SUCCESS';
export const UPDATE_SERVICE_FAILURE        = 'UPDATE_SERVICE_FAILURE';

export const DELETE_SERVICE                = 'DELETE_SERVICE';
export const DELETE_SERVICE_SUCCESS        = 'DELETE_SERVICE_SUCCESS';
export const DELETE_SERVICE_FAILURE        = 'DELETE_SERVICE_FAILURE';

const fetchAllSuccess   = (payload) => ({ type: FETCH_ALL_SERVICE_SUCCESS, payload });
const fetchAllFailure   = (payload) => ({ type: FETCH_ALL_SERVICE_FAILURE, payload });

const fetchOne          = () => ({ type: FETCH_ONE_SERVICE });
const fetchOneSuccess   = (payload) => ({ type: FETCH_ONE_SERVICE_SUCCESS, payload });
const fetchOneFailure   = (payload) => ({ type: FETCH_ONE_SERVICE_FAILURE, payload });

const createSuccess = (payload) => ({ type: CREATE_SERVICE_SUCCESS, payload });
const createFailure = (payload) => ({ type: CREATE_SERVICE_FAILURE, payload });

const updateSuccess = (payload) => ({ type: UPDATE_SERVICE_SUCCESS, payload });
const updateFailure = (payload) => ({ type: UPDATE_SERVICE_FAILURE, payload });

const deleteSuccess = (payload) => ({ type: DELETE_SERVICE_SUCCESS, payload });
const deleteFailure = (payload) => ({ type: DELETE_SERVICE_FAILURE, payload });

export const fetchAllServices = (data) => {
    return dispatch => {
        dispatch(({
            type: FETCH_ALL_SERVICE
        }));

        const endpoint = `service${data ? '?' + convertParam(data) : ''}`;

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
                dispatch(fetchAllFailure('Something wrong! Please try again.'));
            });
    }
}

export const fetchOneService = (id) => {
    return dispatch => {
        dispatch(fetchOne());

        get('service/' + id)
            .then(result => {
                dispatch(fetchOneSuccess(result.data.data));
            })
            .catch(err => {
                dispatch(fetchOneFailure('Something wrong! Please try again.'));
            });
    }
}

export const createService = (data) => {
    return dispatch => {
        dispatch(() => ({
            type: CREATE_SERVICE
        }));

        post('service', data)
            .then(result => {
                if (result?.data?.status === 'success') {
                    dispatch(createSuccess(result.data.message));
                } else {
                    dispatch(createFailure(result.data.errors));
                }
            })
            .catch(err => {
                dispatch(createFailure('Something wrong! Please try again.'));
            });
    }
}

export const updateService = (id, data) => {
    return dispatch => {
        dispatch(() => ({
            type: UPDATE_SERVICE
        }));

        patch('service/' + id, data)
            .then(result => {
                if (result?.data?.status === 'success') {
                    dispatch(updateSuccess(result.data.message));
                } else {
                    dispatch(updateFailure(result.data.errors));
                }
            })
            .catch(err => {
                dispatch(updateFailure('Something wrong! Please try again.'));
            });
    }
}

export const deleteService = (id) => {
    return dispatch => {
        dispatch(() => ({
            type: DELETE_SERVICE
        }));

        del('service/' + id)
            .then(result => {
                if (result?.data?.status === 'success') {
                    dispatch(deleteSuccess(result.data.message));
                } else {
                    dispatch(deleteFailure(result.data.errors));
                }
            })
            .catch(err => {
                dispatch(deleteFailure('Something wrong! Please try again.'));
            });
    }
}
