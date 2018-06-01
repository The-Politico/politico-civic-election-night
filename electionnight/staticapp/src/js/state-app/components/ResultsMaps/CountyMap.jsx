import React from 'react';
import { DivisionLevels } from 'CommonConstants/geography';
import PrimaryCountyResults from 'civic_map-county-primary-results';
import debounce from 'lodash/debounce';
import 'SCSS/state-app/components/county-map.scss';

const ResultsMap = PrimaryCountyResults();

class CountyMap extends React.Component {
  constructor (props) {
    super(props);
    this.getCountyResults = this.getCountyResults.bind(this);
  }
  componentDidMount () {
    window.addEventListener('resize', debounce(() => {
      ResultsMap.resize();
    }, 400));
  }
  componentDidUpdate () {
    const geometry = this.props.session.Geometry
      .filter({level: DivisionLevels.county}).toModelArray();
    if (geometry.length === 0) return;
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
    const {counties, countyResults, overrideCountyResults, election, candidates} = this.props;
    const resultsSet = election.apMeta.overrideApVotes ? overrideCountyResults : countyResults;

    return election.serializeWithResults(
      counties,
      candidates,
      resultsSet
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
