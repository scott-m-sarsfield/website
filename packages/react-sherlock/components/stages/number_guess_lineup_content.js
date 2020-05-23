import React from 'react';
import types from 'prop-types';
import map from 'lodash/map';
import Dialogue from '../dialogue';
import NumberCard from './number_card';
import SherlockButton from './sherlock_button';

import './number_guess_lineup_content.scss';

const NumberGuessLineupContent = ({ numbers, onResponse }) => (
  <React.Fragment>
    <div className="number-lineup">
      {
        map(numbers, (number) => (
          <div key={number} className="number-card-space">
            <NumberCard>
              {number}
            </NumberCard>
          </div>
        ))
      }
    </div>
    <Dialogue className="jrpg">
      Is your number here?
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

NumberGuessLineupContent.propTypes = {
  numbers: types.arrayOf(types.number).isRequired,
  onResponse: types.func.isRequired
};

NumberGuessLineupContent.defaultProps = {
  numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
};

export default NumberGuessLineupContent;
