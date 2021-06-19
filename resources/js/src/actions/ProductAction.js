import {convertParam, del, get, patch, post} from '../utils/api';

export const FETCH_ALL_PRODUCT             = 'FETCH_ALL_PRODUCT';
export const FETCH_ALL_PRODUCT_SUCCESS     = 'FETCH_ALL_PRODUCT_SUCCESS';
export const FETCH_ALL_PRODUCT_FAILURE     = 'FETCH_ALL_PRODUCT_FAILURE';

export const FETCH_ONE_PRODUCT             = 'FETCH_ONE_PRODUCT';
export const FETCH_ONE_PRODUCT_SUCCESS     = 'FETCH_ONE_PRODUCT_SUCCESS';
export const FETCH_ONE_PRODUCT_FAILURE     = 'FETCH_ONE_PRODUCT_FAILURE';

export const CREATE_PRODUCT                = 'CREATE_PRODUCT';
export const CREATE_PRODUCT_SUCCESS        = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_FAILURE        = 'CREATE_PRODUCT_FAILURE';

export const UPDATE_PRODUCT                = 'UPDATE_PRODUCT';
export const UPDATE_PRODUCT_SUCCESS        = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_FAILURE        = 'UPDATE_PRODUCT_FAILURE';

export const DELETE_PRODUCT                = 'DELETE_PRODUCT';
export const DELETE_PRODUCT_SUCCESS        = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE        = 'DELETE_PRODUCT_FAILURE';

const fetchAllSuccess   = (payload) => ({ type: FETCH_ALL_PRODUCT_SUCCESS, payload });
const fetchAllFailure   = (payload) => ({ type: FETCH_ALL_PRODUCT_FAILURE, payload });

const fetchOne          = () => ({ type: FETCH_ONE_PRODUCT });
const fetchOneSuccess   = (payload) => ({ type: FETCH_ONE_PRODUCT_SUCCESS, payload });
const fetchOneFailure   = (payload) => ({ type: FETCH_ONE_PRODUCT_FAILURE, payload });

const createSuccess = (payload) => ({ type: CREATE_PRODUCT_SUCCESS, payload });
const createFailure = (payload) => ({ type: CREATE_PRODUCT_FAILURE, payload });

const updateSuccess = (payload) => ({ type: UPDATE_PRODUCT_SUCCESS, payload });
const updateFailure = (payload) => ({ type: UPDATE_PRODUCT_FAILURE, payload });

const deleteSuccess = (payload) => ({ type: DELETE_PRODUCT_SUCCESS, payload });
const deleteFailure = (payload) => ({ type: DELETE_PRODUCT_FAILURE, payload });

export const fetchAllProducts = (data) => {
    return dispatch => {
        dispatch(({
            type: FETCH_ALL_PRODUCT
        }));

        const endpoint = `product${data ? '?' + convertParam(data) : ''}`;

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

export const fetchOneProduct = (id) => {
    return dispatch => {
        dispatch(fetchOne());

        get('product/' + id)
            .then(result => {
                dispatch(fetchOneSuccess(result.data.data));
            })
            .catch(err => {
                dispatch(fetchOneFailure('Something wrong! Please try again.'));
            });
    }
}

export const createProduct = (data) => {
    return dispatch => {
        dispatch(() => ({
            type: CREATE_PRODUCT
        }));

        post('product', data)
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

export const updateProduct = (id, data) => {
    return dispatch => {
        dispatch(() => ({
            type: UPDATE_PRODUCT
        }));

        patch('product/' + id, data)
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

export const deleteProduct = (id) => {
    return dispatch => {
        dispatch(() => ({
            type: DELETE_PRODUCT
        }));

        del('product/' + id)
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
