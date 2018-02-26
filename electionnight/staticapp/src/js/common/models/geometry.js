import { fk, attr, Model } from 'redux-orm';

class Geometry extends Model {
  serialize () {
    return this.ref;
  }

  static get fields () {
    return {
      id: attr(),
      level: attr(),
      division: fk('Division'),
      topojson: attr(),
    };
  }
}

Geometry.modelName = 'Geometry';

export default Geometry;
