import React from 'react';
import { sortByParty } from 'CommonUtils/elections';
import DetailResult from './../results/Detail';

const Governor = (props) => {
  const db = props.session;
  const governor = db.Office.filter(
    d => d.name.includes('Governor')).toModelArray();

  if (governor.length === 0) return null;

  const elections = db.Election.filter({
    office: governor[0].id,
  }).toModelArray();

  if (elections.length === 0) return null;

  elections.sort(sortByParty);

  const detailResults = elections.map(election => (
    <DetailResult election={election} {...props} />
  ));

  return (
    <div>
      <h3>{elections[0].division.label} state governor</h3>
      {detailResults}
    </div>
  );
};

export default Governor;
