import React from 'react';
import Dialogue from '../dialogue';

const NumberGuessIntroContent = () => (
  <React.Fragment>
    <Dialogue className="jrpg">
      {`
            Hi.  I want you to think of a number between 1 and 100. 
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
      <button className="sherlock-button">No</button>
      <button className="sherlock-button">Ready!</button>
    </div>
  </React.Fragment>
);

export default NumberGuessIntroContent;
