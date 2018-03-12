import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './special-app/containers/App';
import store from './special-app/stores/';

import 'politico-style/scss/elections/states/main.scss';
import 'SCSS/main.scss';

const SpecialApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

render(
  <SpecialApp />,
  document.getElementById('app'),
);
