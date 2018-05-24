import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme  } from '@material-ui/core/styles';

import configureStore from '../redux/configureStore';
import rootSaga from './redux/sagas';
import rootReducers from './redux/reducer';
import Main from './Main';

const theme = createMuiTheme();

/* The if statement is required so as to Render the component on pages that have a div with an ID of "root"; */
if (document.getElementById('root')) {
    const initialState = {};
    const store = configureStore(initialState, rootReducers, rootSaga);
    ReactDOM.render(
        (<MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <Main
                    wrappedComponetRef={(main) => {ReactInstances.main = main;} }
                />
            </Provider>
        </MuiThemeProvider>),
        document.getElementById('root')
    );
}