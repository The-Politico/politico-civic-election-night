import React from 'react';
import { intcomma } from 'journalize';
import CandidateRow from './CandidateRow';
import HeaderRow from './HeaderRow';
import TotalRow from './TotalRow';
import {decimalToPercent} from 'CommonUtils/numbers';

import 'SCSS/special-app/components/results_tables/simple.scss';

const SimpleTable = (props) => {
  let total = 0;
  props.results.forEach((result) => {
    total += result.voteCount;
  });

  if (total === 0) {
    props.results.sort((a, b) => (
      a.candidate.lastName > b.candidate.lastName
    ));
  }

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
              {decimalToPercent(props.status.pct)}% of precincts reporting
              ({intcomma(props.status.reporting)}/
              {intcomma(props.status.total)})
            </td>
            <td
              colSpan='1'
              className='incumbent'
              hidden={!incumbent}
            >*Incumbent</td>
          </tr>
          <TotalRow total={total} />
        </tbody>
      </table>
    </section>
  );
};

export default SimpleTable;
