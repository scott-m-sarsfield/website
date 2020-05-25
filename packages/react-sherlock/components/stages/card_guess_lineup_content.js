import React from 'react';
import types from 'prop-types';
import map from 'lodash/map';
import Dialogue from '../dialogue';
import PlayingCard from './playing_card';
import SherlockButton from './sherlock_button';

import './number_guess_lineup_content.scss';

const CardGuessLineupContent = ({ numbers, onResponse, animated }) => (
  <React.Fragment>
    <div className="number-lineup">
      {
        map(numbers, (number) => (
          <div key={number} className="number-card-space">
            <PlayingCard number={number} />
          </div>
        ))
      }
    </div>
    <Dialogue className="jrpg" animated={animated}>
      Is your card here?
    </Dialogue>
    <div className="jrpg" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <SherlockButton onClick={() => onResponse(false)}>
        No
      </SherlockButton>
      <SherlockButton onClick={() => onResponse(true)}>
        Yes
      </SherlockButton>
    </div>
  </React.Fragment>
);

CardGuessLineupContent.propTypes = {
  numbers: types.arrayOf(types.number).isRequired,
  onResponse: types.func.isRequired,
  animated: types.bool
};

CardGuessLineupContent.defaultProps = {
  numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
};

export default CardGuessLineupContent;
