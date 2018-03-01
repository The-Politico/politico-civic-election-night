import React from 'react';
import { DivisionLevels } from 'CommonConstants/geography';
import PrimaryCountyResults from 'civic_map-county-primary-results';
import 'SCSS/state-app/components/county-map.scss';

class CountyMap extends React.Component {
  constructor (props) {
    super(props);
    this.getCountyResults = this.getCountyResults.bind(this);
  }
  componentDidUpdate () {
    const geometry = this.props.session.Geometry
      .filter({level: 'county'}).toModelArray();
    if (geometry.length === 0) return;
    const ResultsMap = PrimaryCountyResults();
    const geoData = geometry[0].topojson;
    const electionData = this.getCountyResults();
    ResultsMap.create(
      `#map-${this.props.election.id}`,
      geoData,
      electionData,
      {
        candidateColors: this.props.candidateColors,
      }
    );
  }
  getCountyResults () {
    const divisions = this.props.session.Division.filter(d =>
      d.level === DivisionLevels.county ||
      d.level === DivisionLevels.state).toModelArray();
    return this.props.election.serializeResults(divisions);
  }

  render () {
    return (
      <section className='results-map forty-five'>
        <div
          className='county-map'
          id={`map-${this.props.election.id}`}
        />
      </section>
    );
  }
};

export default CountyMap;
