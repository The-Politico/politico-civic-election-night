import React from 'react';
import ResultsTable from 'StateApp/components/ResultsTables/Table';
import CountyMap from 'StateApp/components/ResultsMaps/CountyMap';

const TableMap = (props) => {
  return (
    <article className='results'>
      <header>
        <h4>{props.election.primary_party.label} Primary</h4>
      </header>
      <div className='container'>
        <div className='row'>
          <ResultsTable {...props} />
          <CountyMap {...props} />
        </div>
      </div>
    </article>
  );
};

export default TableMap;
