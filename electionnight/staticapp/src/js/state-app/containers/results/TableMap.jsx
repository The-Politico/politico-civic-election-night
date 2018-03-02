import React from 'react';
import keys from 'lodash/keys';
import uniq from 'lodash/uniq';
import { DivisionLevels } from 'CommonConstants/geography';
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
    const { election } = this.props;

    const state = this.props.session.Division.filter({
      level: DivisionLevels.state,
    }).toModelArray();

    const results = election.serializeResults(state);

    return results.divisions[state[0].postalCode];
  }

  getCountyWinners () {
    const { election } = this.props;
    const counties = this.props.session.Division.filter({
      level: DivisionLevels.county,
    }).toModelArray();
    const results = election.serializeResults(counties);
    const winners = keys(results.divisions).map(fips => {
      const countyResults = results.divisions[fips].results;
      countyResults.sort((a, b) => b.votePct - a.votePct);
      return countyResults[0].candidate.id;
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
              {...this.props}
            />
            <CountyMap
              candidateColors={candidateColors}
              {...this.props}
            />
            <div className='clear' />
          </div>
        </div>
      </article>
    );
  }
};

export default TableMap;
