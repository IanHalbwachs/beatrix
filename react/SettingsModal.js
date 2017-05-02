import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-modal';
import FileSelector from './FileSelector'

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
    lineHeight: '50px'
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
    this.setState({modalIsOpen: true})
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  closeModal() {
    this.setState({modalIsOpen: false})
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

          <div style={{textAlign: 'center'}} onClick={this.closeModal}>
            <h1 className="beatrix" style={{float: 'right'}}></h1>      
            <h2>Thanks for checking out Beatrix, an interactive sample manipulator by <a href="https://www.linkedin.com/in/ian-halbwachs">Ian Halbwachs</a>.</h2>
            <h2>Click the logo or hit the spacebar to start and stop playback.</h2>
            <h2>Use your mouse or arrow keys to navigate the cells.</h2>
            <h2>Play with the example file or <FileSelector/>!</h2>
            <h2>Take a look <a href="https://glitch.com/edit/#!/beatrix">under the hood</a>.</h2>
          </div>
          
        </Modal>
      </div>
    );
  }
}

export default connect()(SettingsModal)