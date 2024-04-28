import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#405cf5',
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
  },
});

export default theme;