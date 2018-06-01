import React from 'react';

const Nav = (props) => {
  if (props.state.length === 0) {
    return (<div />);
  }

  const liveStates = window.appConfig.nav.states.filter((state) => (
    (state.live || state.runoff) && props.state[0].label !== state.name
  ));
  const links = liveStates.map(state => (
    <a href={state.runoff ? `${state.link}runoff` : state.link} className='space-case'>{state.name}</a>
  ));

  return (
    <div className='jumpto'>
      <p>
        Other elections today:
        <div>
          {links}
        </div>
      </p>
    </div>
  );
};

export default Nav;
