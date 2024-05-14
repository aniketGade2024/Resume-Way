import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1A99E8',
    },
    secondary: {
      main: '#005af0',
    },
    error:{
      main:'#FF2828'
    },
    warning:{
      main:'#FF8934'
    },
    info:{
      main:"#fff"
    },
    success:{
      main:"#22C55E"
    }
  },
});

export default theme;