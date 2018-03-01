import React from 'react';

const Nav = (props) => {
  return (
    <div className='jumpto'>
      <p>
        Jump to
        <a className='space-case'>Governor</a>
        <a className='space-case'>Senate</a>
        <a className='space-case' >House</a>
      </p>
    </div>
  );
};

export default Nav;
