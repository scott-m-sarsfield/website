import React, { useReducer } from 'react';
import fill from 'lodash/fill';
import FloodItGrid from './floodit_grid';
import FloodItButtons from './floodit_buttons';
import { DIMENSION } from '../constants';

import './floodit_game.scss';

const actions = {
  SELECT_COLOR: 'selectColor'
};

const initialState = {
  grid: fill(new Array(DIMENSION * DIMENSION), 0)
};

const floodItGameplay = {
  [actions.SELECT_COLOR]: (state, { color }) => ({
    ...state,
    grid: fill([...state.grid], color)
  })
};

const floodItReducer = (state, { type, ...otherArgs }) => {
  return floodItGameplay[type](state, { ...otherArgs });
};

const FloodItGame = () => {
  const [state, dispatch] = useReducer(floodItReducer, initialState);
  const {
    grid
  } = state;
  return (
    <div className="floodit-game">
      <FloodItGrid grid={grid} />
      <FloodItButtons onSelectColor={(color) => dispatch({ type: actions.SELECT_COLOR, color })} />
    </div>
  );
};

export default FloodItGame;
