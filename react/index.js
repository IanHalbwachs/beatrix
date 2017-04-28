import React from 'react'
import { render } from 'react-dom'
import App from './App.js';
import { createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { Provider } from 'react-redux'

let initialState = {
  selected: '0',
  playing: false,
  interval: null
}

const SELECT_CELL = 'SELECT_CELL'
const SET_BUFFER = 'SET_BUFFER'
const START_STOP = 'START_STOP'
const TOCK = 'TOCK'
const SET_CLOCK = 'SET_CLOCK'

export function selectCell(selected){
  return {
    type: SELECT_CELL,
    selected
  }
}

export function setBuffer(buffer, player) {
  return {
    type: SET_BUFFER,
    buffer,
    player,
    duration: buffer.duration,
    interval: buffer.duration/16
  }
}

export function startStop(playing) {
  return {
    type: START_STOP,
    playing,
    activeCell: null
  }
}

export function tock(current) {
  return {
    type: TOCK,
    activeCell: current
  }
}

export function setClock(clock) {
  return {
    type: SET_CLOCK,
    clock
  }
}

let reducer = (state = initialState, action) => {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case SELECT_CELL:
      newState.selected = action.selected
      break
    case SET_BUFFER:
      newState.buffer = action.buffer
      newState.player = action.player
      newState.duration = action.duration
      newState.interval = action.interval
      break
    case START_STOP:
      newState.playing = action.playing
      newState.activeCell = action.activeCell
      break
    case TOCK:
      newState.activeCell = action.activeCell
      break
    case SET_CLOCK:
      newState.clock = action.clock
      break
    default:
      return newState 
  }
  // if (true) { //don't bother logging ticks
    console.log('ACTION>', action)
    console.log('STATE>', newState)
  // }
  return newState
}

let store = createStore(reducer, initialState, devToolsEnhancer())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);