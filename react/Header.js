import React, { Component } from 'react';
import { connect } from 'react-redux'
import SettingsModal from './SettingsModal.js'
import { startStop } from './index.js'

class Header extends Component {
  
  constructor() {
    super()
  }
  
  render() {
    return (
    <div className="App-header container">
        <div className="right">
          <SettingsModal/>
        </div>
        <div className="left">
          <p className="beatrix" onClick={()=> this.props.startStop(!this.props.playing)}>BEATRIX</p><p> </p>
        </div>
    </div>
    )
  }
  
}

const mapStateToProps = (state) => {
  return { 
    //selected: state.selected,
    //interval: state.interval,
    playing: state.playing,
    //player: state.player,
    //clock: state.clock,
    // tick: state.tick
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //setBuffer: (buffer, player) => dispatch(setBuffer(buffer, player)),
    startStop: (playing) => dispatch(startStop(playing)),
    //setClock: (clock) => dispatch(setClock(clock)),
    //tock: (current) => dispatch(tock(current))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)