import React from 'react';
import { intcomma } from 'journalize';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import {decimalToPercent} from 'CommonUtils/numbers';

const CandidateRow = (props) => {
  const {candidateKeys, result} = props;
  const colorI = candidateKeys[result.candidate.id];
  return (
    <tr
      className={`candidate results-table-row ${props.result.winner ? 'winner' : ''}`}
    >
      <td className='candidate-color key'>
        <span className={`primary${colorI}`} />
      </td>
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
  );
};

export default CandidateRow;
