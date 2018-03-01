import React from 'react';
import {Link} from 'react-scroll';

const Nav = (props) => {
  return (
    <div className='jumpto'>
      <p>
        Jump to
        <Link
          className='space-case'
          offset={-50}
          duration={500}
          smooth
          to='governor-anchor'
        >Governor</Link>
        <Link
          className='space-case'
          offset={-50}
          duration={500}
          smooth
          to='senate-anchor'
        >Senate</Link>
        <Link
          className='space-case'
          offset={-50}
          duration={500}
          smooth
          to='house-anchor'
        >House</Link>
      </p>
    </div>
  );
};

export default Nav;
