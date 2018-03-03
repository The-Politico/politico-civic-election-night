import React from 'react';
import { sortByParty } from 'CommonUtils/elections';
import TableMap from './../results/TableMap';
import {Element} from 'react-scroll';

const Senator = (props) => {
  const {session, state} = props;

  // Wait on context to render
  if (state.length === 0) return (<div />);

  const senator = session.Office.filter(
    d => d.name.includes('U.S. Senate')).toModelArray();

  const elections = session.Election.filter({
    office: senator[0].id,
  }).toModelArray();

  elections.sort(sortByParty);

  const results = elections.map(election => (
    <TableMap election={election} {...props} />
  ));
  return (
    <section className='results-group'>
      <Element name='senate-anchor'>
        <header>
          <h3>U.S. Senate</h3>
        </header>
        {results}
      </Element>
    </section>
  );
};

export default Senator;
