import React from 'react';
import types from 'prop-types';
import background from './sherlock-background.jpg';
import bigbear from './bigbear_sherlock.png';
import DynamicBackground from './dynamic_background';
import SherlockButton from './stages/sherlock_button';

import './sherlock_frame.scss';

const SherlockFrame = ({ children, animated, onToggleAnimation }) => (
  <DynamicBackground src={background} className="sherlock-frame">
    <div className="jrpg location">
      <div>221B Baker St.</div>
      <SherlockButton onClick={onToggleAnimation}>{animated ? 'Disable Animation' : 'Enable Animation'}</SherlockButton>
    </div>
    <div className="character-play-area">
      <div className="character">
        <img src={bigbear} alt="Big Bear dressed as Sherlock" />
      </div>
      <div className="play-area">
        {children}
      </div>
    </div>
  </DynamicBackground>
);

SherlockFrame.propTypes = {
  children: types.node,
  animated: types.bool,
  onToggleAnimation: types.func.isRequired
};

export default SherlockFrame;
