import React, { Component } from 'react';
import { connect } from 'react-redux'
import MatrixContainer from './MatrixContainer'
import { setBuffer, startStop, setClock, tock } from './index.js'
import Tone from 'tone'

class App extends Component {
  
  constructor(props) {
    super(props)
    this.tick = this.tick.bind(this)
  }
  
  componentWillMount() {
    let buffer = new Tone.Buffer("https://cdn.glitch.com/2ac0ddc9-234b-4e35-8332-f2685f8adf53%2Fjanet.wav?1493346567821", () => {
      let player = new Tone.Player("https://cdn.glitch.com/2ac0ddc9-234b-4e35-8332-f2685f8adf53%2Fjanet.wav?1493346567821", ()=> {
          this.props.setBuffer(buffer, player)
      }).toMaster() // should be able to pass buffer in to player per docs but is no work
      player.loop = true
    })
  }
  
  componentWillReceiveProps(newProps) {
    if (newProps.interval !== this.props.interval ) {
      let clock = new Tone.Clock((time) => {
        if (clock.ticks > 0) { // ignore glitchy 1st tick
          this.tick(time)
          console.log('tick')
        }
      }, 1/newProps.interval)
      this.props.setClock(clock)
    }
  }
  
  tick(time) {
    console.log('tick')
    let startPos = +this.props.selected * +this.props.interval
    this.props.player.start(time, startPos)
    let current = this.props.selected
    let next = (+this.props.selected + 1)%16 +''
    this.props.tock(current, current)
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Beatrix - beta! Hit spacebar  to start/stop and use mouse or arrow keys to navigate cells.</h2>
        </div>
        <div id="matrix-container">
          <MatrixContainer/>
        </div>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    playing: state.playing,
    interval: state.interval,
    player: state.player,
    selected: state.selected
  }
}
  
const mapDispatchToProps = (dispatch) => {
  return {
    setBuffer: (buffer, player) => dispatch(setBuffer(buffer, player)),
    startStop: (playing) => dispatch(startStop(playing)),
    setClock: (clock) => dispatch(setClock(clock)),
    tock: (current) => dispatch(tock(current))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)