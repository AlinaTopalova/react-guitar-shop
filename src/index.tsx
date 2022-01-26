import React from 'react';
import ReactDOM from 'react-dom';
import {Router as BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import App from 'components/app/app';
import { store } from 'store';
import { browserHistory } from 'browser-history';
import ScrollToTop from 'components/scrollTop/scrollTop';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter history={browserHistory}>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
