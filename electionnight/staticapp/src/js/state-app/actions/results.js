import * as types from '../constants/actions';

export const setStateResults = results => ({
  type: types.SET_STATE_RESULTS,
  results,
});

export const setCountyResults = results => ({
  type: types.SET_COUNTY_RESULTS,
  results,
});

export const setOverrideStateResults = results => ({
  type: types.SET_OVERRIDE_STATE_RESULTS,
  results,
});

export const setOverrideCountyResults = results => ({
  type: types.SET_OVERRIDE_COUNTY_RESULTS,
  results,
});