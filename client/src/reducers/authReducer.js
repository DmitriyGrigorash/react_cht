import {GET_ERRORS, SET_CURRENT_USER, LOGOUT_USER} from "../actions/types";

const initialState = {
    isAuthenticated: false,
    user: {},
    errors: ''
};

export default function ( state = initialState, action ) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            };
        case LOGOUT_USER:
            return {
                isAuthenticated: false,
                user: {}
            };
        case GET_ERRORS:
            return { ...state, errors: action.payload, isAuthenticated: false };
        default:
            return state;
    }
}
