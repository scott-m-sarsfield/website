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
    possibleNumbers: [guessedNumber],
    animated
  } = state;

  let content;

  switch (stage) {
    case stages.LINEUP:
      content = (
        <NumberGuessLineupContent
          numbers={displayedNumbers}
          onResponse={(numberDisplayed) => dispatch({ type: actions.ELIMINATE, numberDisplayed })}
          animated={animated}
        />
      );
      break;
    case stages.REVEAL:
      content = (
        <NumberGuessRevealContent
          number={guessedNumber}
          onPlayAgain={() => dispatch({ type: actions.RESET })}
          onExit={exit}
          animated={animated}
        />
      );
      break;
    case stages.INTRO:
    default:
      content = (
        <NumberGuessIntroContent
          onStart={() => dispatch({ type: actions.START })}
          animated={animated}
        />
      );
      break;
  }

  return (
    <SherlockFrame animated={animated} onToggleAnimation={() => dispatch({ type: actions.TOGGLE_ANIMATION })}>
      {content}
    </SherlockFrame>
  );
};

export default SherlockGame;
