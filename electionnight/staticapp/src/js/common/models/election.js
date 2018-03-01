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
   * @param  {Array} divisions  Divisions.
   * @return {Object}           Serialized results.
   */
  serializeResults (divisions) {
    const status = this.serializeStatus();
    const divisionResults = {};

    let resultSet;
    if (status && status.overrideApVotes) {
      resultSet = this.overrideresultSet;
    } else {
      resultSet = this.resultSet;
    }

    divisions.forEach((division) => {
      const obj = assign({}, division.serialize());
      obj.results = [];

      const filteredResults = resultSet.filter((d) =>
        d.division === division.id
      );

      const firstResult = filteredResults.first();
      if (!firstResult) return;

      obj.precinctsReporting = firstResult.precinctsReporting;
      obj.precinctsReportingPct = firstResult.precinctsReportingPct;
      obj.precinctsTotal = firstResult.precinctsTotal;

      filteredResults.toModelArray().forEach((result) => {
        const resultObj = {
          candidate: result.candidate.serialize(),
          voteCount: result.voteCount,
          votePct: result.votePct,
          winner: status.overrideApCall
            ? result.candidate.overrideWinner : result.winner,
          runoff: status.overrideApCall
            ? result.candidate.overrideRunoff : result.runoff,
        };

        // Aggregate aggregable candidates' vote totals
        // and percents by division
        if (result.candidate.aggregable) {
          const other = find(
            obj.results,
            d => d.candidate === 'other',
          );
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

    return {
      id: this.id,
      status,
      office: this.office.serialize(),
      divisions: divisionResults,
      primary: this.primary,
      primary_party: this.primary_party.serialize(),
      runoff: this.runoff,
    };
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
