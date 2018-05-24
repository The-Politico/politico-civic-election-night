import React from 'react';
import Color from 'color';
import { intcomma } from 'journalize';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import {decimalToPercent} from 'CommonUtils/numbers';

const CandidateRow = (props) => {
  console.log(props.expand);
  const {result} = props;
  const candidateColor = props.candidateColors[result.candidate.id];
  const background = result.winner || result.runoff
    ? Color(candidateColor).fade(0.85).string() : null;
  const winnerClass = result.winner || result.runoff
    ? 'winner' : '';
  const incumbent = result.candidate.incumbent ? '*' : '';
  const hiddenClass = props.i >= 10 && !props.expand ? 'hidden' : '';

  return (
    <tr
      className={`candidate results-table-row ${winnerClass} ${hiddenClass}`}
      style={{
        backgroundColor: background,
      }}
    >
      <td className='candidate-color key'>
        <span
          style={{backgroundColor: candidateColor}}
        />
      </td>
      <td className='vote-percent'>
        {decimalToPercent(result.votePct)}%
      </td>
      <td className='candidate'>
        {result.candidate.firstName} {result.candidate.lastName}{incumbent}
      </td>
      {props.jungle ? (
        <td className='party'>
          {result.candidate.party ? result.candidate.party.shortLabel : null}
        </td>
      ): null}
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
