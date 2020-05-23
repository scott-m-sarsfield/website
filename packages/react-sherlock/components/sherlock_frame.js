import React from 'react';
import types from 'prop-types';
import background from './sherlock-background.jpg';
import bigbear from './bigbear_sherlock.png';
import DynamicBackground from './dynamic_background';
import SherlockButton from './stages/sherlock_button';

const bigBearStyles = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  transform: 'translateY(20%)',
  maxWidth: '100%'
};

const SherlockFrame = ({ children, animated, onToggleAnimation }) => (
  <DynamicBackground src={background} style={{ height: 500, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
    <div className="jrpg location">
      <div>221B Baker St.</div>
      <SherlockButton onClick={onToggleAnimation}>{animated ? 'Disable Animation' : 'Enable Animation'}</SherlockButton>
    </div>
    <div style={{ display: 'flex', alignItems: 'flex-end', flex: '1 1 auto' }}>
      <div style={{ flex: '0 0 33.333%' }}>
        <img src={bigbear} alt="Big Bear dressed as Sherlock" style={bigBearStyles} />
      </div>
      <div style={{
        height: '100%',
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 10,
        boxSizing: 'border-box'
      }}>
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
