import React from 'react';
import Table from './../results/Table';
import DistrictMap from 'StateApp/components/DistrictMap';

const HouseSeat = (props) => {
  const results = props.elections.map(election => (
    <Table election={election} {...props} />
  ));
  if (!props.elections[0]) return (<div />);

  const districtMap = props.state[0].label === 'Alaska' ? null : (
    <DistrictMap
      {...props}
      district={props.elections[0].division.code}
    />
  )

  return (
    <section className='results-group'>
      <header>
        <h4 className='district'>
          {props.elections[0].office.label} {props.elections[0].special ? 'Special' : ''}
        </h4>
        {props.elections[0].special ? (
          <p className='subhed'>To complete current term</p>
        ) : null}
        {districtMap}
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
