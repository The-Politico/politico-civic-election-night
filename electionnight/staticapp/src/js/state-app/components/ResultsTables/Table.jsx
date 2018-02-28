import React from 'react';
import { DivisionLevels } from './../../../common/constants/geography';
import CandidateRow from './CandidateRow';
import HeaderRow from './HeaderRow';

import 'SCSS/state-app/components/results_tables/simple.scss';

const SimpleTable = (props) => {
  const election = props.election;

  const state = props.session.Division.filter({
    level: DivisionLevels.state,
  }).toModelArray();

  const results = election.serializeResults(state);
  const stateLevel = results.divisions[state[0].postalCode];

  if (!stateLevel) return (<div>No results.</div>);

  const stateLevelResults = stateLevel.results;

  stateLevelResults.sort((a, b) => b.votePct - a.votePct);

  const candidateResults = stateLevelResults.map(result => (
    <CandidateRow result={result} />
  ));

  return (
    <section className='results-table'>
      <table className="table">
        <HeaderRow />
        {candidateResults}
      </table>
    </section>
  );
};

export default SimpleTable;
