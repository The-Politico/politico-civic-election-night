import React from 'react';
import { DivisionLevels } from 'CommonConstants/geography';
import StickyHeader from 'StateApp/components/StickyHeader';
import Governor from './offices/Governor';
import Senator from './offices/Senator';
import House from './offices/House';
import Nav from './offices/Nav';

const Results = (props) => {
  // Serialize candidates
  const {Candidate, Division} = props.session;
  const candidates = {};
  Candidate.all().toModelArray().forEach(candidate => {
    if (!candidate.id) return;
    candidates[candidate.id] = candidate.serialize();
  });
  props.candidates = candidates;
  // Serialize Counties
  props.counties = Division
    .filter(d => d.level === DivisionLevels.county)
    .toModelArray();
  // Serialize State
  props.state = Division
    .filter(d => d.level === DivisionLevels.state)
    .toModelArray();

  return (
    <section className='election-results'>
      <StickyHeader {...props} />
      <Nav {...props} />
      <Governor {...props} />
      <Senator {...props} />
      <House {...props} />
    </section>
  );
};

export default Results;
