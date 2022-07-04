import React, {useState} from 'react';
import './App.css';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

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
import NavBarBottom from './Components/NavBar/NavBarBottom';
import DrawerComponent from './Components/NavBar/Drawer';
import MainWindow from './Components/MainWindow/MainWindow';
import QuickAccess from './Components/QuickAccess/QuickAccess';
import SwitchButton from './Components/Buttons/SwitchButton';
import DatePickerComponent from './Components/MainWindow/Logs/DatePickerComponent';

// theme
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { dark, light } from './Themes/themes'

//styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      position:"absolute",
      height: '100vh',
      width: '100vw',
      // overflow: 'auto',
    },
    container: {
      // display: 'none',
      position: 'relative', //buvo relative
      height: '100vh',
      marginLeft: 'auto',
      marginRight: 'auto',
      // display: 'flex',
      // flexDirection: 'column',
      // alignItems: 'center',
      // alignContent:'center',
      // maxHeight: '1000px', //buvo 900px
      // minHeight:  '840px',
      width: '100vw',
      maxWidth: '1400px',
      border: "2px dashed purple",
      // top: '50%',
      // left: '50%',
      // transform: 'translate(-50%, -50%)',
      // WebkitTransform: 'translate(-50%, -50%)',

      

      // overflow: 'auto',
      // position: 'absolute', //sita iskelti i app.tsx css
      // // display: 'flex',
      // left: '50%',
      // top: '50%', // 50% geriau atrodo!
      // // height: '100vh',
      // maxHeight: '900px', // negali but ausktesnis negu 900 px
      // minHeight: '600px',
      // // width: '75vw',
      // border: "2px dashed purple",
      // margin : '0',
      // // overflow: 'hidden',
      // // -webkit-transform: translate(-50%, -50%);
      // transform: 'translate(-50%, -50%)',
      // WebkitTransform: 'translate(-50%, -50%)',
      // [theme.breakpoints.down('lg')]: {
      //   width: '100vw',
      // },
      // [theme.breakpoints.down('md')]: {
      //   // width: '100vw',
      //   minHeight: '600px'
      // },
    },
    mainWindow: { // need min max width
      position: 'relative',
      width: '1000px', // buvo 65 %
      height: ' 88%', //cia problemele maza! buvo 85%
      maxHeight: '800px',
      // margin: '0 auto',
      // left: '36%',
      // top: '50%',
      float: 'left',
      // marginRight: '30px',
      // WebkitTransform: 'translate(-50%, -50%)',
      // transform: 'translate(0%, -50%)',
      border: '1px solid #5ACBCC',
      [theme.breakpoints.down('md')]: {
        top:'50%',
        left:'50%',
        WebkitTransform: 'translate(-50%, -50%)',
        transform: 'translate(-50%, -50%)',
        width: '99%',
        // left: '50%',
        // top: '50%',
        // WebkitTransform: 'translate(-50%, -50%)',
        // transform: 'translate(0%, -50%)',
        // left: ' 50%',
      }
    },
    bottomNavigation: {
      // display:'none',
      position: 'relative',
      // bottom: '0%',
      marginTop: '10px',
      width: '1000px',
      // left: '42%',
      float: 'left',
      // top:'50%',
      // WebkitTransform: 'translate(-50%, -50%)',
      // transform: 'translate(0%, -50%)',
      // backgroundColor: '#CC57B9',
      // width: '100vw',
      // maxWidth: '1000px',
      // height: '5%',
      [theme.breakpoints.down('md')]: {
        position:'fixed',
        bottom: '1%',
        width: '100%',
        // left: '50%',
      }
    },
    quickAccess:{ // need min max width
      position: 'relative',
      width: '365px', //buvo 25%
      height: '88%', // cia mza problemele/ butut geriause kad butu 85%
      maxHeight: '800px',
      // margin: '0 auto',
      // left: '1px',
      // right: '0%',
      // top: '50%',
      float: 'right',
      // WebkitTransform: 'translate(-50%, -50%)',
      // transform: 'translate(0%, -50%)',
      border: '1px solid #5ACBCC',
      zIndex: theme.zIndex.appBar + 1, // kazkas su situ padayrt ????
      [theme.breakpoints.down('md')]: {
        display: 'none',
      }
    },
    notificationWindow:{
      position: 'relative',
      float: 'right',
      // padding: '10px',
      marginTop: '10px',
      // left: '50%',
      // bottom: '10%',
      // WebkitTransform: 'translate(-50%, -50%)',
      // transform: 'translate(-50%, -50%)',
      width: '365px',
      height: '40px',
      backgroundColor: '#CC57B9',
      // position: 'relative',
      // width: '365px', //buvo 25%
      // height: '88%', // cia mza problemele/ butut geriause kad butu 85%
      // maxHeight: '800px',
      // // margin: '0 auto',
      // // left: '1px',
      // // right: '0%',
      // top: '50%',
      // float: 'right',
      [theme.breakpoints.down('md')]: {
        position: 'fixed',
        left: '50%',
        transform: 'translate(-50%, 0%)',
        // marginLeft: 'auto',
        // marginRight: 'auto',
        width: '230px',
        // bottom: '91%',
        // left: '50%',
        // width: '55%',  
        zIndex: 100,    
      }
    },
    column:{
      // backgroundColor: 'red'
      // border: "1px dashed purple",
    },
    row: {
      // backgroundColor: 'green'
      border: "2px dashed green",
    }
  }),
);


const App: React.FC = () => {
  const [theme, setTheme] = useState<boolean>(!true)
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
    <div className={classes.root}>
    <ThemeProvider theme={theme ? light : dark}>
      <CssBaseline/>
      <NavbarTop/>
      {/* <Button variant='contained' color='primary' onClick={()=>{toogleTheme()}}>yes</Button>
      <Button variant='contained' color='secondary' onClick={()=>{console.log(theme)}}>no</Button> */}
      {/* <div className={classes.root}> */}
      {/* <div className={classes.notificationWindow}> notification</div> */}
        <div className={classes.container}>
            <Paper className={classes.mainWindow}>
              <MainWindow/>
            </Paper>
            <Paper className={classes.quickAccess}>
              <QuickAccess/>
              {/* <SwitchButton labelLeft='Dark' labelRight="Light" action={()=>{toogleTheme()}}></SwitchButton> */}
            </Paper>
            <div className={classes.notificationWindow}> notification</div>
            <div className={classes.bottomNavigation}>
              <NavBarBottom/>
            </div>
        </div>
        {/* <DatePickerComponent/> */}
      {/* </div> */}
    </ThemeProvider>
    </div>
  );
};

export default App;
