import React from 'react';

const StateNav = (props) => {
  const open = props.open ? 'open' : '';
  const links = window.appConfig.nav.states;
  const lis = links.map(state => (
    <li>
      <a
        className={state.live || state.runoff ? 'live' : ''}
        href={state.runoff ? `${state.link}runoff` : state.link}>{state.name}
      </a>
    </li>
  ));
  return (
    <div className={`statenav-top ${open}`}>
      <ul>
        {lis}
      </ul>
    </div>
  );
};

export default StateNav;
