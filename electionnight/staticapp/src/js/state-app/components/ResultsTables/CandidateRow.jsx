import React from 'react';
import { intcomma } from 'journalize';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import {decimalToPercent} from 'CommonUtils/numbers';

const CandidateRow = (props) => {
  if (props.result.candidate.lastName === 'Gohmert') {
    console.log(props.result.candidate);
  }
  return (
    <tr className='candidate results-table-row'>
      <td className='vote-percent'>
        {decimalToPercent(props.result.votePct)}%
      </td>
      <td className='candidate'>
        {props.result.candidate.firstName} {props.result.candidate.lastName}
      </td>
      <td className='vote-count'>
        {intcomma(props.result.voteCount)}
      </td>
      <td className='winning'>
        <FontAwesomeIcon
          icon={faCheck}
          hidden={!props.result.winner}
        />
      </td>
    </tr>
  )
};

export default CandidateRow;
