import React from 'react';

const LiveChatPromo = (props) => {
  const monthCrosswalk = {
    '01': 'jan',
    '02': 'feb',
    '03': 'mar',
    '04': 'apr',
    '05': 'may',
    '06': 'jun',
    '07': 'jul',
    '08': 'aug',
    '09': 'sep',
    '10': 'oct',
    '11': 'nov',
    '12': 'dec',
  };

  const chatDate = window.appConfig.electionSlug.split('-');
  const month = monthCrosswalk[chatDate[1]];
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
