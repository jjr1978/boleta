import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00AFEF',
    },
    // secondary: {
    //   main: '#545454',
    // },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#FCFCFC',
    },
  },
});

export default theme;