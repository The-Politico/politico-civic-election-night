import { fk, many, oneToOne, attr, Model } from 'redux-orm';
import assign from 'lodash/assign';
import find from 'lodash/find';
import {ElectionTypes} from './../constants/elections';

class Election extends Model {
  /**
   * Returns the type of this election.
   * @return {string}   The type constant.
   */
  getType () {
    if (this.primary && this.runoff) return ElectionTypes.primaryRunoff;
    if (this.primary) return ElectionTypes.primary;
    if (this.special && this.runoff) return ElectionTypes.specialRunoff;
    if (this.special) return ElectionTypes.special;
    if (this.runoff) return ElectionTypes.generalRunoff;
    return ElectionTypes.general;
  }
  /**
   * Serializes the status of this election.
   * @return {Object}   Status object.
   */
  serializeStatus () {
    if (this.apMeta) {
      return assign(
        {},
        this.apMeta.serialize(),
      );
    } else {
      return null;
    }
  }

  /**
   * Serializes the results of this election in
   * the given divisions.
   * @param  {Array} divisions              Divisions.
   * @param  {Object} candidates            Object of serialized candidates
   * @param  {Array} divisionLevelResults   State or county-level results.
   * @return {Object}                        Serialized results.
   */
  serializeWithResults (divisions, candidates, divisionLevelResults) {
    // Get results for this election
    const electionResults = divisionLevelResults
      .filter(d => d.election === this.id);

    const divisionResults = {};

    divisions.forEach((division) => {
      const obj = assign({}, division.serialize());
      obj.results = [];
      // Filter to results for this division
      const results = electionResults
        .filter(result => result.division === division.id);

      const firstResult = results[0];
      if (!firstResult) return;
      // Set results status from first candidate
      obj.precinctsReporting = firstResult.precinctsReporting;
      obj.precinctsReportingPct = firstResult.precinctsReportingPct;
      obj.precinctsTotal = firstResult.precinctsTotal;

      results.forEach((result) => {
        const candidate = candidates[result.candidate];
        const resultObj = {
          candidate,
          voteCount: result.voteCount,
          votePct: result.votePct,
          winner: this.apMeta.overrideApCall ? candidate.overrideWinner : result.winner,
          runoff: this.apMeta.overrideApCall ? candidate.overrideRunoff : result.runoff,
        };

        // Aggregate aggregable candidates' vote totals
        // and percents by division
        if (candidate.aggregable) {
          const other = find(obj.results, d => d.candidate === 'other');
          if (other) {
            const otherIndex = obj.results.indexOf(other);
            other.voteCount += resultObj.voteCount;
            other.votePct += resultObj.votePct;
            obj.results[otherIndex] = other;
          } else {
            resultObj.candidate = 'other';
            obj.results.push(resultObj);
          }
        } else {
          obj.results.push(resultObj);
        }
      });
      divisionResults[division.id] = obj;
    });
    const serializedElection = {
      id: this.id,
      status: this.serializeStatus(),
      office: this.office.serialize,
      divisions: divisionResults,
      primary: this.primary,
      primary_party: this.primary_party.serialize,
      runoff: this.runoff,
    };
    return serializedElection;
  }

  static get fields () {
    return {
      id: attr(),
      date: attr(),
      office: oneToOne('Office'),
      division: fk('Division'),
      candidates: many('Candidate'),
      apMeta: oneToOne('APMeta'),
      primary: attr(),
      primary_party: fk('Party'),
      runoff: attr(),
      special: attr(),
    };
  }
}

Election.modelName = 'Election';

export default Election;
