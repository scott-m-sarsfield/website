import React from 'react';
import types from 'prop-types';
import MuiDialog, { DialogProps } from '@material-ui/core/Dialog';

const Dialog = ({
  children,
  onClose,
  open,
  scroll,
}: Pick<DialogProps, 'children' | 'onClose' | 'open' | 'scroll'>) => (
  <MuiDialog {...{ onClose, open, maxWidth: 'md', fullWidth: true, scroll }}>
    {children}
  </MuiDialog>
);

Dialog.propTypes = {
  children: types.node,
  onClose: types.func.isRequired,
  open: types.bool,
  scroll: types.oneOf(['paper', 'body']),
};

Dialog.defaultProps = {
  open: false,
};

export default Dialog;
