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

    const runoff = this.checkIfRunoff(results) ? (
      <span className='runoff'>Race goes to runoff</span>
    ) : null;

    const table = this.checkIfUncontested(results) ? (
      <Uncontested
        candidate={results[0].candidate}
        jungle={election.primary_party === undefined}
      />
    ) : (
      <ResultsTable
        electionID={election.apMeta.id}
        results={results}
        status={status}
        jungle={election.primary_party === undefined}
      />
    );

    const partyLabel = election.primary_party ? aliases.adj[election.primary_party.label] : 'Open';

    const addendum = election.primary_party ? null : '(top two advance to general)';

    return (
      <article className={`results ${election.primary_party ? 'fifty' : 'jungle'}`}>
        <header>
          <h4>
            {partyLabel} Primary {runoff} {addendum}
          </h4>
        </header>
        {table}
      </article>
    );
  }
};

export default Table;
