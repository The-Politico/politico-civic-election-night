import React from 'react';
import { DivisionLevels } from 'CommonConstants/geography';
import StickyHeader from 'StateApp/components/nav/StickyHeader';
import Governor from './offices/Governor';
import Senator from './offices/Senator';
import House from './offices/House';
import JumpLinks from 'StateApp/components/nav/JumpLinks';
import FetchRefresh from 'StateApp/components/FetchRefresh';

const Results = (props) => {
  // We do some queries higher up so we don't need
  // to repeat them in sibling components...
  // ... Serialize candidates
  const {Candidate, Division, APMeta} = props.session;
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

  props.tabulated = true;
  APMeta.all().toModelArray().forEach(meta => {
    if (!meta.tabulated) {
      props.tabulated = false;
    }
  });

  const fetchRefresh = props.tabulated ? null : (
    <FetchRefresh
      actions={props.actions}
      fetch={props.fetch}
    />
  );

  return (
    <section className='election-results'>
      <StickyHeader {...props} />
      {fetchRefresh}
      <JumpLinks />
      <Governor {...props} />
      <Senator {...props} />
      <House {...props} />
    </section>
  );
};

export default Results;
