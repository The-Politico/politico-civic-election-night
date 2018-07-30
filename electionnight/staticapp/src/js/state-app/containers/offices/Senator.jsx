import React from 'react';
import { sortByParty } from 'CommonUtils/elections';
import TableMap from './../results/TableMap';
import {Element} from 'react-scroll';

const Senator = (props) => {
  const {session, state} = props;

  // Wait on context to render
  if (state.length === 0) return (<div />);

  const { senator } = props;

  if (senator.length === 0) return (<div />);

  let elections = senator.map(
    office => session.Election.filter({office: office.id}).toModelArray());

  if (elections.length === 0) return (<div />);

  let specials = [];
  let standard = [];

  elections.forEach(officeElections => {
    officeElections.forEach((election) => {
      if (election.special) {
        specials.push(election);
      } else {
        standard.push(election);
      }
    });
  });

  standard = standard.filter(item => !item.special);
  standard.sort(sortByParty);
  specials.sort(sortByParty);

  const results = standard.map(election => (
    <TableMap election={election} {...props} />
  ));

  console.log(results);
  console.log(specials);

  return (
    <section className='results-group'>
      <Element name='senate-anchor'>
        <header>
          <h3>U.S. Senate</h3>
        </header>
        {results}
      </Element>
      {specials.length > 0 && (
        <Element name='senate-special-anchor'>
          <header>
            <h3>U.S. Senate, Special</h3>
          </header>
          {specials.map(special => (
            <TableMap election={special} {...props} />
          ))}
        </Element>
      )}
    </section>
  );
};

export default Senator;
