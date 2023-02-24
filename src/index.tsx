import { Provider } from 'react-redux';
import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import { store } from './store';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  rootElement
);
