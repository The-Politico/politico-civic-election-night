import React from 'react';
import { DivisionLevels } from 'CommonConstants/geography';
import CandidateRow from './CandidateRow';
import HeaderRow from './HeaderRow';

import 'SCSS/state-app/components/results_tables/detail.scss';

const DetailTable = (props) => {
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
    <div className='results-table'>
      <HeaderRow />
      {candidateResults}
    </div>
  );
};

export default DetailTable;
