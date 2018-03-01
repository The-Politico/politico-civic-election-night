import React from 'react';
import Table from './../results/Table';

const HouseSeat = (props) => {
  const results = props.elections.map(election => (
    <Table election={election} {...props} />
  ));

  return (
    <section className='results-group'>
      <header>
        <h4>{props.elections[0].office.label}</h4>
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
