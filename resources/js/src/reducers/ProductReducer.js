import {
    CREATE_PRODUCT, CREATE_PRODUCT_FAILURE, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_SUCCESS,
    FETCH_ALL_PRODUCT,
    FETCH_ALL_PRODUCT_FAILURE,
    FETCH_ALL_PRODUCT_SUCCESS,
    FETCH_ONE_PRODUCT, FETCH_ONE_PRODUCT_FAILURE,
    FETCH_ONE_PRODUCT_SUCCESS, UPDATE_PRODUCT, UPDATE_PRODUCT_FAILURE, UPDATE_PRODUCT_SUCCESS
} from "../actions/ProductAction";

const initialState = {
    fetchLoading: false,
    fetchOneLoading: false,
    submitLoading: false,

    products: [],
    pagination: {},
    oneProduct: {},
    submitSuccess: null,

    fetchErrors: null,
    fetchOneErrors: null,
    submitErrors: null
};

export default function ProductReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ALL_PRODUCT:
            return {
                ...state,
                fetchLoading: true,
                submitSuccess: null,
                oneProduct: {},

                fetchErrors: null,
                fetchOneErrors: null,
                submitErrors: null
            };
        case FETCH_ALL_PRODUCT_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                fetchLoading: false,
                products: action.payload.data,
                pagination: action.payload.pagination
            };
        case FETCH_ALL_PRODUCT_FAILURE:
            return {
                ...state,
                fetchLoading: false,
                fetchErrors: action.payload
            };

        case FETCH_ONE_PRODUCT:
            return {
                ...state,
                fetchOneLoading: true
            };
        case FETCH_ONE_PRODUCT_SUCCESS:
            return {
                ...state,
                fetchOneLoading: false,
                oneProduct: action.payload
            };
        case FETCH_ONE_PRODUCT_FAILURE:
            return {
                ...state,
                fetchOneLoading: false,
                fetchOneErrors: action.payload
            };

        case CREATE_PRODUCT:
            return {
                ...state,
                submitLoading: true
            };
        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                submitLoading: false,
                submitSuccess: action.payload
            };
        case CREATE_PRODUCT_FAILURE:
            return {
                ...state,
                submitLoading: false,
                submitErrors: action.payload
            };

        case UPDATE_PRODUCT:
            return {
                ...state,
                submitLoading: true
            };
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                submitLoading: false,
                submitSuccess: action.payload
            };
        case UPDATE_PRODUCT_FAILURE:
            return {
                ...state,
                submitLoading: false,
                submitErrors: action.payload
            };

        case DELETE_PRODUCT:
            return {
                ...state,
                submitLoading: true
            };
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                submitLoading: false,
                submitSuccess: action.payload
            };
        case DELETE_PRODUCT_FAILURE:
            return {
                ...state,
                submitLoading: false,
                submitErrors: action.payload
            };

        default:
            return state;
    }
}
