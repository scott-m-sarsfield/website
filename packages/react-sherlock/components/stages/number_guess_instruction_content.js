import React from 'react';
import types from 'prop-types';
import Dialogue from '../dialogue';
import SherlockButton from './sherlock_button';

const NumberGuessInstructionContent = ({ onStart, animated }) => (
  <React.Fragment>
    <Dialogue className="jrpg" animated={animated}>
      {`
            I want you to think of a number between 1 and 100. 
          `}
      <br />
      <br />
      {
        `
          Then I will show you several line ups of numbers, and you will tell me if your number is in each line up.
        `}
      <br />
      <br />
      {`
        Then I will know your number.
      `}
      <br />
      <br />
          Ready?
    </Dialogue>
    <div className="jrpg" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <SherlockButton onClick={onStart}>Ready!</SherlockButton>
    </div>
  </React.Fragment>
);

NumberGuessInstructionContent.propTypes = {
  onStart: types.func.isRequired,
  animated: types.bool
};

export default NumberGuessInstructionContent;
