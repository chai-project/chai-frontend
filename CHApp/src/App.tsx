import React, {useState} from 'react';
import './App.css';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid } from '@mui/material/';


// redux
import {useSelector, useDispatch} from 'react-redux';
import { initializeData } from './Redux-reducers/dataReducer';


// types
import chartDataType from './Types/types'

// components
import NavbarTop from './Components/NavBar/NavbarTop';
import DrawerComponent from './Components/NavBar/Drawer';
import MainWindow from './Components/MainWindow';
import QuickAccess from './Components/QuickAccess';
import SwitchButton from './Components/Buttons/SwitchButton';

// theme
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { dark, light } from './Themes/themes'

//styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainWindow: {
      //  boxSizing: 'border-box', // kas cia ??
      position: 'absolute',
      width: '65%',
      height: '80%',
      left: '4%',
      top: '10%',
      border: '1px solid #000000',
      borderRadius: '4px',
      [theme.breakpoints.up('xs')]: {
        
      },
      [theme.breakpoints.up('sm')]: {
        
      }
    },
    quickAccess: {
      boxSizing: 'border-box',
      position: 'absolute', //sita iskelti i app.tsx css
      right: '4%',
      top: '10%',
      width: '25%',
      height: '80%',
             border: '1px solid #000000',
       borderRadius: '4px',
      [theme.breakpoints.down('md')]: {
        display: 'none',
      }
    },
    container:{

    }
  }),
);


const App: React.FC = () => {
  const [theme, setTheme] = useState<boolean>(true)
  const chartData: chartDataType = useSelector((state: any) => state.chartData);
  const classes = useStyles();
  const dispatch = useDispatch()

  const getData = () => {
    dispatch(initializeData())
  }
  const toogleTheme = () => {
    setTheme(!theme)
  }

  return (
    <ThemeProvider theme={theme ? light : dark}>
      <CssBaseline/>
      <NavbarTop/>
      <SwitchButton labelLeft='Dark' labelRight="Light" action={()=>{toogleTheme()}}></SwitchButton>
      {/* <Button variant='contained' color='primary' onClick={()=>{toogleTheme()}}>yes</Button>
      <Button variant='contained' color='secondary' onClick={()=>{console.log(theme)}}>no</Button> */}
      <div className="App">
        <div className={classes.container}>
          <Paper className={classes.mainWindow}>
            <MainWindow/>
          </Paper>
          <div>navbar bottom</div>
          <Paper className={classes.quickAccess}>
            <QuickAccess/>
          </Paper>
        </div>
        {/* <div className={classes.mainWindow}>
          <MainWindow/>
        </div>
        <div className={classes.quickAccess}>
          <QuickAccess/>
        </div> */}
      </div>
    </ThemeProvider>
  );
};

export default App;
