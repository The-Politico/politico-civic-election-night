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
    const {state, stateResults, overrideStateResults, election, candidates} = this.props;
    const resultsSet = election.apMeta.overrideApVotes ? overrideStateResults : stateResults;

    const results = election.serializeWithResults(
      state,
      candidates,
      resultsSet
    );
    return results.divisions[state[0].postalCode];
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

    return (
      <article className='results fifty'>
        <header>
          <h4>
            {aliases.adj[election.primary_party.label]} Primary Runoff
          </h4>
        </header>
        {table}
      </article>
    );
  }
};

export default Table;