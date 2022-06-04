import React from 'react';
import types from 'prop-types';
import Dialogue from '../dialogue';
import SherlockButton from './sherlock_button';

const CardGuessInstructionContent = ({ onStart, animated }) => (
  <React.Fragment>
    <Dialogue className="jrpg" animated={animated} showCharacter={true}>
      {`
            I want you to think of a card in a standard playing card deck. 
          `}
      <br />
      <br />
      {`
          Then I will show you several line ups of cards, and you will tell me if your card is in each line up.
        `}
      <br />
      <br />
      {`
        Then I will know your card.
      `}
      <br />
      <br />
      Ready?
    </Dialogue>
    <div
      className="jrpg"
      style={{ display: 'flex', justifyContent: 'space-evenly' }}
    >
      <SherlockButton onClick={onStart}>Ready!</SherlockButton>
    </div>
  </React.Fragment>
);

CardGuessInstructionContent.propTypes = {
  onStart: types.func.isRequired,
  animated: types.bool,
};

export default CardGuessInstructionContent;
