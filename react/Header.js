import React, { Component } from 'react';
import { connect } from 'react-redux'
import SettingsModal from './SettingsModal.js'
import { startStop, toggleChase } from './index.js'


const Space = () => (<p style={{width: '5%'}}></p>)

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
          <p className="beatrix"
            onClick={()=> this.props.startStop(!this.props.playing)}>
            BEATRIX
          </p>
          <Space/>        
          <p className="control" 
            onClick={()=> this.props.toggleChase(!this.props.chase)}
            data-on={this.props.chase} >
            >◼>
          </p>
          <Space/>  
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
    // tick: state.tick,
    chase: state.chase
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //setBuffer: (buffer, player) => dispatch(setBuffer(buffer, player)),
    startStop: (playing) => dispatch(startStop(playing)),
    //setClock: (clock) => dispatch(setClock(ctoggleChase(chase)),
    toggleChase: (chase) => dispatch(toggleChase(chase))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)