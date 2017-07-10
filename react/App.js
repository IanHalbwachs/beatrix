import React, { Component } from 'react';
import { connect } from 'react-redux';
import MatrixContainer from './MatrixContainer.js';
import Header from './Header.js';
import { setBuffer, startStop, setClock, tock, selectCell } from './index.js';
import Tone from 'tone';
import createObjectUrl from 'create-object-url';

class App extends Component {

  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.loadFile = this.loadFile.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.interval !== this.props.interval ) {
      const clock = new Tone.Clock((time) => {
        if (clock.ticks > 0) { // ignore glitchy 1st tick
          this.tick(time);
        }
      }, 1 / newProps.interval);
      this.props.setClock(clock);
    }
    if (newProps.file !== this.props.file) {
      this.loadFile(newProps.file);
    }
    if (newProps.flats !== this.props.flats) {
      this.props.player.playbackRate = 1 / Math.pow(2, newProps.flats / 12);
    }
    // if (newProps.mode === 'delta') {
    //   this.props.player.playbackRate = 1;
    //   this.props.interval = 1 / Math.pow(2, newProps.flats / 12);
    // }
  }

  loadFile(file) {
    const url = typeof file === 'object' ? createObjectUrl(file) : file;
    const env = new Tone.ScaledEnvelope(0.005, 0, 1, 0.005);
    env.min = 1;
    env.max = 0;
    const gain = new Tone.Gain().toMaster();
    env.connect(gain.gain);
    const newBuffer = new Tone.Buffer(url, () => {
        const newPlayer = new Tone.Player(url, () => {
            this.props.setBuffer(newBuffer, newPlayer, env, newBuffer.duration / 16);
            //this.props.startStop(true)
            //setTimeout(this.props.startStop, 10, false)
        }).connect(gain); // should be able to pass buffer in to player per docs but is no work
      newPlayer.loop = true;
    });
  }

  tick(time) {
    console.log('tick', time);
    const startPos = +this.props.selected * +this.props.interval;
    const current = this.props.selected;
    const next = (+this.props.selected + 1) % 16 + '';
    this.props.env.triggerAttackRelease(0.005, time - 0.005);
    this.props.player.start(time, startPos);
    this.props.tock(current);
    if (this.props.chase === 'on') this.props.selectCell(next);
    if (this.props.chase === 'random') {
      if (Math.random() < 0.4) {
        this.props.selectCell(Math.floor(Math.random() * 16) + '');
      } else {
        this.props.selectCell(next);
      }
    }

  }

  render() {
    const animationStyle = {animationDuration: this.props.interval * 4 + 's' };

    return (
      <div className="App" id="app" data-playing={this.props.playing} style={animationStyle}>
        <Header />
          <MatrixContainer />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    playing: state.playing,
    interval: state.interval,
    player: state.player,
    env: state.env,
    selected: state.selected,
    file: state.file,
    chase: state.chase,
    flats: state.flats,
    touched: state.touched,
    mode: state.mode
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBuffer: (buffer, player, env, interval) => dispatch(setBuffer(buffer, player, env, interval)),
    startStop: (playing) => dispatch(startStop(playing)),
    setClock: (clock) => dispatch(setClock(clock)),
    tock: (current) => dispatch(tock(current)),
    selectCell: (next) => dispatch(selectCell(next))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
