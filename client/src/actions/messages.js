import axios from 'axios';
import {MESSAGES_ERROR, SEND_MESSAGE, GET_MESSAGES} from "./types";


export const sendMessage = (message) => async dispatch => {
    await axios.post('/api/message', message)
        .then(res => {
            dispatch({
                type: SEND_MESSAGE,
                payload: message
            })
        })
        .catch(err => {
            dispatch({
                type: MESSAGES_ERROR,
                payload: err.response.data
            });
        });
};

export const getMessages = () => async dispatch => {
    await axios.get('/api/messages')
        .then(res => {
            console.log('### res', res.data);
            dispatch({
                type: GET_MESSAGES,
                payload: res.body
            })
        })
        .catch(err => {
            dispatch({
                type: MESSAGES_ERROR,
                payload: err.response.data
            });
        });
};
