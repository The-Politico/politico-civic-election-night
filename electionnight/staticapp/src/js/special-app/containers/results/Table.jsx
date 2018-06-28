import React from 'react';
import ResultsTable from 'SpecialApp/components/ResultsTables/Table';
import Uncontested from 'SpecialApp/components/ResultsTables/Uncontested';

class Table extends React.Component {
  constructor (props) {
    super(props);
    this.getStateResults = this.getStateResults.bind(this);
  }

  getStateResults () {
    const {state, stateResults, overrideStateResults, election, candidates} = this.props;
    const resultsSet = election.apMeta.overrideApVotes ? overrideStateResults : stateResults;

    const results = election.serializeWithResults(
      state,
      candidates,
      resultsSet
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

    const { results, precinctsReporting, precinctsReportingPct, precinctsTotal } = stateResults;

    const status = {
      reporting: precinctsReporting,
      pct: precinctsReportingPct,
      total: precinctsTotal,
    };

    if (!results) return (<div />);

    results.sort((a, b) => b.votePct - a.votePct);

    const table = this.checkIfUncontested(results) ? (
      <Uncontested candidate={results[0].candidate} />
    ) : (
      <ResultsTable
        results={results}
        status={status}
      />
    );

    const runoff = this.checkIfRunoff(results) ? (
      <span className='runoff'>Race goes to runoff</span>
    ) : null;

    return (
      <article className={`results race-table-${election.apMeta.id}`}>
        <header>
          <h4>{this.props.elections[0].office.label} {runoff}</h4>
        </header>
        {table}
      </article>
    );
  }
};

export default Table;
