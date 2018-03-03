import React from 'react';
import { aliases } from 'CommonConstants/parties';
import ResultsTable from 'StateApp/components/ResultsTables/Table';
import Uncontested from 'StateApp/components/ResultsTables/Uncontested';

class Table extends React.Component {
  constructor (props) {
    super(props);
    this.getStateResults = this.getStateResults.bind(this);
  }

  getStateResults () {
    const {state, stateResults, election, candidates} = this.props;

    const results = election.serializeWithResults(
      state,
      candidates,
      stateResults
    );
    return results.divisions[state[0].postalCode];
  }

  checkIfRunoff (results) {
    const runoffs = results.map(r => r.runoff);
    return runoffs.indexOf(true) > -1;
  }

  checkIfUncontested (results) {
    return results[0].candidate.uncontested;
  }

  render () {
    const {election} = this.props;
    const stateResults = this.getStateResults();

    if (!stateResults) return (<div />);

    const { results, precinctsReporting, precinctsTotal } = stateResults;

    const status = {
      reporting: precinctsReporting,
      total: precinctsTotal,
    };

    if (!results) return (<div />);

    results.sort((a, b) => b.votePct - a.votePct);

    const runoff = this.checkIfRunoff(results) ? (
      <span className='runoff'>Race goes to runoff</span>
    ) : null;

    const table = this.checkIfUncontested(results) ? (
      <Uncontested candidate={results[0].candidate} />
    ) : (
      <ResultsTable
        results={results}
        status={status}
      />
    );

    return (
      <article className='results fifty'>
        <header>
          <h4>
            {aliases.adj[election.primary_party.label]} Primary {runoff}
          </h4>
        </header>
        {table}
      </article>
    );
  }
};

export default Table;
