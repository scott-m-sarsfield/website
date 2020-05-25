import React from 'react';
import types from 'prop-types';

import './number_card.scss';

const NumberCard = ({ children }) => (
  <div className="number-card">
    <span className="number">
      {children}
    </span>
  </div>
);

NumberCard.propTypes = {
  children: types.number
};

export default NumberCard;
