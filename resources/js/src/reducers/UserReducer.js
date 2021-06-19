import {
    CREATE_USER, CREATE_USER_FAILURE, CREATE_USER_SUCCESS, DELETE_USER, DELETE_USER_FAILURE, DELETE_USER_SUCCESS,
    FETCH_ALL_USER,
    FETCH_ALL_USER_FAILURE,
    FETCH_ALL_USER_SUCCESS,
    FETCH_ONE_USER, FETCH_ONE_USER_FAILURE,
    FETCH_ONE_USER_SUCCESS, UPDATE_USER, UPDATE_USER_FAILURE, UPDATE_USER_SUCCESS
} from "../actions/UserAction";

const initialState = {
    fetchLoading: false,
    fetchOneLoading: false,
    submitLoading: false,

    users: [],
    pagination: {},
    oneUser: {},
    submitSuccess: null,

    fetchErrors: null,
    fetchOneErrors: null,
    submitErrors: null
};

export default function UserReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ALL_USER:
            return {
                ...state,
                fetchLoading: true,
                submitSuccess: null,

                fetchErrors: null,
                fetchOneErrors: null,
                submitErrors: null
            };
        case FETCH_ALL_USER_SUCCESS:
            return {
                ...state,
                fetchLoading: false,
                users: action.payload.data,
                pagination: action.payload.pagination
            };
        case FETCH_ALL_USER_FAILURE:
            return {
                ...state,
                fetchLoading: false,
                fetchErrors: action.payload
            };

        case FETCH_ONE_USER:
            return {
                ...state,
                fetchOneLoading: true,
                oneUser: action.payload
            };
        case FETCH_ONE_USER_SUCCESS:
            return {
                ...state,
                fetchOneLoading: false,
                oneUser: action.payload
            };
        case FETCH_ONE_USER_FAILURE:
            return {
                ...state,
                fetchOneLoading: false,
                fetchOneErrors: action.payload
            };

        case CREATE_USER:
            return {
                ...state,
                submitLoading: true
            };
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                submitLoading: false,
                submitSuccess: action.payload
            };
        case CREATE_USER_FAILURE:
            return {
                ...state,
                submitLoading: false,
                submitErrors: action.payload
            };

        case UPDATE_USER:
            return {
                ...state,
                submitLoading: true
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                submitLoading: false,
                submitSuccess: action.payload
            };
        case UPDATE_USER_FAILURE:
            return {
                ...state,
                submitLoading: false,
                submitErrors: action.payload
            };

        case DELETE_USER:
            return {
                ...state,
                submitLoading: true
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                submitLoading: false,
                submitSuccess: action.payload
            };
        case DELETE_USER_FAILURE:
            return {
                ...state,
                submitLoading: false,
                submitErrors: action.payload
            };

        default:
            return state;
    }
}
