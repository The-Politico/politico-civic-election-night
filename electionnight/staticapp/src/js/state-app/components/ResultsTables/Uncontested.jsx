import React from 'react';

const Uncontested = (props) => {
  const {results} = props;
  console.log(props);

  const candidate = results[0].candidate;

  let incumbent = false;
  let asterisk = '';
  if (candidate.incumbent) {
    asterisk = '*';
    incumbent = true;
  }

  let candidateTwo = null;
  let asteriskTwo = '';
  let party = '';
  let partyTwo = '';

  if (props.jungle) {
    party = `(${candidate.party.shortLabel})`;

    if (results.length > 1) {
      candidateTwo = results[1].candidate;
      partyTwo = `(${candidateTwo.party.shortLabel})`;

      if (candidateTwo.incumbent) {
        asteriskTwo = '*';
        incumbent = true;
      }
    }
  }

  const candidates = candidateTwo ? (
    <span className='candidatewrapper'>
      <span className='candidate'>{candidate.firstName} {candidate.lastName}{asterisk} {party}</span> and <span className='candidate'>{candidateTwo.firstName} {candidateTwo.lastName}{asteriskTwo} {partyTwo}</span> advance to the general election.
    </span>
  ) : (
    <span className='candidatewrapper'>
      <span className='candidate'>{candidate.firstName} {candidate.lastName}{asterisk} {party}</span> ran unopposed.
    </span>
  );

  return (
    <div className='uncontested'>
      {candidates}
      <br />
      <span
        className='incumbent'
        hidden={!incumbent}
      >
        *Incumbent
      </span>
    </div>
  );
};

export default Uncontested;
