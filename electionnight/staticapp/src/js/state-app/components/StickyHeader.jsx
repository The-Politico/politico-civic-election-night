import React from 'react';
import throttle from 'lodash/throttle';
import { DivisionLevels } from 'CommonConstants/geography';

class StickyHeader extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      sticky: false,
    };
    this.setStickyNav = this.setStickyNav.bind(this);
  }
  componentDidMount () {
    window.onscroll = throttle(this.setStickyNav, 250);
  }
  setStickyNav () {
    if (window.scrollY > 200 && !this.state.sticky) {
      this.setState({
        sticky: true,
      });
    }
    if (window.scrollY < 200 && this.state.sticky) {
      this.setState({
        sticky: false,
      });
    }
  }
  render () {
    const state = this.props.session.Division.filter({
      level: DivisionLevels.state,
    }).toModelArray();
    if (!state[0]) return (<div />);

    const open = this.state.sticky ? 'open' : '';
    return (
      <div className={`sticky-header ${open}`}>
        <div className='title'>
          <div className='logo'>
            <span className='icon icon-politico' />
            <span className='icon-text'>POLITICO</span>
            <span className='elex-tag'> Elections</span>
          </div>
          <div className='page-title'>
            <h2>{state[0].label}</h2>
          </div>
        </div>
      </div>
    );
  }
};

export default StickyHeader;
