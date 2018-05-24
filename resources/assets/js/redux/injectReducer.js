import { combineReducers } from 'redux';

function injectReducer(store, key, reducer) {
    if (!(typeof key === 'string' && key !== '' && typeof reducer === 'function')) {
        return;
    }

    if (key in store.reducers && store.reducers[key] === reducer) {
        return;
    }

    store.reducers[key] = reducer;
    store.replaceReducer(combineReducers(store.reducers));
}

export default injectReducer;