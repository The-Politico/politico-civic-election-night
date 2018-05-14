import React from 'react';

const Uncontested = (props) => {
  const {candidate} = props;
  let asterisk = '';
  if (candidate.incumbent) {
    asterisk = '*';
  }
  return (
    <div className='uncontested'>
      <span className='candidate'>{candidate.firstName} {candidate.lastName}{asterisk}</span> ran unopposed.
      <br />
      <span
        className='incumbent'
        hidden={!candidate.incumbent}
      >
        *Incumbent
      </span>
    </div>
  );
};

export default Uncontested;
