import React from 'react';

const Uncontested = (props) => {
  const {candidate} = props;
  return (
    <div className='uncontested'>
      <span className='candidate'>{candidate.firstName} {candidate.lastName}</span> ran unopposed.
    </div>
  );
};

export default Uncontested;
