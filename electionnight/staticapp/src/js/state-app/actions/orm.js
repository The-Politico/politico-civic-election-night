import * as types from '../constants/actions';

export const createDivisions = divisions => ({
  type: types.CREATE_DIVISIONS,
  divisions,
});

export const createElections = elections => ({
  type: types.CREATE_ELECTIONS,
  elections,
});

export const createOffices = offices => ({
  type: types.CREATE_OFFICES,
  offices,
});

export const createApMetadata = apMetadata => ({
  type: types.CREATE_APMETADATA,
  apMetadata,
});

export const createParties = parties => ({
  type: types.CREATE_PARTIES,
  parties,
});

export const createCandidates = candidates => ({
  type: types.CREATE_CANDIDATES,
  candidates,
});

export const createGeometry = (geometry) => ({
  type: types.CREATE_GEOMETRY,
  geometry,
});

export const createOverrideResult = overrideResult => ({
  type: types.CREATE_OVERRIDE_RESULT,
  overrideResult,
});
