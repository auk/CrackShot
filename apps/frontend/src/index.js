import 'babel-polyfill';
import 'react-app-polyfill/ie9';
import 'url-search-params-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr'

import configureStore from './store/configureStore';
import App from './containers/app/App';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import 'animate.css/animate.min.css';
import './assets/styles/inspinia/style.css';
import './assets/styles/fonts.css';
import './index.css';

import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';
import ru from 'react-intl/locale-data/ru';

addLocaleData([...en, ...de, ...ru]);

const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
    <ReduxToastr
        position="bottom-right"
        timeOut={3000}
        closeButton={true}
        showDuration={0}
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        className='inspinia'
      />
  </Provider>,
  document.getElementById('root')
);