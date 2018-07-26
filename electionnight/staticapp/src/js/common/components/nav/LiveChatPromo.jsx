import React from 'react';
import MonthCrosswalk from 'Common/constants/months';

const LiveChatPromo = (props) => {
  const chatDate = window.appConfig.electionSlug.split('-');
  const month = MonthCrosswalk[chatDate[1]];
  const day = chatDate[2];

  return (
    <a
      href={`https://www.politico.com/election-results/2018/live-analysis/${month}-${day}/`}
      target='_blank'
    >
      <div className='live-analysis screenshot-remove'>
        <p>Live Analysis</p>
        <div className='dots'>
          <span className='dot' />
          <span className='dot' />
          <span className='dot' />
        </div>
      </div>
    </a>
  );
};

export default LiveChatPromo;
