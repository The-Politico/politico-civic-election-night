import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Actions from '../actions/';
import orm from 'CommonModels';

import Results from './Results';

const App = (props) => {
  const actions = bindActionCreators(Actions, props.dispatch);
  return (
    <Results
      session={orm.session(props.db.orm)}
      actions={actions}
    />
  );
};

const mapStateToProps = state => ({
  db: state,
});

export default connect(mapStateToProps)(App);
