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
import MainWindow from './Components/MainWindow/MainWindow';
import QuickAccess from './Components/QuickAccess/QuickAccess';
import SwitchButton from './Components/Buttons/SwitchButton';

// theme
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { dark, light } from './Themes/themes'

//styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      position:"relative",
      height: '100vh'
    },
    container: {
      position: 'relative', //sita iskelti i app.tsx css
      display: 'flex',
      left: '50%',
      top: '48%', // 50% geriau atrodo!
      height: '100vh',
      maxHeight: '900px', // negali but ausktesnis negu 900 px
      width: '100vw',
      border: "2px dashed purple",
      // overflow: 'hidden',
      // -webkit-transform: translate(-50%, -50%);
      transform: 'translate(-50%, -50%)',
      WebkitTransform: 'translate(-50%, -50%)',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      }
    },
    quickAccess:{ // need min max width
      position: 'relative',
      width: '365px', //buvo 25%
      height: '85%',
      // left: '1px',
      // right: '0%',
      // top: '50%',
      // WebkitTransform: 'translate(-50%, -50%)',
      // transform: 'translate(-50%, -50%)',
      border: '1px solid #5ACBCC',
      zIndex: theme.zIndex.appBar + 1, // kazkas su situ padayrt ????
      [theme.breakpoints.down('md')]: {
        display: 'none',
      }
    },
    mainWindow: { // need min max width
      position: 'relative',
      width: '1000px', // buvo 65 %
      height: ' 85%',
      // left: '36%',
      // top: '50%',
      // WebkitTransform: 'translate(-50%, -50%)',
      // transform: 'translate(-50%, -50%)',
      border: '1px solid #5ACBCC',
      [theme.breakpoints.down('md')]: {
        width: '97%',
        left: ' 50%',
      }
    },
    bottomNavigation: {
      position: 'absolute',
      bottom: '-1%',
      left: '36%',
      WebkitTransform: 'translate(-50%, -50%)',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#CC57B9',
      width: '65%',
      height: '5%',
      [theme.breakpoints.down('md')]: {
        width: '100%',
        left: '50%',
      }
    },
    notificationWindow:{
      position: 'absolute',
      right: '-9%',
      bottom: '-1%',
      WebkitTransform: 'translate(-50%, -50%)',
      transform: 'translate(-50%, -50%)',
      width: '25%',
      height: '5%',
      backgroundColor: '#CC57B9',
      [theme.breakpoints.down('md')]: {
        bottom: '91%',
        left: '50%',
        width: '55%',      }
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
      {/* <Button variant='contained' color='primary' onClick={()=>{toogleTheme()}}>yes</Button>
      <Button variant='contained' color='secondary' onClick={()=>{console.log(theme)}}>no</Button> */}
      <div className={classes.root}>
        <div className={classes.container}>
            <Paper className={classes.mainWindow}>
              <MainWindow/>
            </Paper>
            <div className={classes.bottomNavigation}>bottom nav bar</div>
            <Paper className={classes.quickAccess}>
              <QuickAccess/>
              {/* <SwitchButton labelLeft='Dark' labelRight="Light" action={()=>{toogleTheme()}}></SwitchButton> */}
            </Paper>
          <div className={classes.notificationWindow}> notification</div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
