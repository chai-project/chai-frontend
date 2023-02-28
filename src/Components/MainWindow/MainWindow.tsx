import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import {useParams} from "react-router-dom";

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper } from '@mui/material/';



// redux
import {useSelector, useDispatch} from 'react-redux'
import {setTemperature} from '../../Redux-reducers/heatingComponentReducer'
import { initializeHeatingComponentData, setActiveProfile } from '../../Redux-reducers/heatingComponentReducer';
import { setNotification } from '../../Redux-reducers/notificationsReducer';

//utils
import utils from '../Utils/utils'

// import { initializeData } from './Redux-reducers/dataReducer';


//types
import chartDataType from '../../Types/types'

//components
import SwitchButton from '../Buttons/SwitchButton';
import Logs from './Logs/Logs';
import Profiles from './Profiles/Profiles';
import ScheduleComponent from './Schedule/ScheduleComponent';
import EditWeekdaySchedule from './Schedule/Edit/EditWeekdaySchedule';
import ErrorComponent from '../ErrorPages/ErrorComponent';
import { Backdrop } from '@material-ui/core';
// Styles 
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      //  boxSizing: 'border-box',
       position: 'relative', //sitas!!!
       width: '100%',
       height: '100%',
      //  background: '#CFD8DC',
      //  left: '4%',
      //  top: '10%',
    },
  }),
);

const MainWindow: React.FC<{homeLabel:String | null, currentState:any}> = ({homeLabel, currentState}) => {

    const classes = useStyles();
    const dispatch = useDispatch()

    // const currentState:any = useSelector((state:any)=>{
    //   return(
    //     state
    //   )
    // })

    useEffect(()=>{
      if(currentState.heatingSchedule){
        const activeProfile:any = utils.getActiveProfile(currentState.heatingSchedule[0])
        dispatch(setActiveProfile(activeProfile))
      }

    },[currentState.heatingSchedule])

    useEffect(() => {
      if (currentState.heatingComponent.activeProfile && currentState.heatingSchedule) {
  
        const [hours, minutes] = currentState.heatingComponent.activeProfile.profileEnd.split(':').map(Number);
        const now = new Date();
        const endTime = new Date(now);
        endTime.setHours(hours, minutes, 0);
        const timeLeft = endTime.getTime() - now.getTime();

        const timeoutId = setTimeout(() => {

          const activeProfile = utils.getActiveProfile(currentState.heatingSchedule[0]);

          if(activeProfile.profileID !== currentState.heatingComponent.activeProfile.profileID){
            dispatch(setNotification(`Active profile is ${activeProfile.profileName}`,5000))
          }
          dispatch(setActiveProfile(activeProfile))

        }, timeLeft + 1000); 
  
        return () => clearTimeout(timeoutId);
      }
    }, [currentState.heatingComponent.activeProfile]);



  return (
    <div className={classes.main}>
        <Routes>
          <Route path='/' element={null}/>
          <Route path='schedule' element={<ScheduleComponent weekSchedule={currentState.heatingSchedule} heatingProfiles={currentState.heatingProfiles} homeLabel={homeLabel}/>}/>
          <Route path='schedule/:weekday' element={<EditWeekdaySchedule />}/>
          <Route path='profiles' element={<Profiles currentState={currentState} homeLabel={homeLabel}/>}/>
          <Route path='notifications' element={<Logs currentState={currentState} homeLabel={homeLabel}/>}/>
          <Route path='/Error' element={<ErrorComponent/>}/>
          <Route path='*' element={<ErrorComponent/>}/>
        </Routes>
    </div>
  );
};

export default MainWindow;
