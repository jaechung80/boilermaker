import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <div>Test Test Test!</div>
  </Provider>,
  document.getElementById('app')
);
