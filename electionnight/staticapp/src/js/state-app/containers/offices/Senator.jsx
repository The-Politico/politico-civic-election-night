import React from 'react';
import { sortByParty } from 'CommonUtils/elections';
import TableMap from './../results/TableMap';

const Senator = (props) => {
  const db = props.session;
  const senator = db.Office.filter(
    d => d.name.includes('U.S. Senate')).toModelArray();

  if (senator.length === 0) return null;

  const elections = db.Election.filter({
    office: senator[0].id,
  }).toModelArray();

  elections.sort(sortByParty);

  const results = elections.map(election => (
    <TableMap election={election} {...props} />
  ));
  return (
    <section className='results-group'>
      <header>
        <h3>U.S. Senate</h3>
      </header>
      {results}
    </section>
  );
};

export default Senator;
