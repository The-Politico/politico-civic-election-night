import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './state-app/containers/App';
import store from './state-app/stores/';

import 'politico-style/scss/elections/states/main.scss';
import 'SCSS/main.scss';

const StateApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

render(
  <StateApp />,
  document.getElementById('app'),
);
