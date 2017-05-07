import React, { Component } from 'react';
import { connect } from 'react-redux'
import MatrixContainer from './MatrixContainer.js'
import FileSelector from './FileSelector.js'
import Header from './Header.js'
import { setBuffer, startStop, setClock, tock, selectCell } from './index.js'
import Tone from 'tone'
import createObjectUrl from 'create-object-url'

class App extends Component {
  
  constructor(props) {
    super(props)
    this.tick = this.tick.bind(this)
    this.loadFile = this.loadFile.bind(this)
    this.iosAudioContext = this.iosAudioContext.bind(this)
    
    this.state = {
      touched: false
    }
  }
  
  componentWillMount() {
    this.loadFile(this.props.file)
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
    if (newProps.file !== this.props.file) {
      this.loadFile(newProps.file)
    }
  }
  
  loadFile(file) {
    let url = typeof file === 'object' ? createObjectUrl(file) : file
      let newBuffer = new Tone.Buffer(url, () => {
        let newPlayer = new Tone.Player(url, ()=> {
            this.props.setBuffer(newBuffer, newPlayer)
        }).toMaster() // should be able to pass buffer in to player per docs but is no work
      newPlayer.loop = true
    })
  }
  
  tick(time) {
    console.log('tick')
    let startPos = +this.props.selected * +this.props.interval
    this.props.player.start(time, startPos)
    let current = this.props.selected
    let next = (+this.props.selected + 1)%16 +''
    this.props.tock(current) // switch 2nd arg to next for chasing behavior
    if (this.props.chase) this.props.selectCell(next)
  }
  
  iosAudioContext() { //incomplete
    if (!this.state.touched) {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      var context = new window.AudioContext();
      // create a dummy sound - and play it immediately in same 'thread'
      Tone.setContext(context)
      this.loadFile(this.props.file, true)
      this.setState({touched: true})
    }
  }
  
  render() {
    
    let animationStyle = {animationDuration: this.props.interval*4+'s' }
    
    return (
      <div className="App" id="app" data-playing={this.props.playing} style={animationStyle}>
        <Header/>
          <MatrixContainer/>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    playing: state.playing,
    interval: state.interval,
    player: state.player,
    selected: state.selected,
    file: state.file,
    chase: state.chase
  }
}
  
const mapDispatchToProps = (dispatch) => {
  return {
    setBuffer: (buffer, player) => dispatch(setBuffer(buffer, player)),
    startStop: (playing) => dispatch(startStop(playing)),
    setClock: (clock) => dispatch(setClock(clock)),
    tock: (current) => dispatch(tock(current)),
    selectCell: (next) => dispatch(selectCell(next))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
