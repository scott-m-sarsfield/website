import React, { useReducer, useEffect } from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import FloodItGrid from './floodit_grid';
import FloodItButtons from './floodit_buttons';
import floodItReducer, { initialState, actions } from './floodit_reducer';

import './floodit_game.scss';

const keyMap = {
  RESET: 'r',
  COLOR_0: ['s', '1'],
  COLOR_1: ['d', '2'],
  COLOR_2: ['f', '3'],
  COLOR_3: ['j', '4'],
  COLOR_4: ['k', '5'],
  COLOR_5: ['l', '6']
};

const FloodItGame = () => {
  const [state, dispatch] = useReducer(floodItReducer, initialState);
  const {
    grid,
    moveCount,
    gameOver
  } = state;

  useEffect(() => {
    dispatch({ type: actions.NEW_GAME });
  }, []);

  const keyHandlers = {
    RESET: () => dispatch({ type: actions.NEW_GAME }),
    COLOR_0: () => dispatch({ type: actions.SELECT_COLOR, color: 0 }),
    COLOR_1: () => dispatch({ type: actions.SELECT_COLOR, color: 1 }),
    COLOR_2: () => dispatch({ type: actions.SELECT_COLOR, color: 2 }),
    COLOR_3: () => dispatch({ type: actions.SELECT_COLOR, color: 3 }),
    COLOR_4: () => dispatch({ type: actions.SELECT_COLOR, color: 4 }),
    COLOR_5: () => dispatch({ type: actions.SELECT_COLOR, color: 5 })
  };

  return (
    <div className="floodit-game">
      <GlobalHotKeys keyMap={keyMap} handlers={keyHandlers} />
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
          <br />
          <br />
        </div>
        <div className="shortcuts-and-actions">
          <div className="keyboard-shortcut-info">
            <h5>Keyboard Shortcuts</h5>
            <ul>
              <li>
                <span className="label">Restart </span>
                <span className="key">r</span>
              </li>
              <li>
                <span className="label">Colors </span>
                <span>
                  <span className="key">s</span>
                  <span className="key">d</span>
                  <span className="key">f</span>
                  <span className="key">j</span>
                  <span className="key">k</span>
                  <span className="key">l</span>
                </span>
              </li>
              <li>
                <span className="label">Colors (alternative) </span>
                <span>
                  <span className="key">1</span>
                  <span className="key">2</span>
                  <span className="key">3</span>
                  <span className="key">4</span>
                  <span className="key">5</span>
                  <span className="key">6</span>
                </span>
              </li>
            </ul>
          </div>
          <div className="restart-button">
            <button onClick={() => dispatch({ type: actions.NEW_GAME })}>
          New Game
            </button>
          </div>
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
