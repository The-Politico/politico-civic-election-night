import React from 'react';
import { intcomma } from 'journalize';
import CandidateRow from './CandidateRow';
import HeaderRow from './HeaderRow';

import 'SCSS/state-app/components/results_tables/simple.scss';

const SimpleTable = (props) => {
  const candidateResults = props.results.map(result => (
    <CandidateRow
      result={result}
      key={result.candidate.id}
    />
  ));

  return (
    <section className='results-table'>
      <table>
        <tbody>
          <HeaderRow />
          {candidateResults}
          <tr>
            <td
              colSpan='4'
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

export default SimpleTable;
