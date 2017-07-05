import React, { Component } from 'react';
import { connect } from 'react-redux';

class Tempo extends Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps (newProps) {
    this.tempo = 60 / newProps.interval;
    if (this.tempo < 72) {
      while (this.tempo < 72) {
        this.tempo += this.tempo;
      }
    } else if (this.tempo > 144 ) {
      while (this.tempo > 144) {
        this.tempo = this.tempo / 2;
      }
    }
    this.tempoHover = this.tempo;
    this.tempo = Math.round(this.tempo * 100) / 100;
  }

  render() {
    return (
     <p
      onClick={this.props.handleModeToggle}
      className="control">
        <span style={{fontSize: '25px'}}>BPM</span>
        {this.tempo ? ` ${this.tempo}` : null}
        <span style={{fontSize: '25px'}}>{this.props.modeIcon}</span>
      </p>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    interval: state.interval
  };
};

export default connect(mapStateToProps)(Tempo);
