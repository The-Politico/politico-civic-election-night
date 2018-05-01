import React from 'react';
import { intcomma } from 'journalize';
import CandidateRow from './CandidateRow';
import HeaderRow from './HeaderRow';
import TotalRow from './TotalRow';
import {decimalToPercent} from 'CommonUtils/numbers';

const Table = (props) => {
  const candidateResults = props.results.map((result, i) => (
    <CandidateRow
      key={result.candidate.id}
      result={result}
      candidateKeys={props.candidateKeys}
      candidateColors={props.candidateColors}
    />
  ));

  const incumbent = props.results.map(d => d.candidate.incumbent).some(d => d);

  return (
    <section className='results-table forty-five'>
      <table>
        <tbody>
          <HeaderRow />
          {candidateResults}
          <tr>
            <td
              colSpan='3'
              className='precincts-reporting'
            >
              {decimalToPercent(props.status.pct)}% of precincts reporting
              ({intcomma(props.status.reporting)}/
              {intcomma(props.status.total)})
            </td>
            <td
              className='incumbent'
              hidden={!incumbent}
            >*Incumbent</td>
          </tr>
          <TotalRow results={props.results} />
        </tbody>
      </table>
    </section>
  );
};

export default Table;
