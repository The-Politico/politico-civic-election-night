import React from 'react';
import CountdownFetch from 'politico-countdown-fetch';
import debounce from 'lodash/debounce';
import refreshRates from 'CommonConstants/api';

// Initialize the chart
const chart = CountdownFetch();

class FetchRefresh extends React.Component {
  constructor (props) {
    super(props);
    this.drawChart = this.drawChart.bind(this);
    this.newResults = this.newResults.bind(this);
  }

  // Called first time our component is mounted, i.e., just once.
  componentDidMount () {
    this.drawChart();

    // Attach a resize func here!
    window.addEventListener('resize', debounce(() => {
      chart.resize();
    }, 400));
  }

  // Called every time our component's props update,
  // i.e., whenever our data updates.
  componentDidUpdate () {
    this.drawChart();
    if (this.props.fetch.notifyNew) this.newResults();
  }

  /* eslint-disable class-methods-use-this */
  // Calls our chart's create function.
  // (Must be able to be called multiple times, i.e., idempotent charts!)
  drawChart () {
    chart.create('#fetch-refresh-top', {
      refreshTime: refreshRates.results / 1000,
      width: 140,
      height: 12,
      originOffset: 4,
    });
  }

  newResults () {
    chart.succeed();
    this.props.actions.resetNotifyResults();
  }

  render () {
    return (
      <div className='fetch-refresh'>
        <div
          id='fetch-refresh-top'
          style={{
            width: 140 + 30,
            height: 50,
          }}
        />
      </div>
    );
  }
}

export default FetchRefresh;
