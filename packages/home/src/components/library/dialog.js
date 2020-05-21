import React from 'react';
import types from 'prop-types';
import MuiDialog from '@material-ui/core/Dialog';

const Dialog = ({ children, onClose, open }) => (
  <MuiDialog {...{ onClose, open }}>
    {children}
  </MuiDialog>
);

Dialog.propTypes = {
  children: types.node,
  onClose: types.func.isRequired,
  open: types.bool
};

Dialog.defaultProps = {
  open: false
};

export default Dialog;
