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
      <header>
        <h4 className='district'>
          {props.elections[0].office.label}
        </h4>
        <DistrictMap
          {...props}
          district={props.elections[0].division.code}
        />
      </header>
      <div className='container'>
        <div className='row'>
          {results}
          <div className='clear' />
        </div>
      </div>
    </section>
  );
};

export default HouseSeat;
