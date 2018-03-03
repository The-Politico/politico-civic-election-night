import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import orm from 'CommonModels';
import Actions from '../actions/';

import Results from './Results';

const App = (props) => {
  const actions = bindActionCreators(Actions, props.dispatch);
  return (
    <Results
      session={orm.session(props.db.orm)}
      countyResults={props.db.results.county}
      stateResults={props.db.results.state}
      actions={actions}
      fetch={props.db.fetch}
    />
  );
};

const mapStateToProps = state => ({
  db: state,
});

export default connect(mapStateToProps)(App);
