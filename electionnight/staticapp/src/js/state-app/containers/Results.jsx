import React from 'react';
import { DivisionLevels } from 'CommonConstants/geography';
import StickyHeader from 'StateApp/components/StickyHeader';
import Governor from './offices/Governor';
import Senator from './offices/Senator';
import House from './offices/House';
import Nav from './offices/Nav';

const Results = (props) => {
  // We do some queries higher up so we don't need
  // to repeat them in sibling components...
  // ... Serialize candidates
  const {Candidate, Division} = props.session;
  const candidates = {};
  Candidate.all().toModelArray().forEach(candidate => {
    if (!candidate.id) return;
    candidates[candidate.id] = candidate.serialize();
  });
  props.candidates = candidates;
  // ... County Divisions
  props.counties = Division
    .filter(d => d.level === DivisionLevels.county)
    .toModelArray();
  // ... State Divisions
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
