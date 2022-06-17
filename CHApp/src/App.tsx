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
      height: '600px',
      left: '4%',
      // top: '0%',
      border: '1px solid #5ACBCC',
      borderRadius: '4px',
      [theme.breakpoints.up('xs')]: {
        
      },
      [theme.breakpoints.up('sm')]: {
        
      }
    },
    quickAccess: {
      // boxSizing: 'border-box',
      position: 'absolute', //sita iskelti i app.tsx css
      left: '50%',
      top: '50%',
      // -webkit-transform: translate(-50%, -50%);
      WebkitTransform: 'translate(-50%, -50%)',
      transform: 'translate(-50%, -50%)',
      // right: '4%',
      // top: '0%',
      width: '25%',
      height: '90%',
      border: '1px solid #5ACBCC',
      borderRadius: '4px',
      zIndex: theme.zIndex.appBar + 1,
      [theme.breakpoints.down('md')]: {
        display: 'none',
      }
    },
    container:{
      position: 'relative', //sita iskelti i app.tsx css
      width: '100vw',
      height: '100vh',
      backgroundColor: '#5ACBCC',
      border: '1px solid #000000'
    },
    testContainer: {
      // backgroundColor: '#5ACBCC',
      position: 'absolute', //sita iskelti i app.tsx css
      left: '50%',
      top: '50%',
      height: '100%',
      width: '90%',
      // -webkit-transform: translate(-50%, -50%);
      transform: 'translate(-50%, -50%)',
      WebkitTransform: 'translate(-50%, -50%)',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      }
    },
    testQA:{
      position: 'absolute',
      width: '25%',
      height: '92%',
      backgroundColor: '#F4E19B',
      right: '-9%',
      top: '48%',
      WebkitTransform: 'translate(-50%, -50%)',
      transform: 'translate(-50%, -50%)',
      zIndex: theme.zIndex.appBar + 1, // kazkas su situ padayrt ????
    },
    testMainW: {
      position: 'absolute',
      width: '65%',
      height: ' 92%',
      // backgroundColor: '#CC57B9',
      left: '36%',
      top: '48%',
      WebkitTransform: 'translate(-50%, -50%)',
      transform: 'translate(-50%, -50%)',
    },
    testBottomoNavbar: {
      position: 'absolute',
      bottom: '-2%',
      left: '36%',
      WebkitTransform: 'translate(-50%, -50%)',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#CC57B9',
      width: '65%',
      height: '5%'
    },
    testNotification:{
      position: 'absolute',
      right: '-9%',
      bottom: '-2%',
      WebkitTransform: 'translate(-50%, -50%)',
      transform: 'translate(-50%, -50%)',
      width: '25%',
      height: '5%',
      backgroundColor: '#CC57B9',
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
      <div className="App">
        {/* <div className={classes.container}>
          <Paper className={classes.mainWindow}>
            <MainWindow/>
          </Paper>
          <div>navbar bottom</div>
          <Paper className={classes.quickAccess}>
            <QuickAccess/>
          </Paper>
        </div> */}
        {/* <Grid container direction="column" alignItems="center" justifyContent="center" className={classes.container}>
          <Grid item>
            <Paper className={classes.mainWindow}>
              <MainWindow/>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.quickAccess}>
              <QuickAccess/>
              <SwitchButton labelLeft='Dark' labelRight="Light" action={()=>{toogleTheme()}}></SwitchButton>
            </Paper>
          </Grid>
        </Grid> */}
        <div className={classes.testContainer}>
            <Paper className={classes.testMainW}>
              <MainWindow/>
            </Paper>
            <div className={classes.testBottomoNavbar}>bottom nav bar</div>
            <Paper className={classes.testQA}>
              <QuickAccess/>
              <SwitchButton labelLeft='Dark' labelRight="Light" action={()=>{toogleTheme()}}></SwitchButton>
            </Paper>
          <div className={classes.testNotification}> notification</div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
