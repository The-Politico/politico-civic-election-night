import React from 'react';
import Governor from './offices/Governor';
import Senator from './offices/Senator';
import House from './offices/House';

const Results = (props) => (
  <div>
    <Governor {...props} />
    <Senator {...props} />
    <House {...props} />
  </div>
);

export default Results;
