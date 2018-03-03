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
      .filter({level: DivisionLevels.county}).toModelArray();
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
        tieColor: '#282828',
      }
    );
  }
  getCountyResults () {
    const {counties, countyResults, election, candidates} = this.props;

    return election.serializeWithResults(
      counties,
      candidates,
      countyResults
    );
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
