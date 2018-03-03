import { ORM } from 'redux-orm';

import Election from './election';
import Office from './office';
import Division from './division';
import Geometry from './geometry';
import Candidate from './candidate';
import Party from './party';
import APMeta from './apMeta';
import OverrideResult from './overrideResult';

const orm = new ORM();

orm.register(
  Election,
  Office,
  Division,
  Geometry,
  Candidate,
  Party,
  APMeta,
  OverrideResult,
);

export default orm;
