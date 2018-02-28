import React from 'react';
import { DivisionLevels } from 'CommonConstants/geography';
import 'SCSS/state-app/components/county-map.scss';

class CountyMap extends React.Component {
  constructor (props) {
    super(props);
    this.getCountyResults = this.getCountyResults.bind(this);
  }
  getCountyResults () {
    const divisions = this.props.session.Division.filter(d =>
      d.level === DivisionLevels.county ||
      d.level === DivisionLevels.state).toModelArray();
    return this.props.election.serializeResults(divisions);
  }

  render () {
    // console.log('CountyResults', this.getCountyResults());
    return (
      <section className='results-map col-6'>
        <div className='map' />
      </section>
    );
  }
};

export default CountyMap;
