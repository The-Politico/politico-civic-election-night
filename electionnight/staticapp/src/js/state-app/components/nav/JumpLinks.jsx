import React from 'react';
import {Link} from 'react-scroll';

const Nav = (props) => {
  const {session} = props;

  const governor = session.Office.filter(
    d => d.name.includes('Governor')).toModelArray();

  const governorLink = governor.length > 0 ? (
    <Link
      className='space-case'
      offset={-70}
      duration={500}
      smooth
      to='governor-anchor'
    >Governor</Link>
  ) : null;

  const senator = session.Office.filter(
    d => d.name.includes('U.S. Senate')).toModelArray();

  const senatorLink = senator.length > 0 ? (
    <Link
      className='space-case'
      offset={-70}
      duration={500}
      smooth
      to='senate-anchor'
    >Senate</Link>
  ) : null;

  const houseOffices = session.Office.filter(
    d => d.name.includes('U.S. House')).toModelArray();

  const houseLink = houseOffices.length > 0 ? (
    <Link
      className='space-case'
      offset={-70}
      duration={500}
      smooth
      to='house-anchor'
    >House</Link>
  ) : null;

  return (
    <div className='jumpto'>
      <p>
        Jump to
        {governorLink}
        {senatorLink}
        {houseLink}
      </p>
    </div>
  );
};

export default Nav;
