import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { createMuiTheme } from '@material-ui/core/styles';
import {ThemeProvider} from "@material-ui/styles";

import App from "./components/App";
import configureStore from './store/configureStore';
import setAuthToken from "./setAuthToken";
import {logoutUser, setCurrentUser} from "./actions/user";

const store = configureStore();


if(localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = '/login'
    }
}

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1E6BB8',
        },
        secondary: {
            main: '#00D3AB',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
});

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
);
