import React from 'react';
import Governor from './offices/Governor';
import Senator from './offices/Senator';
import House from './offices/House';

const Results = (props) => (
  <section className='election-results'>
    <Governor {...props} />
    <Senator {...props} />
    <House {...props} />
  </section>
);

export default Results;
