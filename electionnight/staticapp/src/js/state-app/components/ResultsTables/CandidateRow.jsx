import React from 'react';
import { intcomma } from 'journalize';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import {decimalToPercent} from 'CommonUtils/numbers';

const CandidateRow = (props) => {
  const {result} = props;
  const winnerClass = result.winner || result.runoff
    ? 'winner' : '';
  return (
    <tr className={`candidate results-table-row ${winnerClass}`}>
      <td className='vote-percent'>
        {decimalToPercent(result.votePct)}%
      </td>
      <td className='candidate'>
        {result.candidate.firstName} {result.candidate.lastName}
      </td>
      <td className='vote-count'>
        {intcomma(result.voteCount)}
      </td>
      <td className='winning'>
        <FontAwesomeIcon
          icon={faCheck}
          hidden={!result.winner && !result.runoff}
        />
      </td>
    </tr>
  );
};

export default CandidateRow;
