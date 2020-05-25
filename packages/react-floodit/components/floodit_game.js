import React, { useReducer } from 'react';
import FloodItGrid from './floodit_grid';
import FloodItButtons from './floodit_buttons';
import floodItReducer, { initialState, actions } from './floodit_reducer';

import './floodit_game.scss';

const FloodItGame = () => {
  const [state, dispatch] = useReducer(floodItReducer, initialState);
  const {
    grid,
    moveCount,
    gameOver
  } = state;
  return (
    <div className="floodit-game">
      <div className="premise-menu">
        <div>
          <h5>Premise</h5>
          <span>
            {
              `
          Starting at the top left corner, click the color buttons below the grid to
          change the color of the "flood" (the group of adjacent cells starting at the top-left).
          `
            }
          </span>
        </div>
        <div className="restart-button">
          <button onClick={() => dispatch({ type: actions.NEW_GAME })}>
          New Game
          </button>
        </div>
      </div>
      <div className="game-area">
        <div className="playable-area">
          <div style={{ textAlign: 'right' }}>{moveCount}</div>
          <FloodItGrid grid={grid} />
          <FloodItButtons onSelectColor={(color) => dispatch({ type: actions.SELECT_COLOR, color })} />
        </div>
        {gameOver && (
          <div className="game-over-screen">
            <span>
              Well done!
              <br />
              <br />
              {`You flooded the board in ${moveCount} moves!`}
              <br />
              <button onClick={() => dispatch({ type: actions.NEW_GAME })}>Play Again</button>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloodItGame;
