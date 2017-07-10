import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setFile, touch } from './index.js';

class FileSelector extends Component {

  constructor(props) {
    super(props);
    this.handleFile = this.handleFile.bind(this);
  }

  handleFile(e) {
    this.props.setFile(e.target.files[0]);
    setTimeout(() => this.props.close(), 50);
  }

  render() {
    return (
      <span id="file-selector">
        <label style={{color: 'cornflowerblue', cursor: 'pointer'}}>load your own<input type="file" style={{display: 'none'}} id="input" onChange={this.handleFile} /></label>
      </span>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
  return  {
    setFile: (file) => dispatch(setFile(file)),
    touch: () => dispatch(touch(true))
  };
};

export default connect(null, mapDispatchToProps)(FileSelector);
