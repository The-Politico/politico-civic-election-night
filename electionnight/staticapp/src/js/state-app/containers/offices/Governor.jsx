import React from 'react';
import { sortByParty } from 'CommonUtils/elections';
import TableMap from './../results/TableMap';
import {Element} from 'react-scroll';

const Governor = (props) => {
  const db = props.session;
  const governor = db.Office.filter(
    d => d.name.includes('Governor')).toModelArray();

  if (governor.length === 0) return null;

  const elections = db.Election.filter({
    office: governor[0].id,
  }).toModelArray();

  if (elections.length === 0) return null;

  elections.sort(sortByParty);

  const results = elections.map(election => (
    <TableMap election={election} {...props} />
  ));

  return (
    <section className='results-group'>
      <Element name='governor-anchor'>
        <header>
          <h3>{elections[0].division.label} state governor</h3>
        </header>
        {results}
      </Element>
    </section>
  );
};

export default Governor;
