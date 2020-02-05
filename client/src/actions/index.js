import axios from 'axios';
import {
    FETCH_USER,
    FETCH_USER_ERROR,
    SUBMIT_SURVEY,
    SUBMIT_SURVEY_ERROR,
} from './types';

/* redux-thunk middleware using. Нам не нужен вызов метода стора dispatch до тех пор, пока наш axios request
    * не вернет ответ от сервера, а только потом мы вызываем method dispatch! Так происходит, когда в action мы
    * возвращаем не объект с типом экшена и данными, а функцию. И вот в неё автоматически передается аргументом метод
    * dispatch. Это благодаря использованию applyMiddleware при создании стора и инициализации приложения! */

export const fetchUser = () => async dispatch => {
    await axios.get('/api/current_user')
        .then(res => dispatch(
            {
                type: FETCH_USER,
                payload: !res.data || res.data === '' ? false : res.data
            }
        ),rej => dispatch({type: FETCH_USER_ERROR, payload: rej}))
};

export const handleToken = (token) => async dispatch => {
    await fetch("/api/stripe", {
        method: "POST",
        headers: {"Content-Type": "text/plain"},
        body: token
    })
    .then(res => res.json())
    .then(res => dispatch({type: FETCH_USER, payload: res}),
          rej => dispatch({type: FETCH_USER_ERROR, payload: rej}));
};

export const submitSurvey = (formData) => async dispatch => {
    await fetch("/api/surveys", {
        method: "POST",
        headers: {"Content-Type": "text/plain"},
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(res => dispatch({type: SUBMIT_SURVEY, payload: res}),
          rej => dispatch({type: SUBMIT_SURVEY_ERROR, payload: rej}));
};

// export const fetchSurveys = () => async dispatch => {
//     await axios.get('/api/surveys')
//         .then(res => dispatch(
//             { type: FETCH_SURVEYS, payload: res.data }
//         ),
//         rej => dispatch({type: FETCH_SURVEYS_ERROR, payload: rej}))
// };
