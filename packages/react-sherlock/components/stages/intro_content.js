import React from 'react';
import types from 'prop-types';
import Dialogue from '../dialogue';
import SherlockButton from './sherlock_button';
import { gameTypes } from '../sherlock_reducer';

const IntroContent = ({ onChooseGameType, animated }) => (
  <React.Fragment>
    <Dialogue className="jrpg" animated={animated}>
      {`
            Hi.  I'm not Sherlock, but I have the ability to guess your number or card.
          `}
      <br />
      <br />
      {
        `
          Which would you like me to guess?
        `}
    </Dialogue>
    <div className="jrpg" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <SherlockButton onClick={() => onChooseGameType(gameTypes.NUMBERS)}>Number</SherlockButton>
      <SherlockButton onClick={() => onChooseGameType(gameTypes.CARDS)}>Card</SherlockButton>
    </div>
  </React.Fragment>
);

IntroContent.propTypes = {
  onChooseGameType: types.func.isRequired,
  animated: types.bool
};

export default IntroContent;
