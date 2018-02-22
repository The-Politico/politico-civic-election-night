import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Actions from '../actions/';
import orm from '../../common/models';

const App = (props) => {
  const actions = bindActionCreators(Actions, props.dispatch);
  const db = orm.session(props.db.orm);

  const state = db.Division.filter(d => 
    d.level === 'state' &&
    d.code === window.appConfig.stateFips
  ).toModelArray();

  const counties = db.Division.filter(d => 
    d.level === 'county' &&
    d.parent.code === state.id
  ).toModelArray();

  const governor = db.Office.filter(d => d.name.includes('Governor')).toModelArray();

  const senate = db.Office.filter(d => d.name.includes('U.S. Senate')).toModelArray();

  const house = db.Office.filter(d => d.name.includes('U.S. House')).toModelArray();

  const governorElections = db.Election.filter(d =>
    d.office === governor[0].id
  ).toModelArray();

  const senateElections = db.Election.filter(d =>
    d.office === senate[0].id
  ).toModelArray();

  let houseElections = [];
  house.forEach((office) => {
    const elections = db.Election.filter(d => 
      d.office === office.id
    ).toModelArray();

    houseElections = houseElections.concat(elections);
  });

  if (governorElections.length > 0) {
    console.log('GOVERNOR ELECTIONS');  
    console.log('------------------');

    governorElections.forEach(election => {
      console.log(election.party.label);
      console.log('state-level', election.serializeResults(state));
      console.log('county-level', election.serializeResults(counties));
    });
  }

  if (senateElections.length > 0) {
    console.log('SENATE ELECTIONS');
    console.log('----------------');
    senateElections.forEach(election => {
      console.log(election.party.label);
      console.log('state-level', election.serializeResults(state));
      console.log('county-level', election.serializeResults(counties));
    });
  }

  if (houseElections.length > 0) {
    console.log('HOUSE ELECTIONS');
    console.log('---------------');
    houseElections.forEach(election => {
      console.log(election.division.label, election.party.label);
      console.log('state-level', election.serializeResults(state));
    });
  }

  return (
    <div>
      Rendering the app!
    </div>
  );
};

const mapStateToProps = state => ({
  db: state,
});

export default connect(mapStateToProps)(App);