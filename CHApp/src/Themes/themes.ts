import { createTheme } from '@mui/material/styles';

export const dark = createTheme({
    palette: {
      primary:{
        main: '#5ACBCC'
      },
      secondary: {
        main: '#FE6262'
      },
      background: {
        default: "#2B3648",
        paper:'#202833'
      },
      text: {
        primary: 'rgba(255, 255, 255)',
        secondary: 'rgba(255, 255, 255, 0.80)',
        disabled: 'rgba(255, 255, 255, 0.60)'
      }
    },
    typography:{
      subtitle2:{
        fontSize: '14px'
      },
      h6:{
        fontSize: '15px'
      },
      h5:{
        fontSize: '16px'
      }
    }
  });
  
export const light = createTheme({
    palette: {
      primary:{
        main: '#5ACBCC'
      },
      secondary: {
        main: '#FE6262'
      },
      background: {
        default: '#E5E5E5',
        paper:'#CFD8DC'
      },
      text: {
        primary: 'rgba(0, 0, 0)',
        secondary: 'rgba(0, 0, 0, 0.80)',
        disabled: 'rgba(0, 0, 0, 0.60)'
      }
      
    },
    typography:{
      subtitle2:{
        fontSize: '14px'
      },
      h6:{
        fontSize: '15px'
      },
      h5:{
        fontSize: '16px'
      }
    }
  });