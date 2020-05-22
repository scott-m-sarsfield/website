import React from 'react';
import types from 'prop-types';
import map from 'lodash/map';
import Dialogue from '../dialogue';

import './number_guess_lineup_content.scss';

const NumberGuessLineupContent = ({ numbers }) => (
  <React.Fragment>
    <div className="number-lineup">
      {
        map(numbers, (number) => (
          <div key={number} className="number-card-space">
            <div className="number-card">
              <span className="number">
                {number}
              </span>
            </div>
          </div>
        ))
      }
    </div>
    <Dialogue className="jrpg">
      Is your number here?
    </Dialogue>
    <div className="jrpg" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <button className="sherlock-button">No</button>
      <button className="sherlock-button">Yes</button>
    </div>
  </React.Fragment>
);

NumberGuessLineupContent.propTypes = {
  numbers: types.arrayOf(types.number).isRequired
};

NumberGuessLineupContent.defaultProps = {
  numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
};

export default NumberGuessLineupContent;
