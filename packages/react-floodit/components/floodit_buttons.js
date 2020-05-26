import React from 'react';
import types from 'prop-types';
import { COLORS } from '../constants';

import './floodit_buttons.scss';

const FloodItButtons = ({ onSelectColor }) => (
  <div className="floodit-buttons">
    {COLORS.map((color, i) => (
      <button key={color} onClick={() => onSelectColor(i)} style={{ background: color }} />
    ))}
  </div>
);

FloodItButtons.propTypes = {
  onSelectColor: types.func.isRequired
};

export default FloodItButtons;
