import {
    CREATE_SERVICE, CREATE_SERVICE_FAILURE, CREATE_SERVICE_SUCCESS, DELETE_SERVICE, DELETE_SERVICE_FAILURE, DELETE_SERVICE_SUCCESS,
    FETCH_ALL_SERVICE,
    FETCH_ALL_SERVICE_FAILURE,
    FETCH_ALL_SERVICE_SUCCESS,
    FETCH_ONE_SERVICE, FETCH_ONE_SERVICE_FAILURE,
    FETCH_ONE_SERVICE_SUCCESS, UPDATE_SERVICE, UPDATE_SERVICE_FAILURE, UPDATE_SERVICE_SUCCESS
} from "../actions/ServiceAction";

const initialState = {
    fetchLoading: false,
    fetchOneLoading: false,
    submitLoading: false,

    services: [],
    pagination: {},
    oneService: {},
    submitSuccess: null,

    fetchErrors: null,
    fetchOneErrors: null,
    submitErrors: null
};

export default function ServiceReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ALL_SERVICE:
            return {
                ...state,
                fetchLoading: true,
                submitSuccess: null,
                oneService: {},

                fetchErrors: null,
                fetchOneErrors: null,
                submitErrors: null
            };
        case FETCH_ALL_SERVICE_SUCCESS:
            return {
                ...state,
                fetchLoading: false,
                services: action.payload.data,
                pagination: action.payload.pagination
            };
        case FETCH_ALL_SERVICE_FAILURE:
            return {
                ...state,
                fetchLoading: false,
                fetchErrors: action.payload
            };

        case FETCH_ONE_SERVICE:
            return {
                ...state,
                fetchOneLoading: true,
                oneService: action.payload
            };
        case FETCH_ONE_SERVICE_SUCCESS:
            return {
                ...state,
                fetchOneLoading: false,
                oneService: action.payload
            };
        case FETCH_ONE_SERVICE_FAILURE:
            return {
                ...state,
                fetchOneLoading: false,
                fetchOneErrors: action.payload
            };

        case CREATE_SERVICE:
            return {
                ...state,
                submitLoading: true
            };
        case CREATE_SERVICE_SUCCESS:
            return {
                ...state,
                submitLoading: false,
                submitSuccess: action.payload
            };
        case CREATE_SERVICE_FAILURE:
            return {
                ...state,
                submitLoading: false,
                submitErrors: action.payload
            };

        case UPDATE_SERVICE:
            return {
                ...state,
                submitLoading: true
            };
        case UPDATE_SERVICE_SUCCESS:
            return {
                ...state,
                submitLoading: false,
                submitSuccess: action.payload
            };
        case UPDATE_SERVICE_FAILURE:
            return {
                ...state,
                submitLoading: false,
                submitErrors: action.payload
            };

        case DELETE_SERVICE:
            return {
                ...state,
                submitLoading: true
            };
        case DELETE_SERVICE_SUCCESS:
            return {
                ...state,
                submitLoading: false,
                submitSuccess: action.payload
            };
        case DELETE_SERVICE_FAILURE:
            return {
                ...state,
                submitLoading: false,
                submitErrors: action.payload
            };

        default:
            return state;
    }
}
