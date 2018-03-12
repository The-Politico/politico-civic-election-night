import * as types from '../constants/actions';
import orm from '../../common/models/';

export default(dbState, action) => {
  if (typeof dbState === 'undefined') {
    return orm.getEmptyState();
  }

  const session = orm.session(dbState);
  const {
    Division,
    Geometry,
    Office,
    APMeta,
    Party,
    Candidate,
    Election,
    OverrideResult,
  } = session;

  switch (action.type) {
    case types.CREATE_DIVISIONS:
      action.divisions.map(division => Division.upsert(division));
      break;
    case types.CREATE_OFFICES:
      action.offices.map(office => Office.upsert(office));
      break;
    case types.CREATE_APMETADATA:
      action.apMetadata.map(meta => APMeta.upsert(meta));
      break;
    case types.CREATE_PARTIES:
      action.parties.map(party => Party.upsert(party));
      break;
    case types.CREATE_CANDIDATES:
      action.candidates.map(candidate => Candidate.upsert(candidate));
      break;
    case types.CREATE_ELECTIONS:
      action.elections.map(election => Election.upsert(election));
      break;
    case types.CREATE_GEOMETRY:
      Geometry.upsert(action.geometry);
      break;
    case types.CREATE_OVERRIDE_RESULT:
      OverrideResult.upsert(action.overrideResult);
      break;
    default:
      break;
  }
  return session.state;
};
