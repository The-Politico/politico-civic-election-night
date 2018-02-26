import React from 'react';
import SimpleTable from 'StateApp/components/ResultsTables/Simple';

const SimpleResult = (props) => {
  return (
    <div className='simple-results'>
      <h5>{props.election.primary_party.label} Primary</h5>
      <SimpleTable {...props} />
    </div>
  );
};

export default SimpleResult;
