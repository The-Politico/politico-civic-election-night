import React from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import { DivisionLevels } from 'CommonConstants/geography';

class Map extends React.Component {
  componentDidUpdate () {
    if (!this.props.district) return;
    const square = 75;
    const {session, district} = this.props;
    const districts = session.Geometry.filter({
      level: DivisionLevels.district,
    }).toModelArray();
    if (!districts[0]) return;
    const geoData = districts[0].topojson;

    const features = topojson.feature(geoData, {
      type: 'GeometryCollection',
      geometries: geoData.objects['-'].geometries,
    });

    const path = d3.geoPath()
      .projection(
        d3.geoMercator()
          .fitSize([square, square], features)
      );

    const svg = d3.select(`#district-${district}`)
      .attr('width', square)
      .attr('height', square);
    const paths = svg.selectAll('path')
      .data(features.features);

    paths.enter().append('path')
      .merge(paths)
      .attr('d', path)
      .attr('fill', (d) => {
        return d.properties.district === this.props.district.toString()
          ? '#333' : '#eee';
      });
  }
  render () {
    if (!this.props.district) return (<div />);
    return (
      <div className='mapContainer'>
        <div className='map'>
          <svg id={`district-${this.props.district}`} />
        </div>
      </div>
    );
  }
}

export default Map;
