import React from 'react';

const HeaderRow = () => (
  <tr className='header results-table-row'>
    <th className='key' />
    <th className='vote-percent'>
      Percent
    </th>
    <th className='candidate'>
      Candidate
    </th>
    <th className='candidate'>
      Party
    </th>
    <th className='vote-count'>
      Votes
    </th>
    <th className='winning'>
      Winner
    </th>
  </tr>
);

export default HeaderRow;
