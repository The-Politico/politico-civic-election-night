import React from 'react';
import Table from './../results/Table';
import DistrictMap from 'SpecialApp/components/DistrictMap';

const HouseSeat = (props) => {
  const results = props.elections.map(election => (
    <Table election={election} {...props} />
  ));
  if (!props.elections[0]) return (<div />);
  return (
    <section className='results-group'>
      <div className='container'>
        <div className='row'>
          <div className='fifty'>
            {results}
          </div>
          <div className='fifty'>
            <DistrictMap
              {...props}
              district={props.elections[0].division.code}
            />
          </div>
          <div className='clear' />
        </div>
      </div>
    </section>
  );
};

export default HouseSeat;
