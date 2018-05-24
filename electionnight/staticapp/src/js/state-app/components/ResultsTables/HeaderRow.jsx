import React from 'react';

const HeaderRow = (props) => (
  <tr className='header results-table-row'>
    <th className='vote-percent'>
      Percent
    </th>
    <th className='candidate'>
      Candidate
    </th>
    {props.jungle ? (
      <th className='party'>
        Party
      </th>
    ) : null}
    <th className='vote-count'>
      Votes
    </th>
    <th className='winning'>
      Winner
    </th>
  </tr>
);

export default HeaderRow;
