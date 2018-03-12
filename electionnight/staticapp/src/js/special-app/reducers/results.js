import assign from 'lodash/assign';
import * as types from '../constants/actions';

export default(currentState, action) => {
  const initialState = {
    state: [],
    county: [],
    overrideState: [],
    overrideCounty: [],
  };

  if (typeof currentState === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case types.SET_STATE_RESULTS:
      return assign({}, currentState, {
        state: action.results,
      });
    case types.SET_COUNTY_RESULTS:
      return assign({}, currentState, {
        county: action.results,
      });
    case types.SET_OVERRIDE_STATE_RESULTS:
      return assign({}, currentState, {
        overrideState: action.results,
      });
    case types.SET_OVERRIDE_COUNTY_RESULTS:
      return assign({}, currentState, {
        overrideCounty: action.results,
      });
    default:
      break;
  }
  return currentState;
};