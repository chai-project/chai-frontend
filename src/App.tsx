import React, {useState, useEffect} from 'react';
import './App.css';
import { useLocation, useNavigate } from "react-router-dom";
import { createBrowserHistory } from 'history';
import dayjs from 'dayjs';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Paper, Grid } from '@mui/material/';

//services
import services from './Services/services'

// redux
import {useSelector, useDispatch} from 'react-redux';

//heating component data
import { initializeHeatingComponentData, setUserChangedBackToFalse } from './Redux-reducers/heatingComponentReducer';
import { initializeHeatingSchedule } from './Redux-reducers/heatingScheduleReducer';
import { initializeHeatingProfiles, setUserResetProfile } from './Redux-reducers/heatingProfilesReduces';
import { setErrorMessageForErrorComponentReducer } from './Redux-reducers/errorMessageForErrorComponentReducer';
import { initializeEnergyPriceData } from './Redux-reducers/energyPriceDataReducer';
import {initialiseLogs, refreshLogState} from './Redux-reducers/logsReducer';

// components
import NavbarTop from './Components/NavBar/NavbarTop';
import NavBarBottom from './Components/NavBar/NavBarBottom';
import MainWindow from './Components/MainWindow/MainWindow';
import QuickAccess from './Components/QuickAccess/QuickAccess';
import Notification from './Components/Notification/Notification';

// theme
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { dark, light } from './Themes/themes'

//styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      height: '100vh',
      width: '100vw',
    },
    centerContainer: {
      height: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '100vw',
      maxWidth: '1400px',
      [theme.breakpoints.down('md')]: {
        height: '100%',
      }
    },
    mainWindowAndQuickAccessContainer:{
      width: '100%',
      height: '790px',
      overflow: 'hidden',
      [theme.breakpoints.down('md')]: {
        height: '100%',
      }
    },
    mainWindowContainer:{
      height:'100%',
      padding: '1px',
      [theme.breakpoints.down('md')]: {
        height:'100%',
      }

    },
    mainWindow:{
      height:'100%',
      border: '1px solid #5ACBCC',
      [theme.breakpoints.down('md')]: {
        height:'100%',
      },
      [theme.breakpoints.up('md')]: {

      },
      
    },
    quickAccess:{
      height:'790px',
      border: '1px solid #5ACBCC',
      [theme.breakpoints.down('md')]: {
        display: 'none',
      }
    },
    navAndNotificationContainer:{
      width: '100%',
      height: '50px',
    },
    navBottom:{
      backgroundColor: '#2B3648',
      [theme.breakpoints.down('md')]: {
        position: 'fixed',
        width: '100%',
        bottom: '0%',
        left: '0%',
      }
    },
    notification: {
      zIndex: 4,
      [theme.breakpoints.down('md')]: {
        position: 'fixed',
        width: '100%',
        top: '1%',
        left:' 35%',
      }
    },
    containerAll:{
      [theme.breakpoints.down('md')]: {
        height: '82%',
      },
      [theme.breakpoints.down('sm')]: {
        height: '85%',
      }
    },
    '@global': {
        '*::-webkit-scrollbar': {
          width: '0.4em'
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: '#5ACBCC',
          outline: '1px solid slategrey'
        }
      },
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

  // let bearerToken = localStorage.getItem("bearerToken")
  const bearerToken = process.env.REACT_APP_BEARER_TOKEN;
  
  const themeFromLocalStorage = localStorage.getItem("Theme");

  //hashrouter
  const url = createBrowserHistory();
  const parameters = new URLSearchParams(url.location.search);

  const homeLabel =  parameters.get('home');
  const userToken = parameters.get('token');

  
  useEffect(() => {
    // for light and dark themes, currently disabled. (true = light, false = dark)
    if(themeFromLocalStorage){
      if(themeFromLocalStorage === "true"){
        setTheme(true)
      }else{
        setTheme(false)
      }
    }else {
      setTheme(false)
    }

    //checks for homeLAbel and userToken in url
    if(!homeLabel || !userToken){
      dispatch(setErrorMessageForErrorComponentReducer('Home label or user token was not provided.'));
      navigate('/Error')
    }else{
      // checks for bearer token and initalises heating component data and sets heatingComponent.isValid to true, and based on this value the bearer token is validated and the other data is initialised after.
      if(bearerToken){
        services.setBearerToken(bearerToken, userToken );
        dispatch(initializeHeatingComponentData(homeLabel));
      }else{
        dispatch(setErrorMessageForErrorComponentReducer('Bearer token was not provided.'));
        navigate('/Error')
      }
    }
}, [])

useEffect(()=>{
  //checks if heating component is valid, if it is, it initialises the other data
  if(currentState.heatingComponent.isValid === true && homeLabel && userToken ){
    dispatch(initializeEnergyPriceData())
    dispatch(initializeHeatingProfiles(homeLabel))
    dispatch(initializeHeatingSchedule(homeLabel))
    dispatch(initialiseLogs(homeLabel, null, null))
    // by default navigates to schedule page
    if(location.pathname === "/"){
      navigate(`/Schedule`)
    }
  }else if(currentState.heatingComponent.isValid === false || !homeLabel || !userToken ){
    dispatch(setErrorMessageForErrorComponentReducer('Home label or user token is not valid.'));
    navigate('/Error')
  }
},[currentState.heatingComponent.isValid])


// refresh heating component state every 10 seconds
useEffect(() => {
  if(currentState.heatingComponent.isValid === true && homeLabel && userToken){
    let id = setInterval(() => {
      dispatch(initializeHeatingComponentData(homeLabel));
    }, 10000);
    return () => clearInterval(id);
  }
}, [currentState.heatingComponent.isValid]);

// refresh heating profiles state every 10 seconds
useEffect(() => {
  if(currentState.heatingComponent.isValid === true && homeLabel && userToken && (currentState.heatingProfiles.userResetProfile === true || currentState.heatingComponent.userChanged )){
    setTimeout(() => {
      dispatch(initializeHeatingProfiles(homeLabel))
      dispatch(setUserResetProfile(false))
      dispatch(setUserChangedBackToFalse())
    }, 10000 );
  }
}, [currentState.heatingComponent.isValid, currentState.heatingProfiles.userResetProfile, currentState.heatingComponent.userChanged ]);


// refresh logs (in the notification tab) state every 10 seconds
useEffect(() => {
  if(currentState.heatingComponent.isValid === true && homeLabel && userToken && currentState.logs.logs?.length > 0 && currentState.logs.autoRefresh === true ){
    let id = setInterval(() => {
      dispatch(refreshLogState(homeLabel, null, null))
    }, 10000);
    return () => clearInterval(id);
  }
}, [currentState.heatingComponent.isValid, currentState.logs.logs?.length > 0, currentState.logs.autoRefresh]);

// refresh energy price data every 30 minutes
useEffect(() => {
  if(currentState.heatingComponent.isValid === true && homeLabel && userToken){
    const date = new Date();
    const minutes = date.getMinutes()
    const minutesToNextHalfHour = minutes < 31 ? 30 - minutes : 60 - minutes
    const seconds = date.getSeconds()
    const secondsToNextMinute = 60 - seconds
    let next:any

    if((minutes === 0 || minutes === 30) && seconds < 10){
      next = 10 - seconds * 1000
    }else{
      if((minutes === 0 || minutes === 30) && seconds >= 10){
        next = (29) * 60000 + (secondsToNextMinute * 1000) + 9000
      }else {
        next = (minutesToNextHalfHour - 1) * 60000 + (secondsToNextMinute * 1000) + 9000
      }
    }

    setTimeout(() => {
      dispatch(initializeEnergyPriceData())
      let id = setInterval(() => {
        dispatch(initializeEnergyPriceData())
      }, 1800000);
      return () => clearInterval(id);
    }, next );
  }
}, [currentState.heatingComponent.isValid]);



// backdrop for menu button
  const handleBackDrop = () => {
    setOpenBackdrop(!openBackdrop);
  };

// light / dark theme toggle
  const toogleTheme = () => {
    localStorage.setItem("Theme", String(!theme));
    setTheme(!theme)
  }


  return (
    <div className={classes.root}>
    <ThemeProvider theme={theme ? light : dark}>
      <CssBaseline/>
      <NavbarTop handleBackDrop={handleBackDrop} homeLabel={homeLabel} state={currentState}/>
        <Grid container direction="column" justifyContent="center" alignItems="center" className={classes.centerContainer}>
          <Grid item container direction="row" className={classes.containerAll}>
            <Grid xl={12} item container direction="row" justifyContent="space-between" className={classes.mainWindowAndQuickAccessContainer}>
              <Grid xs={12} sm={12} md={12} lg={8.5} xl={8.5} item className={classes.mainWindowContainer}>
                <Paper className={classes.mainWindow}>
                  <MainWindow homeLabel={homeLabel} currentState={currentState}/>
                </Paper>
              </Grid>
              <Grid xs={3.3} sm={3.3} md={3.3} lg={3.3} xl={3.4} item >
                <Paper className={classes.quickAccess}>
                  <QuickAccess homeLabel={homeLabel}/>
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