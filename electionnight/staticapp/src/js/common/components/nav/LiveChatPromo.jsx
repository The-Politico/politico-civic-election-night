import React from 'react';

const LiveChatPromo = (props) => (
  <a
    href='https://www.politico.com/election-results/2018/live-analysis/may-08/'
    target='_blank'
  >
    <div className='live-analysis'>
      <p>Live Analysis</p>
      <div className='dots'>
        <span className='dot' />
        <span className='dot' />
        <span className='dot' />
      </div>
    </div>
  </a>
);

export default LiveChatPromo;
