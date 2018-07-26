import React from 'react';
import MonthCrosswalk from 'Common/constants/months';

const Nav = (props) => {
  if (props.state.length === 0) {
    return (<div />);
  }

  const chatDate = window.appConfig.electionSlug.split('-');
  const month = MonthCrosswalk[chatDate[1]];
  const day = chatDate[2];

  const liveStates = window.appConfig.nav.states.filter((state) => (
    (state.live || state.runoff || state.special) && props.state[0].label !== state.name
  ));

  const links = liveStates.map(state => {
    let link = state.link;
    if (state.runoff) {
      link = `${link}runoff`;
    } else if (state.special) {
      link = `${link}special-election/${month}-${day}`;
    }

    return (
      <a href={link} className='space-case'>{state.name}</a>
    );
  });

  return (
    <div className='jumpto'>
      {links.length > 0 && (
        <p>
          Other elections today:
          {links}
        </p>
      )}
    </div>
  );
};

export default Nav;
