import React, { Component } from 'react';
import { connect } from 'react-redux';
import SettingsModal from './SettingsModal.js';
import Tempo from './Tempo.js';
import { startStop, toggleChase, setFlats, toggleMode } from './index.js';


const Space = () => (<p style={{width: '5%'}} />);

class Header extends Component {

  constructor() {
    super();
    this.handleFlats = this.handleFlats.bind(this);
    this.handleChaseToggle = this.handleChaseToggle.bind(this);
    this.handleModeToggle = this.handleModeToggle.bind(this);
    this.chaseIcon = '>◼>';
    this.modeIcon = '';
  }

  componentWillReceiveProps (newProps) {
    if (this.props.chase !== newProps.chase ) {
      switch (newProps.chase) {
        case 'on': this.chaseIcon = '>◼>';
          break;
        case 'off': this.chaseIcon = '>◼<';
          break;
        case 'random': this.chaseIcon = '>◼?';
          break;
        default: this.chaseIcon = '>◼>';
          break;
      }
    }
    if (this.props.mode !== newProps.mode ) {
      switch (newProps.mode) {
        case 'normal': this.modeIcon = '';
          break;
        case 'delta': this.modeIcon = '⇡';
          break;
        case 'half': this.modeIcon = '÷2';
          break;
        default: this.modeIcon = '';
          break;
      }
    }
  }

  handleFlats(direction) {
    let flats = this.props.flats;
    if (direction === 'up' &&  flats > 0) {
      console.log('up', flats, flats - 1);
      return this.props.setFlats(flats - 1);
    }
    if (direction === 'down' && flats < 12) {
      console.log('down', flats, flats + 1);
      return this.props.setFlats(flats + 1);
    }

  }

  handleChaseToggle() {
    let chase;
    switch (this.props.chase) {
      case 'off':
        chase = 'on';
        break;
      case 'on':
        chase = 'random';
        break;
      case 'random':
        chase = 'off';
        break;
      default:
        chase = 'on';
    }
    this.props.toggleChase(chase);
  }

  handleModeToggle() {
    let mode;
    switch (this.props.mode) {
      case 'normal':
        mode = 'delta';
        break;
      case 'delta':
        mode = 'half';
        break;
      case 'half':
        mode = 'normal';
        break;
      default:
        mode = 'normal';
    }
    this.props.toggleMode(mode);
  }

  render() {
    return (
    <div className="App-header container">
        <div className="right">
          <SettingsModal />
        </div>
        <div className="left">
          <p
            className="beatrix"
            onClick={() => this.props.startStop(!this.props.playing)}>
            BEATRIX
          </p>
          <Space />
          <p
            className="control"
            style={{width: '7%'}}
            onClick={this.handleChaseToggle}>
            {this.chaseIcon}
          </p>
          <Space />
          <p
            className="control"
            style={{fontSize: '30px'}}
            onClick={() => this.handleFlats('down')}>
            ⬇
          </p>
          <p
            className="control"
            style={{fontSize: '30px'}}
            onClick={() => this.handleFlats('up')}>
            ⬆
          </p>
          <p
            className="control"
            style={{width: '10%'}}>
            ♭{this.props.flats}
          </p>
            <Tempo
              handleModeToggle={this.handleModeToggle}
              modeIcon={this.modeIcon} />
        </div>
    </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    interval: state.interval,
    playing: state.playing,
    player: state.player,
    chase: state.chase,
    flats: state.flats,
    mode: state.mode
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startStop: (playing) => dispatch(startStop(playing)),
    toggleChase: (chase) => dispatch(toggleChase(chase)),
    setFlats: (flats) => dispatch(setFlats(flats)),
    toggleMode: (mode) => dispatch(toggleMode(mode))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
