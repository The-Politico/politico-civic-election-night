import React from 'react';
import StickyHeader from 'StateApp/components/StickyHeader';
import Governor from './offices/Governor';
import Senator from './offices/Senator';
import House from './offices/House';
import Nav from './offices/Nav';

const Results = (props) => (
  <section className='election-results'>
    <StickyHeader {...props} />
    <Nav {...props} />
    <Governor {...props} />
    <Senator {...props} />
    <House {...props} />
  </section>
);

export default Results;
