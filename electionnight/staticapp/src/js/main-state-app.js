import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import Dateline from 'dateline';
import App from './state-app/containers/App';
import store from './state-app/stores/';

import 'politico-style/scss/base/main.scss';
import '../scss/main.scss';

const StateApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

render(
  <StateApp />,
  document.getElementById('app'),
);
