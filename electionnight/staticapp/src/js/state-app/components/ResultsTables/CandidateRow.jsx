import React from 'react';
import { intcomma } from 'journalize';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import {decimalToPercent} from 'CommonUtils/numbers';

const CandidateRow = (props) => (
  <div className='candidate results-table-row'>
    <div className='vote-percent'>
      {decimalToPercent(props.result.votePct)}%
    </div>
    <div className='candidate'>
      {props.result.candidate.firstName} {props.result.candidate.lastName}
    </div>
    <div className='vote-count'>
      {intcomma(props.result.voteCount)}
    </div>
    <div className='winning'>
      <FontAwesomeIcon
        icon={faCheck}
        hidden={!props.result.winner}
      />
    </div>
  </div>
);

export default CandidateRow;
