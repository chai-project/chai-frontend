import React, {useState, useEffect} from 'react';
import './App.css';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid } from '@mui/material/';

//services
import services from './Services/services'

// redux
import {useSelector, useDispatch} from 'react-redux';
//chart data
import { initializeChartData } from './Redux-reducers/chartDataReducer';
//heating component data
import { initializeHeatingComponentData } from './Redux-reducers/heatingComponentReducer';


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
      // position:"relative",
      height: '100vh',
      width: '100vw',
      overflow: 'auto',
      // border: "2px dashed lime",
      scroll: 'overflow'
    },
    container: {
      height: '100%', //cia buvo height, ir jeigu nuskrolindavau main screen i virsu!
      marginLeft: 'auto',
      marginRight: 'auto',
      minHeight:  '840px',
      width: '100vw',
      maxWidth: '1400px',
      // border: "5px dashed purple",
    },
    mainCont:{
      // overflow: 'scroll',
      width: '100%',
      // maxWidth: '1400px',
      // border: "2px dashed red",
      // position: 'relative', //buvo relative
      height: '790px', //cia buvo height, ir jeigu nuskrolindavau main screen i virsu!
      minHeight: '790px',
      // marginLeft: 'auto',
      // marginRight: 'auto',
      [theme.breakpoints.down('md')]: {
        height: '650px',
        minHeight: '650px',
      }
    },
    mainWindowContainer:{
      height:'100%',
      // width: '100%',
      width: '10px',
      // border: "2px dashed yellow",
      // border: '1px solid #5ACBCC',
      [theme.breakpoints.down('md')]: {
        // width: '100%',
        // border: "2px dashed yellow",
      }

    },
    mainWindow:{
      height:'100%',
      // minHeight: '790px',
      border: '1px solid #5ACBCC',
      [theme.breakpoints.down('md')]: {
        // display: 'none',
        // border: '1px solid red',
      },
      [theme.breakpoints.up('md')]: {
        // display: 'none',
        // border: '1px solid lime',
      },
      
    },
    quickAccess:{
      height:'790px',
      minHeight:'790px',
      // position:'relative',
      // border: "2px dashed lime",
      border: '1px solid #5ACBCC',
      [theme.breakpoints.down('md')]: {
        display: 'none',
      }
    },
    navContainer:{
      width: '100%',
      height: '50px',
      // border: "2px dashed yellow",
    },
    navBottom:{
      // border: "2px dashed pink",
      [theme.breakpoints.down('md')]: {
        position: 'fixed',
        width: '100%',
        bottom: '1%'
        // top: '1%',
        // marginLeft: 'auto',
        // marginRight: 'auto',
      }
    },
    notification: {
      // border: "2px dashed pink",
      [theme.breakpoints.down('md')]: {
        position: 'fixed',
        width: '100%',
        top: '1%',
        left:' 35%',
        // marginLeft: 'auto',
        // marginRight: 'auto',
      }
    },
    hmm:{
      // border: "5px dashed orange",
    }
  }),
);


const App: React.FC = () => {
  const [theme, setTheme] = useState<boolean>(!true)
  const chartData: chartDataType = useSelector((state: any) => state.chartData);
  const classes = useStyles();
  const dispatch = useDispatch()
  

  useEffect(() => {
    let token = localStorage.getItem("bearerToken")

    if(!token){
      token = "39b01478-134f-41e7-8393-8ad91f6815cf"
      services.setBearerToken(token)
      dispatch(initializeChartData())
      dispatch(initializeHeatingComponentData())
      //set to local storage! 
    }


}, [])

// cia viskas ok, tik reike kad po kiekvieno update atsinaujintu 
// const hmm = () => {
//   console.log('update')
//   dispatch(initializeHeatingComponentData())
// }

// setInterval(hmm, 10000)



  const getData = () => {
    dispatch(initializeChartData())
  }
  const toogleTheme = () => {
    setTheme(!theme)
  }

  const handleToken = async () =>{
    const token = "39b01478-134f-41e7-8393-8ad91f6815cf"
    const tokenRes =  await services.setBearerToken(token)
    console.log(tokenRes)

  }

  const handleData = async() => {
    const data = await services.getHeatingComponentData();
    console.log(data)
  //   const data = useSelector((state: any) => {
  //     return state;
  // });

  }


  return (
    <div className={classes.root}>
    <ThemeProvider theme={theme ? light : dark}>
      <CssBaseline/>
      <NavbarTop/>
        <Grid container direction="column" justifyContent="center" alignItems="center" className={classes.container}>
          <Grid item container direction="row" className={classes.hmm}>
            <Grid xl={12} item container direction="row" justifyContent="space-between" className={classes.mainCont}>
              <Grid xs={12} sm={12} md={12} lg={8.5} xl={8.5} item className={classes.mainWindowContainer}>
                <Paper className={classes.mainWindow}>
                  <MainWindow/>
                </Paper>
              </Grid>
              <Grid xs={3.3} sm={3.3} md={3.3} lg={3.3} xl={3.3} item >
                <Paper className={classes.quickAccess}>
                  <QuickAccess/>
                </Paper>
              </Grid>
            </Grid>
            <Grid xs={12} item container direction="row" justifyContent="space-between" className={classes.navContainer}>
              <Grid md={12} lg={8.5} item className={classes.navBottom}>
                <NavBarBottom/>
              </Grid>
              <Grid xs={3.3} item className={classes.notification}> notification</Grid>
            </Grid>
          </Grid>
        </Grid>
    </ThemeProvider>
    </div>
  );
};

export default App;
