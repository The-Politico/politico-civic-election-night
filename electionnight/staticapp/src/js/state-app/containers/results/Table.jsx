import React from 'react';
import { DivisionLevels } from 'CommonConstants/geography';
import { aliases } from 'CommonConstants/parties';
import ResultsTable from 'StateApp/components/ResultsTables/Table';
import Uncontested from 'StateApp/components/ResultsTables/Uncontested';

class Table extends React.Component {
  constructor (props) {
    super(props);
    this.getStateResults = this.getStateResults.bind(this);
  }

  getStateResults () {
    const { election } = this.props;

    const state = this.props.session.Division.filter({
      level: DivisionLevels.state,
    }).toModelArray();

    const results = election.serializeResults(state);

    return results.divisions[state[0].postalCode];
  }

  checkRunoff (results) {
    const runoffs = results.map(r => r.runoff);
    return runoffs.indexOf(true) > -1;
  }

  checkUncontested (results) {
    return results[0].candidate.uncontested;
  }

  render () {
    const {election} = this.props;
    const state = this.getStateResults();

    if (!state) return (<div />);

    const { results, precinctsReporting, precinctsTotal } = state;

    const status = {
      reporting: precinctsReporting,
      total: precinctsTotal,
    };

    if (!results) return (<div />);

    results.sort((a, b) => b.votePct - a.votePct);

    const runoff = this.checkRunoff(results) ? (
      <span className='runoff'>Race goes to runoff</span>
    ) : null;

    const table = this.checkUncontested(results) ? (
      <Uncontested candidate={results[0].candidate} />
    ) : (
      <ResultsTable
        results={results}
        status={status}
        {...this.props}
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
