import React from 'react';
import { intcomma } from 'journalize';

const TotalRow = (props) => {
  let total = 0;
  props.results.forEach((result) => {
    total += result.voteCount;
  });

  return (
    <tr className='total'>
      <td colSpan='4'>{intcomma(total)} total votes</td>
    </tr>
  );
};

export default TotalRow;
