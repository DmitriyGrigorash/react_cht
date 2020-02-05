import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';

const configureStore = (initialState = {}) => {
    const middleware = [thunk];
    const enhancers = [];
    const store = createStore(reducers, initialState, compose(applyMiddleware(...middleware), ...enhancers));
    return store;
};

export default configureStore;
