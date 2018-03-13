import assign from 'lodash/assign';
import * as apiActions from './api';
import * as contentActions from './content';
import * as ormActions from './orm';
import * as fetchActions from './fetch';
import * as resultsActions from './results';

const actions = assign(
  {},
  apiActions,
  contentActions,
  ormActions,
  fetchActions,
  resultsActions,
);

export default actions;
