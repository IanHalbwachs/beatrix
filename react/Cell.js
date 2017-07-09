import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectCell } from './index.js';
import drawBuffer from 'draw-wave';

class Cell extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {};
  }

  handleClick(e) {
    this.props.clickCell(this.props.id);
  }

  componentWillReceiveProps (newProps) {
    const id = +this.props.id;
    if (newProps.buffer !== this.props.buffer) {
      const cellSlice = [newProps.interval * id, newProps.interval * (id + 1)];
      const cellBuffer = newProps.buffer.slice(...cellSlice);
      this.setState({
        cellBuffer
      });
      const cellCanvas = document.querySelector(`#canvas-${this.props.id}`);
      cellCanvas.getContext('2d').clearRect(0, 0, cellCanvas.width, cellCanvas.height);
      drawBuffer.canvas(cellCanvas, cellBuffer, 'lightyellow');
    }
  }

  render() {
    const selected = this.props.selected;
    const activeCell = this.props.activeCell;
    const id = this.props.id;
    const interval = this.props.interval;
    const animationStyle = {animationDuration: interval + 's' };
    const width = {width: 100 * Math.pow(2, this.props.flats / 12) + '%'};
    return (
     <p className="cell" id={id} data-selected={selected === id} data-active={activeCell === id} style={animationStyle} onClick={this.handleClick}>
        <canvas id={'canvas-' + id} style={width} />
     </p>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selected: state.selected,
    buffer: state.buffer,
    player: state.player,
    interval: state.interval,
    activeCell: state.activeCell,
    flats: state.flats
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clickCell: (selected) => dispatch(selectCell(selected))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
