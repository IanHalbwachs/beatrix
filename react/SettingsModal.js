import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-modal';
import { touch, startStop } from './index.js'
import FileSelector from './FileSelector'
import Tone from 'tone'

const appElement = document.getElementById('hamburger');

const customStyles = {
  overlay : {
    backgroundColor : 'clear'
  },
  content : {
    top: '25%',
    left: '25%',
    marginRight: '-25%',
    transform: 'translate(-25%, -10%)',
    backgroundColor: 'rgba(255, 255, 255, .8)',
    lineHeight: '50px',
    fontSize: '30px'
  }
};


class SettingsModal extends Component {
  constructor() {
    super()

    this.state = {
      modalIsOpen: true
    }

    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal() {
    this.props.stop()
    this.setState({modalIsOpen: true})
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  closeModal() {
    this.setState({modalIsOpen: false})
    if (!this.props.touched) this.iosAudioContext()
  }
  
  iosAudioContext() {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      var context = new window.AudioContext();
      Tone.setContext(context)
      let silence = new Tone.Noise
      silence.mute = true
      silence.connect(Tone.Master)
      silence.start() 
      silence.stop()
      this.props.touch(true)
  }

  render() {
    return (
      <div className="beatrix modal" onClick={this.openModal}>
        Ξ
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <div style={{textAlign: 'center'}}>    
            <h1 className="beatrix" style={{float: 'right'}}></h1>
            <p>Thanks for checking out Beatrix, an interactive sample manipulator by <a href="https://www.linkedin.com/in/ian-halbwachs">Ian Halbwachs</a>.</p>
            <p>Click the logo or hit the spacebar to start and stop playback.</p>
            <p>Use your mouse or arrow keys to navigate the cells.</p>
            <p>Play with the example file or <FileSelector close={this.closeModal}/>!</p>
            <p>Take a look <a href="https://glitch.com/edit/#!/beatrix">under the hood</a>.</p>
          </div>
          
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    touched: state.touched
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    touch: (touched) => dispatch(touch(touched)),
    stop: ()=> dispatch(startStop(false))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal)