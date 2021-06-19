import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from "../actions/AuthAction";

const initialState = {
    loading: false,
    success: null,
    errors: null
};

export default function AuthReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loading: true
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload,
                errors: null
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        default:
            return {
                ...state
            };
    }
}
