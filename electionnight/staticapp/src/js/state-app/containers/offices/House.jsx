import React from 'react';
import { sortByParty, sortByDistrict } from 'CommonUtils/elections';
import HouseSeat from './HouseSeat';
import {Element} from 'react-scroll';

const House = (props) => {
  const {session, state} = props;

  // Wait on context to render
  if (state.length === 0) return (<div />);

  const houseOffices = session.Office.filter(
    d => d.name.includes('U.S. House')).toModelArray();
  houseOffices.sort(sortByDistrict);
  // Array of election arrays for each office
  const elections = houseOffices.map(
    office => session.Election.filter({office: office.id}).toModelArray());

  if (elections.length === 0) return (<div />);

  const seats = elections.map(officeElections => {
    officeElections.sort(sortByParty);
    return (
      <HouseSeat elections={officeElections} {...props} />
    );
  });

  return (
    <section className='results-list'>
      <Element name='house-anchor'>
        <header>
          <h3>U.S. House</h3>
        </header>
        {seats}
      </Element>
    </section>
  );
};

export default House;
