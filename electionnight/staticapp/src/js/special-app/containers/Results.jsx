import React from 'react';
import { DivisionLevels } from 'CommonConstants/geography';
import StickyHeader from 'SpecialApp/components/nav/StickyHeader';
import House from './offices/House';
import FetchRefresh from 'SpecialApp/components/FetchRefresh';
import MarkdownText from 'SpecialApp/components/Markdowntext';
import Advertisement from 'SpecialApp/components/Advertisement';

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

  const live = document.querySelector('.time .live');
  const results = document.querySelector('.time .results');
  if (props.tabulated) {
    live.textContent = '';
    results.textContent = 'Results';
  } else {
    live.textContent = 'LIVE';
    results.textContent = 'results';
  }

  const fetchRefresh = props.tabulated ? null : (
    <FetchRefresh
      actions={props.actions}
      fetch={props.fetch}
    />
  );

  return (
    <div>
      <MarkdownText
        content={props.content}
        results={props.stateResults}
      />
      <section className='election-results'>
        <StickyHeader {...props} />
        {fetchRefresh}
      </section>
      <section className='election-results'>
        <House {...props} />
      </section>
      <Advertisement adID='pol-07' />
    </div>
  );
};

export default Results;
