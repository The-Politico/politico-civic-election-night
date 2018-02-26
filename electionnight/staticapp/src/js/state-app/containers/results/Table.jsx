import React from 'react';
import ResultsTable from 'StateApp/components/ResultsTables/Table';

const Table = (props) => {
  return (
    <article className='results'>
      <header>
        <h4>{props.election.primary_party.label} Primary</h4>
      </header>
      <ResultsTable {...props} />
    </article>
  );
};

export default Table;
