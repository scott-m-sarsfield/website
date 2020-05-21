import React from 'react';
import types from 'prop-types';
import MuiButton from '@material-ui/core/Button';

const Button = ({ onClick, className, children }) => (
  <MuiButton {...{ onClick, className }}>
    {children}
  </MuiButton>
);

Button.propTypes = {
  onClick: types.func,
  className: types.string,
  children: types.node
};

export default Button;
