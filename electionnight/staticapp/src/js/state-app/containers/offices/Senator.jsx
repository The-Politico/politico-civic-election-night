import React from 'react';
import { sortByParty } from 'CommonUtils/elections';
import DetailResult from './../results/Detail';

const Senator = (props) => {
  const db = props.session;
  const senator = db.Office.filter(
    d => d.name.includes('U.S. Senate')).toModelArray();

  if (senator.length === 0) return null;

  const elections = db.Election.filter({
    office: senator[0].id,
  }).toModelArray();

  elections.sort(sortByParty);

  const detailResults = elections.map(election => (
    <DetailResult election={election} {...props} />
  ));
  return (
    <div>
      <h3>U.S. Senate</h3>
      {detailResults}
    </div>
  );
};

export default Senator;
