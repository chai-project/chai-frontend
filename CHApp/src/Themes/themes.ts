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
      
    },
    breakpoints:{
      values:{
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1280, // geras :D
        xl: 1536,
      }
    },
    components: {
      MuiToggleButton: {
        styleOverrides: {
          root: {
            color: "white",
            borderColor:'transparent',
            "&.Mui-selected": {
              color: "white",
              backgroundColor: '#5ACBCC'
            },
            "&:hover": {
              color: "white",
            }
          }
        }
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
    },
    breakpoints:{
      values:{
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1280, // geras :D
        xl: 1536,
      }
    },
    components: {
      MuiToggleButton: {
        styleOverrides: {
          root: {
            color: "black",
            borderColor:'transparent',
            // borderTopRightRadius: '25px',
            "&.Mui-selected": {
              color: "black",
              backgroundColor: '#5ACBCC'
            },
            "&:hover": {
              color: "black",
            }
          }
        }
      }
    }
  });