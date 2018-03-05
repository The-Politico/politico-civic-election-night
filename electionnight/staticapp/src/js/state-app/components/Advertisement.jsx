import React from 'react';

const Advertisement = (props) => (
  <div className='content-group ad'>
    <p>Advertisement</p>
    <div className='ad-slot flex horizontal' id={props.adID} />
  </div>
);

export default Advertisement;
