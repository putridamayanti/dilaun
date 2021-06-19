import {post} from "../utils/api";
import {CREATE_USER} from "./UserAction";

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

const loginSuccess = (payload) => ({ type: LOGIN_SUCCESS, payload });
const loginFailure = (payload) => ({ type: LOGIN_FAILURE, payload });

export const login = (data) => {
    return dispatch => {
        dispatch(() => ({
            type: CREATE_USER
        }));

        post('login', data)
            .then(result => {
                if (result?.data?.status === 'success') {
                    const { token, user_id, message } = result.data.data;

                    localStorage.setItem('dilaun_token', token);
                    localStorage.setItem('dilaun_user', user_id);

                    dispatch(loginSuccess(message));
                } else {
                    dispatch(loginFailure(result.data.errors));
                }
            })
            .catch(err => {
                dispatch(loginFailure('Something Wrong! Please try again.'));
            });
    }
}
