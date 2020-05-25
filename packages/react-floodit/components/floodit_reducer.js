import reduce from 'lodash/reduce';
import { DIMENSION, COLORS } from '../constants';

export const actions = {
  SELECT_COLOR: 'selectColor',
  NEW_GAME: 'newGame'
};

function randomInt(start, endExclusive) {
  return Math.floor(Math.random() * (endExclusive - start)) + start;
}

function randomGrid() {
  let grid = [];
  for (let i = 0; i < DIMENSION * DIMENSION; i++) {
    grid.push(randomInt(0, COLORS.length));
  }
  return grid;
}

export const initialState = {
  grid: randomGrid(),
  moveCount: 0,
  gameOver: false
};

const floodItGameplay = {
  [actions.NEW_GAME]: () => ({
    grid: randomGrid(),
    moveCount: 0,
    gameOver: false
  }),
  [actions.SELECT_COLOR]: (state, { color }) => {
    const { grid: oldGrid, moveCount } = state;
    const oldColor = oldGrid[0];
    const cellsToChange = { };
    const cellsToVisit = [0];

    if (color === oldColor) {
      return state;
    }

    while (cellsToVisit.length > 0) {
      const cell = cellsToVisit.pop();
      cellsToChange[cell] = true;

      const x = cell % DIMENSION;
      const y = Math.floor(cell / DIMENSION);

      const cellOnLeftHasSameColor = x !== 0 && oldGrid[cell - 1] === oldColor;
      const cellOnRightHasSameColor = x !== DIMENSION - 1 && oldGrid[cell + 1] === oldColor;
      const cellAboveHasSameColor = y !== 0 && oldGrid[cell - DIMENSION] === oldColor;
      const cellBelowHasSameColor = y !== DIMENSION - 1 && oldGrid[cell + DIMENSION] === oldColor;

      if (cellOnLeftHasSameColor && !cellsToChange[cell - 1]) {
        cellsToVisit.push(cell - 1);
      }
      if (cellOnRightHasSameColor && !cellsToChange[cell + 1]) {
        cellsToVisit.push(cell + 1);
      }
      if (cellAboveHasSameColor && !cellsToChange[cell - DIMENSION]) {
        cellsToVisit.push(cell - DIMENSION);
      }
      if (cellBelowHasSameColor && !cellsToChange[cell + DIMENSION]) {
        cellsToVisit.push(cell + DIMENSION);
      }
    }

    const grid = reduce(cellsToChange, (grid, _, index) => {
      grid[index] = color;
      return grid;
    }, [...oldGrid]);

    return {
      ...state,
      grid,
      gameOver: grid.every((value) => value === color),
      moveCount: moveCount + 1
    };
  }
};

const floodItReducer = (state, { type, ...otherArgs }) => {
  return floodItGameplay[type](state, { ...otherArgs });
};

export default floodItReducer;
