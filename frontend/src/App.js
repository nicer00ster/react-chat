import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import multi from 'redux-multi';
import pink from '@material-ui/core/colors/pink';
import teal from '@material-ui/core/colors/teal';
import createSagaMiddleware from 'redux-saga';

import setupSocket from './sockets';
import rootReducer from './reducers';
import rootSaga from './sagas';
import Root from './Root';
import { connectSocket } from '../../config';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware, multi),
  ));

const socket = setupSocket(store.dispatch, connectSocket);

sagaMiddleware.run(rootSaga, { socket, dispatch: store.dispatch });

const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: teal,
  },
  status: {
    danger: 'orange',
  },
});

export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <Root />
        </Provider>
      </MuiThemeProvider>
    );
  }
}
