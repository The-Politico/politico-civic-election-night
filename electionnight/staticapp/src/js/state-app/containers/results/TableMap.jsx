import React from 'react';
import { DivisionLevels } from 'CommonConstants/geography';
import ResultsTable from 'StateApp/components/ResultsTables/Map/Table';
import CountyMap from 'StateApp/components/ResultsMaps/CountyMap';
import { primaryColors } from 'StateApp/constants/colors';

const TableMap = (props) => {
  const election = props.election;

  const state = props.session.Division.filter({
    level: DivisionLevels.state,
  }).toModelArray();

  const results = election.serializeResults(state);

  const stateLevel = results.divisions[state[0].postalCode];

  if (!stateLevel) return (<div />);

  const stateLevelResults = stateLevel.results;

  stateLevelResults.sort((a, b) => b.candidate.id > a.candidate.id);
  const candidateColors = {};

  stateLevelResults.forEach((d, i) => {
    candidateColors[d.candidate.id] = primaryColors[i + 1];
  });

  stateLevelResults.sort((a, b) => b.votePct - a.votePct);

  return (
    <article className='results'>
      <header>
        <h4>{props.election.primary_party.label} Primary</h4>
      </header>
      <div className='container'>
        <div className='row'>
          <ResultsTable
            results={stateLevelResults}
            candidateColors={candidateColors}
            {...props}
          />
          <CountyMap
            candidateColors={candidateColors}
            {...props}
          />
          <div className='clear' />
        </div>
      </div>
    </article>
  );
};

export default TableMap;
