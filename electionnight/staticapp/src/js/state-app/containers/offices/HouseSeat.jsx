import React from 'react';
import SimpleResult from './../results/Simple';

const HouseSeat = (props) => {
  const simpleResults = props.elections.map(election => (
    <SimpleResult election={election} {...props} />
  ));

  return (
    <div>
      <h4>{props.elections[0].office.label}</h4>
      {simpleResults}
    </div>
  );
};

export default HouseSeat;
