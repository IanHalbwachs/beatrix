
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cell from './Cell.js';
import { selectCell, startStop } from './index.js';


class MatrixContainer extends Component {

  constructor(props) {
    super(props);
    this.handleKeypress = this.handleKeypress.bind(this);
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeypress);
  }

  componentWillReceiveProps(newProps) {
    console.log('matrixContainer newProps/props', newProps, this.props);
    if (newProps.playing !== this.props.playing) {
      if (newProps.playing ) {
        console.log('starting clock??')
        newProps.clock.start();
      }
      if (!newProps.playing) {
        console.log('stopping clock??')
        newProps.player.stop();
        newProps.clock.stop();
      }
    }
  }

  handleKeypress(e) {
    if (!this.props.touched) return;
    const i = this.props.selected;
    const x = i % 4;
    const y = (i - x) / 4;
    switch (e.keyCode) {
      case 32: //spacebar
        e.preventDefault();
        this.props.startStop(!this.props.playing);
        break;
      case 40: //down
        this.props.arrowSelect(x + (1 + y) % 4 * 4 + '');
        break;
      case 38: //up
        this.props.arrowSelect(x + (3 + y) % 4 * 4 + '');
        break;
      case 37: //left
        this.props.arrowSelect(y * 4 + (3 + x) % 4 + '');
        break;
      case 39: //right
        this.props.arrowSelect(y * 4 + (1 + x) % 4 + '');
        break;
      default:

    }
  }

  render() {
    return (
      <div id="matrix" onKeyDown={this.handleKeypress}>
       <div>
        <Cell id="0" />
        <Cell id="1" />
        <Cell id="2" />
        <Cell id="3" />
       </div>
       <div>
        <Cell id="4" />
        <Cell id="5" />
        <Cell id="6" />
        <Cell id="7" />
       </div>
       <div>
        <Cell id="8" />
        <Cell id="9" />
        <Cell id="10" />
        <Cell id="11" />
       </div>
       <div>
        <Cell id="12" />
        <Cell id="13" />
        <Cell id="14" />
        <Cell id="15" />
       </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selected: state.selected,
    interval: state.interval,
    playing: state.playing,
    player: state.player,
    clock: state.clock,
    touched: state.touched,
    file: state.file
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    arrowSelect: (selected) => dispatch(selectCell(selected)),
    startStop: (playing) => dispatch(startStop(playing))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MatrixContainer);
