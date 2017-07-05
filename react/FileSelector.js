import React, { Component } from 'react';
import { connect } from 'react-redux';
import { store, setFile } from './index.js';

class FileSelector extends Component {

  constructor(props) {
    super(props);
    this.handleFile = this.handleFile.bind(this);
  }

  handleFile(e) {
    console.log(e.target.files[0]);
    this.props.setFile(e.target.files[0]);
    this.props.close();
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
    setFile: (file) => dispatch(setFile(file))
  };
};

export default connect(null, mapDispatchToProps)(FileSelector);
