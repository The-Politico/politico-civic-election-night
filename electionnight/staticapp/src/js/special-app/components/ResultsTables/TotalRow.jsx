import React from 'react';
import { intcomma } from 'journalize';

const TotalRow = (props) => (
  <tr className='total'>
    <td colSpan='4'>{intcomma(props.total)} total votes</td>
  </tr>
);

export default TotalRow;