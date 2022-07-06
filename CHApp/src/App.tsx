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
      position:"relative",
      height: '100vh',
      width: '100vw',
      overflow: 'auto',
      border: "2px dashed lime",
    },
    container: {
      // display: 'none',
      position: 'relative', //buvo relative
      height: '100%', //cia buvo height, ir jeigu nuskrolindavau main screen i virsu!
      marginLeft: 'auto',
      marginRight: 'auto',
      // justifyContent:'center',
      // alignItems:'center',
      // display: 'block',
      // flexDirection: 'column',
      // alignItems: 'center',
      // alignContent:'center',
      // maxHeight: '1000px', //buvo 900px
      // minHeight:  '840px',
      width: '100vw',
      maxWidth: '1400px',
      border: "5px dashed purple",
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
      position: 'absolute',
      width: '1000px', // buvo 65 %
      // height: ' 88%', //cia problemele maza! buvo 85%
      minHeight: '770px',
      // margin: '0 auto',
      // left: '50%',
      top: '50%',
      float: 'left',
      // marginRight: '30px',
      // WebkitTransform: 'translate(-50%, -50%)',
      transform: 'translate(0%, -50%)',
      border: '1px solid #5ACBCC',
      [theme.breakpoints.down('md')]: {
        top:'50%',
        left:'50%',
        // WebkitTransform: 'translate(-50%, -50%)',
        transform: 'translate(-50%, -50%)',
        width: '99%',
        minHeight: '700px'
        // height: '2000px'
        // left: '50%',
        // top: '50%',
        // WebkitTransform: 'translate(-50%, -50%)',
        // transform: 'translate(0%, -50%)',
        // left: ' 50%',
      }
    },
    bottomNavigation: {
      // display:'none',
      position: 'absolute',
      bottom: '0%',
      marginTop: '10px',
      width: '1000px',
      // left: '42%',
      float: 'left',
      // bottom:'0%',
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
      // height: '88%', // cia mza problemele/ butut geriause kad butu 85%
      minHeight: '770px', //buvo 800px
      // margin: '0 auto',
      // left: '1px',
      // right: '0%',
      top: '50%',
      float: 'right',
      // WebkitTransform: 'translate(-50%, -50%)',
      transform: 'translate(0%, -50%)',
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

    //cia gridui testas
    column:{
      // backgroundColor: 'red'
      // border: "1px dashed purple",
    },
    row1: {
      // backgroundColor: 'green'
      border: "2px dashed green",
      height: '800px',
      width: '1000px'
    },
    row:{
      border: '2px dashed yellow',
      height: '50px',
      width: '100px',
      // display: 'none'
    },
    qa:{
      border: '2px dashed green',
      height: '88%',
      // width: '100px',
      // display: 'none'
      [theme.breakpoints.down('md')]: {
        display: 'none',
      }
    },
    ma:{
      border: '2px dashed green',
      height: '900px',
    },
    nav:{
      position: 'sticky',
      top: '10%',
      border: "1px dashed yellow",

      [theme.breakpoints.down('md')]: {
        position: 'sticky',
        // display: 'none',
        bottom: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        // left: '0%'
      }
    },
    not: {

    },
    mainCont:{
      overflow: 'scroll',
      width: '100vw',
      maxWidth: '1400px',
      border: "2px dashed purple",
      position: 'relative', //buvo relative
      height: '100vh', //cia buvo height, ir jeigu nuskrolindavau main screen i virsu!
      marginLeft: 'auto',
      marginRight: 'auto',
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
        <div className={classes.container}>
            <Paper className={classes.mainWindow}>
              <MainWindow/>
            </Paper>
            <Paper className={classes.quickAccess}>
              <QuickAccess/>
            </Paper>
            <div className={classes.notificationWindow}> notification</div>
            <div className={classes.bottomNavigation}>
              <NavBarBottom/>
            </div>
        </div>
        {/* <Grid container className={classes.mainCont} direction="column" alignItems='center' justifyContent="center" justifySelf='center' >
          <Grid item container direction='row' justifyContent="space-between">
            <Grid item xs={12} md={8} className={classes.ma}>1</Grid>
            <Grid item md ={0} lg={3.5}className={classes.qa}>{plotis}hmm</Grid>
          </Grid>
          <Grid item container direction='row' justifyContent="space-between">
            <Grid item xs={8} className={classes.nav}>navbar</Grid>
            <Grid item xs={3}className={classes.not}>notification</Grid>
          </Grid>
        </Grid> */}
    </ThemeProvider>
    </div>
  );
};

export default App;
