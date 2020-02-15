import {GET_MESSAGES, MESSAGES_ERROR} from "../actions/types";

const initialState = {
    messages: [],
    errors: ''
};

export default function ( state = initialState, action ) {
    switch (action.type) {
        case GET_MESSAGES:
            return {
                messages: action.payload,
            };
        case MESSAGES_ERROR:
            return { ...state, errors: action.payload };
        default:
            return state;
    }
}
