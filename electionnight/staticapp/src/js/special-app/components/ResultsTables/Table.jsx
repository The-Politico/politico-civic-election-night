import React from 'react';
import { intcomma } from 'journalize';
import CandidateRow from './CandidateRow';
import HeaderRow from './HeaderRow';

import 'SCSS/special-app/components/results_tables/simple.scss';

const SimpleTable = (props) => {
  const candidateResults = props.results.map(result => (
    <CandidateRow
      result={result}
      key={result.candidate.id}
    />
  ));

  const incumbent = props.results.map(d => d.candidate.incumbent).some(d => d);
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
          <tr hidden={!incumbent}>
            <td
              colSpan='5'
              className='incumbent'
            >*Incumbent</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default SimpleTable;