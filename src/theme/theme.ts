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
      main:'#FF3333'
    },
    warning:{
      main:'#FFC100'
    },
    info:{
      main:"#fff"
    },
    success:{
      main:"#22bb33"
    }
  },
});

export default theme;