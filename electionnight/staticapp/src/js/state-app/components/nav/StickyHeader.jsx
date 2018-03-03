import React from 'react';
import throttle from 'lodash/throttle';
import FlipCard from 'react-flipcard';
import { DivisionLevels } from 'CommonConstants/geography';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import USA from './../../../../img/usa.svg';
import StateNav from './StateNavTop';
import FetchRefresh from 'StateApp/components/nav/FetchRefresh';

class StickyHeader extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      sticky: false,
      navDropped: false,
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
        navDropped: false,
      });
    }
  }
  render () {
    const state = this.props.session.Division.filter({
      level: DivisionLevels.state,
    }).toModelArray();
    if (!state[0]) return (<div />);

    const fetchRefresh = this.props.tabulated ? null : (
      <FetchRefresh
        actions={this.props.actions}
        fetch={this.props.fetch}
      />
    );

    const open = this.state.sticky ? 'open' : '';
    return (
      <div>
        <StateNav open={this.state.navDropped} />
        <div className={`sticky-header ${open}`}>
          <div className='statenav-button'>
            <FlipCard
              type='vertical'
              disabled
              flipped={this.state.navDropped}
            >
              <button
                onClick={() => this.setState({navDropped: true})}
              >
                <USA height={'100%'} width={'90%'} />
              </button>
              <button
                onClick={() => this.setState({navDropped: false})}
              >
                <FontAwesomeIcon
                  icon={faTimes}
                />
              </button>
            </FlipCard>
          </div>
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
          {fetchRefresh}
        </div>
      </div>
    );
  }
};

export default StickyHeader;
