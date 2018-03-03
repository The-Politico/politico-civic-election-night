import React from 'react';
import { connect } from 'react-redux';
import orm from 'CommonModels';

import Results from './Results';

const App = (props) => {
  return (
    <Results
      session={orm.session(props.db.orm)}
      countyResults={props.db.results.county}
      stateResults={props.db.results.state}
    />
  );
};

const mapStateToProps = state => ({
  db: state,
});

export default connect(mapStateToProps)(App);
