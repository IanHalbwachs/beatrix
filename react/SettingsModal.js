import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-modal';
import { touch, startStop, setFile } from './index.js'
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
    marginRight: '0%',
    transform: 'translate(-15%, -10%)',
    backgroundColor: 'rgba(255, 255, 255, .9)',
    lineHeight: '40px',
    fontSize: '30px',
    userSelect: 'none',
    cursor: 'default'
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
    this.props.startStop(false)
    this.setState({modalIsOpen: true})
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  closeModal() {
    this.setState({modalIsOpen: false})
    if (!this.props.touched) this.iosAudioContext()
    //if (!this.props.file) this.props.setFile("https://cdn.glitch.com/2ac0ddc9-234b-4e35-8332-f2685f8adf53%2Fjanet.wav?1493346567821")
  }
  
  iosAudioContext() {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      var context = new window.AudioContext();
      Tone.setContext(context)
      this.props.setFile("https://cdn.glitch.com/2ac0ddc9-234b-4e35-8332-f2685f8adf53%2Fjanet.wav?1493346567821")
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

          <div style={{textAlign: 'left'}}>    
            <h1 className="beatrix" style={{float: 'right'}}></h1>
            <p>Beatrix is an interactive sample manipulator by <a href="https://www.linkedin.com/in/ian-halbwachs">Ian Halbwachs</a>.</p>
            <p>Play with the example file or <FileSelector close={this.closeModal}/>!</p>
            <br/>
            <p>Click the logo or hit the spacebar to start and stop playback.</p>
            <p>Use your mouse or arrow keys to navigate the cells.</p>
            <br/>
            <p>>◼> controls chase behavior (auto / random / manual) </p>
            <p>♭ controls the buffer rate (tempo remains constant)</p>
            <br/>
            <p>Take a look <a href="https://glitch.com/edit/#!/beatrix">under the hood</a>.</p>
          </div>
          
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    touched: state.touched,
    file: state.file
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    touch: (touched) => dispatch(touch(touched)),
    startStop: (bool)=> dispatch(startStop(bool)),
    setFile: (file) => dispatch(setFile(file))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal)