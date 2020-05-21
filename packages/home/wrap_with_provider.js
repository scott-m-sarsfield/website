import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Lato',
      'sans-serif'
    ]
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  }
});

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      {element}
    </ThemeProvider>
  );
};

