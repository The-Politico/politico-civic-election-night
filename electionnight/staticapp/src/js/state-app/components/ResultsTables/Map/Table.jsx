import React from 'react';
import { intcomma } from 'journalize';
import CandidateRow from './CandidateRow';
import HeaderRow from './HeaderRow';

const Table = (props) => {
  const candidateResults = props.results.map((result, i) => (
    <CandidateRow
      key={result.candidate.id}
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
          <tr>
            <td
              colSpan='5'
              className='precincts-reporting'
            >
              {intcomma(props.status.reporting)}/
              {intcomma(props.status.total)} precincts reporting
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Table;
