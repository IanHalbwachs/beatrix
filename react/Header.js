import React, { Component } from 'react';
import { connect } from 'react-redux'
import SettingsModal from './SettingsModal.js'
import { startStop, toggleChase, setFlats } from './index.js'


const Space = () => (<p style={{width: '5%'}}></p>)

class Header extends Component {
  
  constructor() {
    super()
    this.handleFlats = this.handleFlats.bind(this)
  }

  handleFlats(direction) {
    let flats = this.props.flats
    if (direction === 'up' &&  flats > 0) {
      console.log("up",flats,flats-1)
      return this.props.setFlats(flats-1)
    }
    if (direction === 'down' && flats < 12) {
      console.log("down",flats,flats+1)
      return this.props.setFlats(flats+1)
    }
    return
  }

  
  render() {
    return (
    <div className="App-header container">
        <div className="right">
          <SettingsModal/>
        </div>
        <div className="left">
          <p className="beatrix"
            onClick={()=> this.props.startStop(!this.props.playing)}>
            BEATRIX
          </p>
          <Space/>        
          <p className="control" 
            onClick={()=> this.props.toggleChase(!this.props.chase)}>
            {this.props.chase ? ">◼>" : ">◼<"}
          </p>
          <Space/> 
          <p className="control" onClick={()=> this.handleFlats('down')}>⬇</p>
          <p className="control" onClick={()=> this.handleFlats('up')}>⬆</p>
          <p className="control">♭{this.props.flats}</p>
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
    player: state.player,
    //clock: state.clock,
    // tick: state.tick,
    chase: state.chase,
    flats: state.flats
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //setBuffer: (buffer, player) => dispatch(setBuffer(buffer, player)),
    startStop: (playing) => dispatch(startStop(playing)),
    //setClock: (clock) => dispatch(setClock(ctoggleChase(chase)),
    toggleChase: (chase) => dispatch(toggleChase(chase)),
    setFlats: (flats) => dispatch(setFlats(flats))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)