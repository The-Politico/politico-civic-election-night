import React from 'react';
import Table from './../results/Table';
import PrimaryFulfilled from 'RunoffApp/components/ResultsTables/PrimaryFulfilled';
import DistrictMap from 'StateApp/components/DistrictMap';

const HouseSeat = (props) => {
  const results = props.elections.map(election => (
    <Table election={election} {...props} />
  ));

  if (props.elections.length === 1) {
    const runoffParty = props.elections[0].primary_party.label;

    let emptyParty = '';

    if (runoffParty === 'Democrat') {
      emptyParty = 'Republican';
    } else {
      emptyParty = 'Democratic';
    }

    const emptyItem = (<PrimaryFulfilled
      party={emptyParty}
    />);

    props.elections[0].primary_party.label === 'Democrat' ? results.push(emptyItem) : results.unshift(emptyItem);
  }


  if (!props.elections[0]) return (<div />);
  return (
    <section className='results-group'>
      <header>
        <h4 className='district'>
          {props.elections[0].office.label} {props.elections[0].special ? 'Special' : ''}
        </h4>
        {props.elections[0].special ? (
          <p className='subhed'>To complete current term</p>
        ) : null}
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
