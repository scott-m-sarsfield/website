import React from 'react';
import types from 'prop-types';
import Dialogue from '../dialogue';
import NumberCard from './number_card';
import SherlockButton from './sherlock_button';

const NumberGuessRevealContent = ({ number, onPlayAgain, onExit }) => (
  <React.Fragment>
    <Dialogue className="jrpg">
      {`
            I have determined that your number is...
          `}
      <br />
      <br />
      <div>
        <NumberCard>{number}</NumberCard>
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

NumberGuessRevealContent.propTypes = {
  number: types.number,
  onExit: types.func.isRequired,
  onPlayAgain: types.func.isRequired
};

NumberGuessRevealContent.defaultProps = {
  number: 15
};

export default NumberGuessRevealContent;
