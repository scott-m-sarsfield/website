import React, { useReducer } from 'react';
import NumberGuessIntroContent from './stages/number_guess_intro_content';
import NumberGuessLineupContent from './stages/number_guess_lineup_content';
import NumberGuessRevealContent from './stages/number_guess_reveal_content';
import SherlockFrame from './sherlock_frame';
import sherlockReducer, { initialState, actions, stages } from './sherlock_reducer';

function exit() {
  window.location.href = '/games' ;
}

const SherlockGame = () => {
  const [state, dispatch] = useReducer(sherlockReducer, initialState);
  const {
    stage,
    displayedNumbers,
    possibleNumbers: [guessedNumber]
  } = state;

  let content;

  switch (stage) {
    case stages.LINEUP:
      content = (
        <NumberGuessLineupContent
          numbers={displayedNumbers}
          onResponse={(numberDisplayed) => dispatch({ type: actions.ELIMINATE, numberDisplayed })}
        />
      );
      break;
    case stages.REVEAL:
      content = (
        <NumberGuessRevealContent
          number={guessedNumber}
          onPlayAgain={() => dispatch({ type: actions.RESET })}
          onExit={exit}
        />
      );
      break;
    case stages.INTRO:
    default:
      content = (
        <NumberGuessIntroContent
          onStart={() => dispatch({ type: actions.START })}
        />
      );
      break;
  }

  return (
    <SherlockFrame >
      {content}
    </SherlockFrame>
  );
};

export default SherlockGame;
