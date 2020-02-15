import axios from 'axios';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

import {GET_ERRORS, LOGOUT_USER, SET_CURRENT_USER} from './types';

export const registerUser = (user) => dispatch => {
    axios.post('/api/register', user)
        .then(res => {
            dispatch(loginUser(user))
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const loginUser = (user) => dispatch => {
    axios.post('/api/login', user)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch({type: LOGOUT_USER});
};
