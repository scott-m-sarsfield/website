import React from 'react';
import types from 'prop-types';
import fill from 'lodash/fill';
import { DIMENSION, COLORS } from '../constants';

import './floodit_grid.scss';

const dimensionArray = fill(new Array(DIMENSION), 0);

function getColor(grid, i, j) {
  return COLORS[grid[i * DIMENSION + j]];
}

const FloodItGrid = ({ grid }) => (
  <table className="floodit-grid">
    <thead />
    <tbody>
      {dimensionArray.map((_, i) => (
        <tr key={i}>
          {dimensionArray.map((_, j) => (
            <td key={j} style={{ background: getColor(grid, i, j) }} />
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

FloodItGrid.propTypes = {
  grid: types.arrayOf(types.number).isRequired,
};

export default FloodItGrid;
