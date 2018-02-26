import React from 'react';
import SimpleTable from 'StateApp/components/ResultsTables/Detail';
import CountyMap from 'StateApp/components/CountyMap';

const DetailResult = (props) => {
  return (
    <div className='detail-results'>
      <h5>{props.election.primary_party.label} Primary</h5>
      <section className='results-section'>
        <SimpleTable {...props} />
        <CountyMap {...props} />
      </section>

    </div>
  );
};

export default DetailResult;
