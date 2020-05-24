import React from 'react';
import types from 'prop-types';
import Dialogue from '../dialogue';
import PlayingCard from './playing_card';
import SherlockButton from './sherlock_button';

const CardGuessRevealContent = ({ number, onPlayAgain, onExit, animated }) => (
  <React.Fragment>
    <Dialogue className="jrpg" animated={animated}>
      {`
            I have determined that your card is...
          `}
      <br />
      <br />
      <div>
        <PlayingCard number={number} />
      </div>
      <br />
      <br />
      {`
        Do you want to play again?
      `}
    </Dialogue>
    <div className="jrpg" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <SherlockButton onClick={onExit}>Exit</SherlockButton>
      <SherlockButton onClick={onPlayAgain}>Play Again</SherlockButton>
    </div>
  </React.Fragment>
);

CardGuessRevealContent.propTypes = {
  number: types.number,
  onExit: types.func.isRequired,
  onPlayAgain: types.func.isRequired,
  animated: types.bool
};

CardGuessRevealContent.defaultProps = {
  number: 15
};

export default CardGuessRevealContent;
