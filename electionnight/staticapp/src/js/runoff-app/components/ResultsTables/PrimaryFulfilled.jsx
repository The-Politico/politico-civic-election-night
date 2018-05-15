import React from 'react';
import 'SCSS/runoff-app/components/results_tables/no-runoff.scss';

const PrimaryFulfilled = (props) => {
  return (
    <article className='results fifty'>
      <div className='fulfilled'>
        <header>
          <h4>No {props.party} Runoff</h4>
        </header>
        <p><a href='../'>View primary results</a></p>
      </div>
    </article>
  );
};

export default PrimaryFulfilled;
