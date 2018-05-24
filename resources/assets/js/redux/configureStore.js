import { createStore, applyMiddleware, compose, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';

export default function configureStore(initialState = {}, initialReducers, sagas) {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [
        sagaMiddleware,
    ];

    const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                shouldHotReload: false,
            }) : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(...middlewares)
    );

    const store = createStore(combineReducers(initialReducers), initialState, enhancer);
    sagaMiddleware.run(sagas);
    store.reducers = initialReducers;

    return store;
}