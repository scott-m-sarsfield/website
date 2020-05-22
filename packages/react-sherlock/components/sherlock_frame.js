import React from 'react';
import types from 'prop-types';
import background from './sherlock-background.jpg';
import bigbear from './bigbear_sherlock.png';
import DynamicBackground from './dynamic_background';

const bigBearStyles = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  transform: 'translateY(20%)',
  maxWidth: '100%'
};

const SherlockFrame = ({ children }) => (
  <DynamicBackground src={background} style={{ height: 500, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
    <div className="jrpg location">221B Baker St.</div>
    <div style={{ display: 'flex', alignItems: 'flex-end', flex: '1 1 auto' }}>
      <div style={{ flex: '0 0 33.333%' }}>
        <img src={bigbear} alt="Big Bear dressed as Sherlock" style={bigBearStyles} />
      </div>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: 10, boxSizing: 'border-box' }}>
        {children}
      </div>
    </div>
  </DynamicBackground>
);

SherlockFrame.propTypes = {
  children: types.node
};

export default SherlockFrame;
