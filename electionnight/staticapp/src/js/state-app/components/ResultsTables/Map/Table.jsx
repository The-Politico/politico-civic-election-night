import React from 'react';
import { intcomma } from 'journalize';
import CandidateRow from './CandidateRow';
import HeaderRow from './HeaderRow';
import TotalRow from './TotalRow';
import {decimalToPercent} from 'CommonUtils/numbers';

class Table extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      expanded: false,
    };

    this.onExpandClick = ::this.onExpandClick;
  }

  onExpandClick (e) {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render () {
    let total = 0;
    this.props.results.forEach((result) => {
      total += result.voteCount;
    });

    if (total === 0) {
      this.props.results.sort((a, b) => {
        if(a.candidate.lastName < b.candidate.lastName) return -1;
        if(a.candidate.lastName > b.candidate.lastName) return 1;
        return 0;
      });
    }

    const candidateResults = this.props.results.map((result, i) => (
      <CandidateRow
        key={result.candidate.id}
        result={result}
        candidateKeys={this.props.candidateKeys}
        candidateColors={this.props.candidateColors}
        jungle={this.props.jungle}
        i={i}
        expand={this.state.expanded}
      />
    ));

    let expandTable = null;
    if (this.props.results.length >= 8) {
      expandTable = (
        <tr onClick={this.onExpandClick} className='expand-row'>
          <td colSpan='2' />
          <td colSpan='5' className='expand'>
            <span className={this.state.expanded ? 'hide' : 'show'}>
              Show {this.state.expanded ? 'fewer' : 'more'} candidates
            </span>
          </td>
        </tr>
      );
    }

    const incumbent = this.props.results.map(d => d.candidate.incumbent).some(d => d);

    return (
      <section className='results-table forty-five'>
        <table className={this.props.jungle ? 'jungle' : ''}>
          <tbody>
            <HeaderRow jungle={this.props.jungle} />
            {candidateResults}
            {expandTable}
            <tr>
              <td
                colSpan={this.props.jungle ? '5' : '4'}
                className='precincts-reporting'
              >
                {decimalToPercent(this.props.status.pct)}% of precincts reporting
                ({intcomma(this.props.status.reporting)}/
                {intcomma(this.props.status.total)})
              </td>
              <td
                className='incumbent'
                hidden={!incumbent}
              >*Incumbent</td>
            </tr>
            <TotalRow total={total} />
          </tbody>
        </table>
      </section>
    );
  }
}

export default Table;
