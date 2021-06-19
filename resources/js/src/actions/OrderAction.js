import {convertParam, del, get, patch, post} from '../utils/api';

export const FETCH_ALL_ORDER             = 'FETCH_ALL_ORDER';
export const FETCH_ALL_ORDER_SUCCESS     = 'FETCH_ALL_ORDER_SUCCESS';
export const FETCH_ALL_ORDER_FAILURE     = 'FETCH_ALL_ORDER_FAILURE';

export const FETCH_ONE_ORDER             = 'FETCH_ONE_ORDER';
export const FETCH_ONE_ORDER_SUCCESS     = 'FETCH_ONE_ORDER_SUCCESS';
export const FETCH_ONE_ORDER_FAILURE     = 'FETCH_ONE_ORDER_FAILURE';

export const CREATE_ORDER                = 'CREATE_ORDER';
export const CREATE_ORDER_SUCCESS        = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE        = 'CREATE_ORDER_FAILURE';

export const UPDATE_ORDER                = 'UPDATE_ORDER';
export const UPDATE_ORDER_SUCCESS        = 'UPDATE_ORDER_SUCCESS';
export const UPDATE_ORDER_FAILURE        = 'UPDATE_ORDER_FAILURE';

export const DELETE_ORDER                = 'DELETE_ORDER';
export const DELETE_ORDER_SUCCESS        = 'DELETE_ORDER_SUCCESS';
export const DELETE_ORDER_FAILURE        = 'DELETE_ORDER_FAILURE';

const fetchAllSuccess   = (payload) => ({ type: FETCH_ALL_ORDER_SUCCESS, payload });
const fetchAllFailure   = (payload) => ({ type: FETCH_ALL_ORDER_FAILURE, payload });

const fetchOne          = () => ({ type: FETCH_ONE_ORDER });
const fetchOneSuccess   = (payload) => ({ type: FETCH_ONE_ORDER_SUCCESS, payload });
const fetchOneFailure   = (payload) => ({ type: FETCH_ONE_ORDER_FAILURE, payload });

const createSuccess = (payload) => ({ type: CREATE_ORDER_SUCCESS, payload });
const createFailure = (payload) => ({ type: CREATE_ORDER_FAILURE, payload });

const updateSuccess = (payload) => ({ type: UPDATE_ORDER_SUCCESS, payload });
const updateFailure = (payload) => ({ type: UPDATE_ORDER_FAILURE, payload });

const deleteSuccess = (payload) => ({ type: DELETE_ORDER_SUCCESS, payload });
const deleteFailure = (payload) => ({ type: DELETE_ORDER_FAILURE, payload });

export const fetchAllOrders = (data) => {
    return dispatch => {
        dispatch(({
            type: FETCH_ALL_ORDER
        }));

        const endpoint = `/order${data ? '?' + convertParam(data) : ''}`;

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

export const fetchOneOrder = (id) => {
    return dispatch => {
        dispatch(fetchOne());

        get('order/' + id)
            .then(result => {
                dispatch(fetchOneSuccess(result.data));
            })
            .catch(err => {
                dispatch(fetchOneFailure(err));
            });
    }
}

export const createOrder = (data) => {
    return dispatch => {
        dispatch(() => ({
            type: CREATE_ORDER
        }));

        post('order', data)
            .then(result => {
                if (result?.data?.status === 'success') {
                    dispatch(createSuccess(result.data));
                } else {
                    dispatch(createFailure(result.data.errors));
                }
            })
            .catch(err => {
                dispatch(createFailure(err));
            });
    }
}

export const updateOrder = (id, data) => {
    return dispatch => {
        dispatch(() => ({
            type: UPDATE_ORDER
        }));

        patch('order/' + id, data)
            .then(result => {
                if (result?.data?.status === 'success') {
                    dispatch(updateSuccess(result.data));
                } else {
                    dispatch(updateFailure(result.data.errors));
                }
            })
            .catch(err => {
                dispatch(updateFailure(err));
            });
    }
}

export const deleteOrder = (id) => {
    return dispatch => {
        dispatch(() => ({
            type: DELETE_ORDER
        }));

        del('order/' + id)
            .then(result => {
                if (result?.data?.status === 'success') {
                    dispatch(deleteSuccess(result.data));
                } else {
                    dispatch(deleteFailure(result.data.errors));
                }
            })
            .catch(err => {
                dispatch(deleteFailure(err));
            });
    }
}
