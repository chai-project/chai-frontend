import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { createBrowserHistory } from 'history';
import dayjs from 'dayjs';

//Axios
import axios, {AxiosInstance}  from 'axios';
//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid, Backdrop } from '@mui/material/';

//services
import services from './Services/services'

// redux
import {useSelector, useDispatch} from 'react-redux';
//chart data
import { initializeChartData } from './Redux-reducers/chartDataReducer';
//heating component data
import { initializeHeatingComponentData, setActiveProfile } from './Redux-reducers/heatingComponentReducer';
import { initializeHeatingSchedule } from './Redux-reducers/heatingScheduleReducer';
import { initializeHeatingProfiles } from './Redux-reducers/heatingProfilesReduces';
import { setErrorMessageForErrorComponentReducer } from './Redux-reducers/errorMessageForErrorComponentReducer';
import { initializeEnergyPriceData } from './Redux-reducers/energyPriceDataReducer';
import {initialiseLogs} from './Redux-reducers/logsReducer';
import {setNotification} from './Redux-reducers/notificationsReducer';


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
import Notification from './Components/Notification/Notification';

// theme
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { dark, light } from './Themes/themes'
import { Blender } from '@mui/icons-material';

//styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      // position:"relative",
      height: '100vh',
      width: '100vw',
      // overflow: 'auto',
      // border: "2px dashed lime",
      // scroll: 'overflow'
      // overflow: 'hidden',
    },
    centerContainer: {
      height: '100%', //cia buvo height, ir jeigu nuskrolindavau main screen i virsu!
      marginLeft: 'auto',
      marginRight: 'auto',
      minHeight:  '840px',
      width: '100vw',
      maxWidth: '1400px',
      // overflow: 'hidden',
      // border: "5px dashed purple",
      [theme.breakpoints.down('md')]: {
        minHeight:  '100%',
        height: '100%',
        // minHeight: '0%',
        // height: '600px',
        // minHeight: '650px',
      }
    },
    mainWindowAndQuickAccessContainer:{
      // overflow: 'scroll',
      width: '100%',
      // maxWidth: '1400px',
      // border: "2px dashed red",
      // position: 'relative', //buvo relative
      height: '790px', //cia buvo height, ir jeigu nuskrolindavau main screen i virsu! // buvo 790 jei ka atekisti!!!
      // minHeight: '790px',
      // marginLeft: 'auto',
      // marginRight: 'auto',
      overflow: 'hidden',
      [theme.breakpoints.down('md')]: {
        height: '100%',
        // height: '680px',
        // minHeight: '0%',
        // height: '600px',
        // minHeight: '650px',
      }
    },
    mainWindowContainer:{
      height:'100%',
      // width: '100%',
      // width: '10px',
      // border: "2px dashed yellow",
      [theme.breakpoints.down('md')]: {
        height:'100%',
        // width: '100%',
        // border: "2px dashed yellow",
      }

    },
    mainWindow:{
      height:'100%',
      // minHeight: '790px',
      // border: '1px solid red',
      border: '1px solid #5ACBCC',
      [theme.breakpoints.down('md')]: {
        height:'100%',
        // display: 'none',
        // border: '1px solid red',
      },
      [theme.breakpoints.up('md')]: {
        // display: 'none',
        // border: '1px solid lime',
      },
      
    },
    quickAccess:{
      height:'790px', //buvo 790jei ka atkeist!!!!
      // minHeight:'790px',
      // position:'relative',
      // border: "1px dashed lime",
      border: '1px solid #5ACBCC',
      [theme.breakpoints.down('md')]: {
        display: 'none',
      }
    },
    navAndNotificationContainer:{
      width: '100%',
      height: '50px',
      // border: "2px dashed yellow",
    },
    navBottom:{
      // border: "2px dashed pink",
      [theme.breakpoints.down('md')]: {
        position: 'fixed',
        width: '100%',
        bottom: '1%',
        left: '0%',
        // top: '1%',
        // marginLeft: 'auto',
        // marginRight: 'auto',
      }
    },
    notification: {
      // border: "2px dashed orange",
      [theme.breakpoints.down('md')]: {
        position: 'fixed',
        width: '100%',
        top: '1%',
        left:' 35%',
        // marginLeft: 'auto',
        // marginRight: 'auto',
      }
    },
    containerAll:{
      // border: "5px dashed orange",
      [theme.breakpoints.down('md')]: {
        height: '70%', //buvo 85%
      }
    }
  }),
);


const App: React.FC = () => {
  const [theme, setTheme] = useState<boolean>(false)
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);

  const location = useLocation()
  const navigate = useNavigate();
  
  const currentState: any = useSelector((state: any) => state);
  const classes = useStyles();
  const dispatch = useDispatch();

  let bearerToken = localStorage.getItem("bearerToken")

  
  const themeFromLocalStorage = localStorage.getItem("Theme");
  //hasrouter
  const url = createBrowserHistory();
  const parameters = new URLSearchParams(url.location.search);

  const homeLabel =  parameters.get('home');
  const userToken = parameters.get('token');
  const currentTime = dayjs();
  const today = currentTime.startOf('day').add(1,'day');
  const sevenDaysBack = today.subtract(7,'day');
  // console.log(today, sevenDaysBack)

  
  useEffect(() => {
  
    if(themeFromLocalStorage){
      if(themeFromLocalStorage === "true"){
        setTheme(true)
      }else{
        setTheme(false)
      }
    }else {
      setTheme(false)
    }
    if(!homeLabel || !userToken){
      dispatch(setErrorMessageForErrorComponentReducer('Home label or user token was not provided.'));
      navigate('/Error')
    }else{
      bearerToken = "8dbb9774-970c-4f9d-8992-65f88e501d0e";
      services.setBearerToken(bearerToken, userToken );
      dispatch(initializeHeatingComponentData(homeLabel));
    }
}, [])

useEffect(()=>{
  if(currentState.heatingComponent.isValid === true && homeLabel && userToken ){
    dispatch(initializeEnergyPriceData())
    dispatch(initializeHeatingProfiles(homeLabel))
    dispatch(initializeHeatingSchedule(homeLabel))
    dispatch(initialiseLogs(homeLabel, null, null)) //, from:any, to:any, sevenDaysBack, today
  }else if(currentState.heatingComponent.isValid === true && homeLabel && userToken ){
    dispatch(setErrorMessageForErrorComponentReducer('Home label or user token is not valid.'));
    navigate('/Error')
  }
},[currentState.heatingComponent.isValid])




// cia viskas ok, tik reike kad po kiekvieno update atsinaujintu 
// const hmm = (value:any) => {
//   console.log(value)

//   }
  // setTimeout(()=>{
  //   console.log('update')
  // }, 5000);

  // hmm()

  // hmm(2)
  // function startTimer() {
  //   setTimeout(() => {
  //     // Call the function here:
  //     // console.log('krw');
  //     hmm(1)
  //     // Call startTimer() again to schedule the next call:
  //     startTimer();
  //   }, 2000);
  // }
  
  // startTimer();
  


// }

// setInterval(hmm, 10000)

  const handleBackDrop = () => {
    setOpenBackdrop(!openBackdrop);
  };


  const toogleTheme = () => {
    localStorage.setItem("Theme", String(!theme));
    setTheme(!theme)
  }


  return (
    <div className={classes.root}>
      {/* <button onClick={()=>{dispatch(setNotification('karocia', 3000))}}>hmm</button> */}
      {/* <button onClick={()=>{console.log(currentState.logs)}}>swx</button> */}
    <ThemeProvider theme={theme ? light : dark}>
      {/* <div>
        <Backdrop open={openBackdrop} onClick={()=>{{setOpenBackdrop(false)}}} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <div>
            <SwitchButton status={theme} labelLeft={"Dark"} labelRight={"Light"} action={toogleTheme}/>
          </div>
        </Backdrop>
      </div> */}
      <CssBaseline/>
      <NavbarTop handleBackDrop={handleBackDrop}/>
        <Grid container direction="column" justifyContent="center" alignItems="center" className={classes.centerContainer}>
          <Grid item container direction="row" className={classes.containerAll}>
            <Grid xl={12} item container direction="row" justifyContent="space-between" className={classes.mainWindowAndQuickAccessContainer}>
              <Grid xs={12} sm={12} md={12} lg={8.5} xl={8.5} item className={classes.mainWindowContainer}>
                <Paper className={classes.mainWindow}>
                  <MainWindow homeLabel={homeLabel}/>
                </Paper>
              </Grid>
              <Grid xs={3.3} sm={3.3} md={3.3} lg={3.3} xl={3.3} item >
                <Paper className={classes.quickAccess}>
                  <QuickAccess/>
                </Paper>
              </Grid>
            </Grid>
            <Grid xs={12} item container direction="row" justifyContent="space-between" className={classes.navAndNotificationContainer}>
              <Grid md={12} lg={8.5} item className={classes.navBottom}>
                <NavBarBottom homeLabel={homeLabel}/>
              </Grid>
              <Grid xs={3.3} item className={classes.notification}>
                <Notification notificationState={currentState.notification}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
    </ThemeProvider>
    </div>
  );
};

export default App;