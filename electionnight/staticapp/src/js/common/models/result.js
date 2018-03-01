import { fk, attr, Model } from 'redux-orm';

class Result extends Model {
  serialize () {
    return this.ref;
  }

  /**
   * Serializes the precinct status of an election.
   * @return {Object}   Status.
   */

  static get fields () {
    return {
      id: attr(),
      voteCount: attr(),
      votePct: attr(),
      precinctsReporting: attr(),
      precinctsTotal: attr(),
      precinctsReportingPct: attr(),
      winner: attr(),
      runoff: attr(),
      division: fk('Division'),
      candidate: fk('Candidate'),
      election: fk('Election'),
    };
  }
}

Result.modelName = 'Result';

export default Result;
