import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  typography: {
    fontFamily: ['Lato', 'sans-serif'],
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
});

// eslint-disable-next-line react/display-name,react/prop-types
export default function wrapWithProvider({ element }) {
  return <ThemeProvider theme={theme}>{element}</ThemeProvider>;
}
