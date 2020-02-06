import {GET_ERRORS, SET_CURRENT_USER} from "../actions/types";

const initialState = {
    isAuth: false,
    errors: {}
};

export default function ( state = initialState, action ) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return { ...state, isAuth: action.payload };
        case GET_ERRORS:
            return { ...state, errors: action.payload };
        default:
            return state;
    }
}
