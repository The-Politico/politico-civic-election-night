import React from 'react';
import CandidateRow from './CandidateRow';
import HeaderRow from './HeaderRow';

const Table = (props) => {
  const candidateResults = props.results.map((result, i) => (
    <CandidateRow
      result={result}
      candidateKeys={props.candidateKeys}
      candidateColors={props.candidateColors}
    />
  ));

  return (
    <section className='results-table forty-five'>
      <table>
        <tbody>
          <HeaderRow />
          {candidateResults}
        </tbody>
      </table>
    </section>
  );
};

export default Table;
