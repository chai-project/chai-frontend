import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { createBrowserHistory } from 'history';
import useMediaQuery from '@mui/material/useMediaQuery';



//mui
import {makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid , Box} from '@mui/material/';



// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';
import {setNewHeatingSchedule} from '../../../Redux-reducers/heatingScheduleReducer'
import { setActiveProfile } from '../../../Redux-reducers/heatingComponentReducer';


//types
import timeslot from '../../../Types/types';

//components
import Weekday from './Weekday';
import WeekdayPaste from './WeekdayPaste';
import ProgressCircular from '../../ProgressBar/ProgressCircular';
import TimeslotMoreInfoOverlay from './Edit/SelectedTimeslot/TimeslotMoreInfoOverlay';
// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      //  boxSizing: 'border-box',
       position: 'relative', //sitas!!!
       width: '100%',
       height: '100%',
    //    border: "2px solid orange",
      //  background: '#CFD8DC',
      //  left: '4%',
      //  top: '10%',
    },
    container:{
        // border: "1px solid pink",
        width: '100%',
        height: '100%',
          //  background: '#CFD8DC',
    },
    weekday:{
        // border: "1px solid lime",
        height: '12%', // buvo 13 o anksciau 12
        width: '100%',
        // marginTop: '10%',

    },
    saveAndCancelButons:{
        // border: "1px solid lime",
        // position:'absolute', //buvo absolute 
        height: '7%', 
        width:'100%',
    },
    schedule:{
    //   border: "1px solid lime",
    },
    confirmButtons:{
    //   border: "1px solid red",
    },
    test:{
    //   border: "1px solid red",

    }
  }),
);

const Schedule: React.FC<{weekSchedule:any,copyWeekdaySchedule:any, setCopyWeekdaySchedule:any, setScheduleToCopy:any, weekdaysToPasteSchedule:any, scheduleToCopy:any, setWeekdaysToPasteSchedule:any}> = ({weekSchedule,copyWeekdaySchedule, setCopyWeekdaySchedule, setScheduleToCopy, weekdaysToPasteSchedule, scheduleToCopy, setWeekdaysToPasteSchedule }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.down("md"));



  return (
    <Grid xs={12} item container direction="column" justifyContent="flex-end" alignItems="flex-end" className={classes.main}>
        {/* {weekSchedule?.map((weekday:any, index:number)=>{
            return (
                <Grid className={classes.test} xs={1.71428571429} item>
                        <Weekday weekday={weekday.weekday} scheduleForAWeekday={weekday} copyWeekdaySchedule={copyWeekdaySchedule} setCopyWeekdaySchedule={setCopyWeekdaySchedule} setScheduleToCopy={setScheduleToCopy} indexOfASchedeule={index}/>
                </Grid>
            )
        })} */}


        {weekSchedule?.map((weekday:any, index:number)=>{
                if(copyWeekdaySchedule){
                  if(copyWeekdaySchedule === weekday.weekday){
                    return (
                      <Grid xs={1.71428571429} item className={classes.weekday}>
                          <Weekday weekday={weekday.weekday} scheduleForAWeekday={weekday} copyWeekdaySchedule={copyWeekdaySchedule} setCopyWeekdaySchedule={setCopyWeekdaySchedule} setScheduleToCopy={setScheduleToCopy} indexOfASchedeule={index} />
                      </Grid>
                    ) 
                  }else{
                    return (
                      <Grid xs={1.71428571429} item className={classes.weekday}>
                          <WeekdayPaste weekday={weekday.weekday} scheduleForAWeekday={weekday} setCopyWeekdaySchedule={setCopyWeekdaySchedule} scheduleToCopy={scheduleToCopy} setWeekdaysToPasteSchedule={setWeekdaysToPasteSchedule} weekdaysToPasteSchedule={weekdaysToPasteSchedule}  indexOfASchedeule={index}/>
                      </Grid>
                    )
                  }
                }else{
                  return (
                    <Grid xs={1.71428571429} item className={classes.weekday}>
                        <Weekday weekday={weekday.weekday} scheduleForAWeekday={weekday} copyWeekdaySchedule={copyWeekdaySchedule} setCopyWeekdaySchedule={setCopyWeekdaySchedule} setScheduleToCopy={setScheduleToCopy} indexOfASchedeule={index}/>
                    </Grid>
                  )
                }
        })}
        {/* {heatingProfiles.selectedTimeslot ? <TimeslotMoreInfoOverlay heatingProfiles={heatingProfiles}/> : null} */}
      {/* <Grid item xs={11} container direction="row" justifyContent={weekSchedule ? "center" : "center"} alignItems="center" className={classes.schedule}>
        <Grid item>
          {weekSchedule ? null : <ProgressCircular size={40}/>}
        </Grid>
      </Grid> */}
      {/* <Grid item xs={1} container className={classes.confirmButtons}>
        {copyWeekdaySchedule? 
                            <Grid item container direction="row" justifyContent="flex-end" alignItems="center" >
                              <Grid item>
                                <Button variant="contained" size="small" color="primary" onClick={saveNewWeekSchedule}>Save</Button>
                              </Grid>
                              <Grid item xs={0.2}></Grid>
                              <Grid item>
                                <Button variant="contained" size="small" color="secondary" onClick={cancelWeekScheduleChanges}>Cancel</Button>
                              </Grid>
                              <Grid item xs={0.4}></Grid>
                            </Grid>
                            :null
        }
      </Grid> */}
        {/* <Grid container xs={12} className={classes.container} direction="row" justifyContent={weekSchedule ? "center" : "center"} alignItems="center"> buvo justify content center */}
            {/* {weekSchedule ? null :           
                                  <Grid item>
                                    <ProgressCircular size={40}/>
                                  </Grid>
            } */}
              {/* {weekSchedule?.map((weekday:any, index:number)=>{
                if(copyWeekdaySchedule){
                  if(copyWeekdaySchedule === weekday.weekday){
                    return (
                      <Grid item className={classes.weekday}>
                          <Weekday weekday={weekday.weekday} scheduleForAWeekday={weekday} copyWeekdaySchedule={copyWeekdaySchedule} setCopyWeekdaySchedule={setCopyWeekdaySchedule} setScheduleToCopy={setScheduleToCopy} indexOfASchedeule={index}/>
                      </Grid>
                    ) 
                  }else{
                    return (
                      <Grid item className={classes.weekday}>
                          <WeekdayPaste weekday={weekday.weekday} scheduleForAWeekday={weekday} setCopyWeekdaySchedule={setCopyWeekdaySchedule} scheduleToCopy={scheduleToCopy} setWeekdaysToPasteSchedule={setWeekdaysToPasteSchedule} weekdaysToPasteSchedule={weekdaysToPasteSchedule}  indexOfASchedeule={index}/>
                      </Grid>
                    )
                  }
                }else{
                  return (
                    <Grid item className={classes.weekday}>
                        <Weekday weekday={weekday.weekday} scheduleForAWeekday={weekday} copyWeekdaySchedule={copyWeekdaySchedule} setCopyWeekdaySchedule={setCopyWeekdaySchedule} setScheduleToCopy={setScheduleToCopy} indexOfASchedeule={index}/>
                    </Grid>
                  )
                }
              })} */}
              {/* <Grid item container className={classes.saveAndCancelButons} direction="row" justifyContent="flex-end" alignItems="center"> */}
              {/* {copyWeekdaySchedule? 
                          <Grid item container direction="row" justifyContent="flex-end" alignItems="center" >
                            <Grid item>
                              <Button variant="contained" size="small" color="primary" onClick={saveNewWeekSchedule}>Save</Button>
                            </Grid>
                            <Grid item xs={0.2}></Grid>
                            <Grid item>
                              <Button variant="contained" size="small" color="secondary" onClick={cancelWeekScheduleChanges}>Cancel</Button>
                            </Grid>
                            <Grid item xs={0.4}></Grid>
                          </Grid>
                          :null
                } */}
                {/* </Grid> */}
        {/* </Grid> */}
    </Grid>
  );
};

export default Schedule;

