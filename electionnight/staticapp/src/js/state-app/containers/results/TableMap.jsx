import React from 'react';
import uniq from 'lodash/uniq';
import groupBy from 'lodash/groupBy';
import values from 'lodash/values';
import { aliases } from 'CommonConstants/parties';
import ResultsTable from 'StateApp/components/ResultsTables/Map/Table';
import CountyMap from 'StateApp/components/ResultsMaps/CountyMap';
import { primaryColorsDem, primaryColorsGOP } from 'StateApp/constants/colors';

class TableMap extends React.Component {
  constructor (props) {
    super(props);
    this.getStateResults = this.getStateResults.bind(this);
    this.getCountyWinners = this.getCountyWinners.bind(this);
    this.buildCandidateColors = this.buildCandidateColors.bind(this);
  }

  getStateResults () {
    const {state, stateResults, overrideStateResults, election, candidates} = this.props;
    const resultsSet = election.apMeta.overrideApVotes ? overrideStateResults : stateResults;

    const results = election.serializeWithResults(
      state,
      candidates,
      resultsSet
    );
    return results.divisions[state[0].postalCode];
  }

  getCountyWinners () {
    const { election, countyResults, overrideCountyResults } = this.props;
    // Filter to election results
    const resultsSet = election.apMeta.overrideApVotes ? overrideCountyResults : countyResults;
    const electionResults = resultsSet.filter(d =>
      d.election === election.id);

    // Get top candidates by each county
    const winners = values(groupBy(electionResults, d => d.division))
      .map(resultsSet => {
        resultsSet.sort((a, b) => b.votePct - a.votePct);
        return resultsSet[0].candidate;
      });

    return uniq(winners);
  }

  checkRunoff (results) {
    const runoffs = results.map(r => r.runoff);
    return runoffs.indexOf(true) > -1;
  }

  buildCandidateColors (results) {
    results.sort((a, b) => b.candidate.id > a.candidate.id);
    const { election } = this.props;

    const countyWinners = this.getCountyWinners();

    // TODO: Add general color palette...
    const colorPalette = election.primary_party.id === 'Dem'
      ? primaryColorsDem : primaryColorsGOP;

    const candidateColors = {};
    results.forEach((d, i) => {
      const {id, order} = d.candidate;
      if (countyWinners.indexOf(id) > -1) {
        candidateColors[id] = colorPalette[order];
      } else {
        candidateColors[id] = 'transparent';
      }
      // Can't get a color if you don't have any votes.
      if (d.voteCount === 0) {
        candidateColors[id] = 'transparent';
      }
    });
    return candidateColors;
  }

  render () {
    const { election } = this.props;
    const state = this.getStateResults();

    if (!state) return (<div />);

    const { results, precinctsReporting, precinctsTotal } = state;

    const status = {
      reporting: precinctsReporting,
      total: precinctsTotal,
    };

    if (!results) return (<div />);

    const candidateColors = this.buildCandidateColors(results);

    results.sort((a, b) => b.votePct - a.votePct);

    const runoff = this.checkRunoff(results) ? (
      <span className='runoff'>Race goes to runoff</span>
    ) : null;

    const map = election.apMeta.overrideApVotes ? null : (
      <CountyMap
        candidateColors={candidateColors}
        {...this.props}
      />
    );

    return (
      <article className='results'>
        <header>
          <h4>{aliases.adj[election.primary_party.label]} Primary {runoff}</h4>
        </header>
        <div className='container'>
          <div className='row'>
            <ResultsTable
              results={results}
              status={status}
              candidateColors={candidateColors}
            />
            {map}
            <div className='clear' />
          </div>
        </div>
      </article>
    );
  }
};

export default TableMap;
