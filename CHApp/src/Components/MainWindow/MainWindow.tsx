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

// import { initializeData } from './Redux-reducers/dataReducer';


//types
import chartDataType from '../../Types/types'

//components
import SwitchButton from '../Buttons/SwitchButton';
import Logs from './Logs/Logs';
import Profiles from './Profiles/Profiles';
import Schedule from './Schedule/Schedule';
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

const MainWindow: React.FC = () => {

    const classes = useStyles();
    const dispatch = useDispatch()

    const currentState:any = useSelector((state:any)=>{
      return(
        state
      )
    })

    useEffect(()=>{
      if(currentState.heatingSchedule){
        const activeProfile =  currentState.heatingSchedule[0]?.schedule.find((profile:any)=>{//define type later
          const timeNow = new Date().toString().split(" ")[4].split(":").splice(0,2);
          if(timeNow[0] >= profile.profileStart.split(":")[0] && timeNow[0] <= profile.profileEnd.split(":")[0]){
            if(timeNow[0] ===  profile.profileEnd.split(":")[0]){
              return timeNow[1] <=  profile.profileEnd.split(":")[1] ? profile : null
            } else if (timeNow[1] === profile.profileStart.split(":")[0]){
              return timeNow[1] >= profile.profileStart.split(":")[1] ? profile : null
            } else {
              return profile
            }
          }
        })
        dispatch(setActiveProfile(activeProfile))
      }

    },[currentState.heatingSchedule])

  return (
    <div className={classes.main}>
        <Routes>
          <Route path='/' element={<p>Home</p>}/>
          <Route path='schedule' element={<Schedule weekSchedule={currentState.heatingSchedule} heatingProfiles={currentState.heatingProfiles}/>}/>
          <Route path='schedule/:weekday' element={<EditWeekdaySchedule />}/>
          <Route path='profiles' element={<Profiles/>}/>
          <Route path='notifications' element={<Logs/>}/>
          <Route path='/Error' element={<ErrorComponent/>}/>
          <Route path='*' element={<ErrorComponent/>}/>
        </Routes>
    </div>
  );
};

export default MainWindow;
