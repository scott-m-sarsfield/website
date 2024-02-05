import React from 'react';
import MuiDialog from '@mui/material/Dialog';

type DialogProps = React.ComponentProps<typeof MuiDialog>;

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

export default Dialog;
