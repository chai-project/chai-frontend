import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid } from '@mui/material/';



// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';
import {setNewHeatingSchedule} from '../../../Redux-reducers/heatingScheduleReducer'


//types
import timeslot from '../../../Types/types';

//components
import Weekday from './Weekday';
import WeekdayPaste from './WeekdayPaste';
// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      //  boxSizing: 'border-box',
       position: 'relative', //sitas!!!
       width: '100%',
       height: '100%',
    //    background: '#CFD8DC',
      //  left: '4%',
      //  top: '10%',
    },
    container:{
        // border: "1px solid pink",
        width: '100%',
        height: '100%',
        //    background: '#CFD8DC',
    },
    weekday:{
        // border: "1px solid lime",
        height: '12%',
        width: '100%',
        // marginTop: '10%',

    },
    saveAndCancelButons:{
        // border: "1px solid lime",
        position:'relative',
        height: '6%',
        top: '2%',
    },
  }),
);

const Schedule: React.FC = () => {

    // const [newWeekSchedule, setNewWeekSchedule] = useState<any>([]);
    const [copyWeekdaySchedule, setCopyWeekdaySchedule] = useState<string | null>(null);
    const [scheduleToCopy, setScheduleToCopy] = useState<any>(null); // define type was timeslot[]|null
    const [weekdaysToPasteSchedule, setWeekdaysToPasteSchedule] = useState<String[]>([]);
    // const weekdays = ["Monday", 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],

    // setNewWeekSchedule(useSelector((state:any)=>{
    //   return(
    //     state.heatingSchedule
    //   )
    // }))
    const weekSchedule = useSelector((state:any)=>{
      return(
        state.heatingSchedule
      )
    })

    
    

    const classes = useStyles();
    const dispatch = useDispatch()

    //save&cancel buttons
    const saveNewWeekSchedule = () => {
      //define here new schedule/ send to reeducer and assign over there
      console.log('saving new week schedule')
      let newWeekSchedule:any = weekSchedule;
      weekdaysToPasteSchedule.forEach((weekday)=>{
        newWeekSchedule.map((weekdaySchedule:any)=>{
          return weekdaySchedule.weekday === weekday ? weekdaySchedule.schedule = scheduleToCopy.schedule : weekdaySchedule
        })
        //send to the server if 200, update redux
        dispatch(setNewHeatingSchedule(newWeekSchedule));
        setWeekdaysToPasteSchedule([]);
        setCopyWeekdaySchedule(null);
      });
    };
    const cancelWeekScheduleChanges = () => {
      setWeekdaysToPasteSchedule([]);
      setCopyWeekdaySchedule(null)
      
    };

//   const getData = () => {
//     dispatch(initializeData())
//   }
const generate = () => {
  let timeframes:any = []
  let hours:any
  let minutes:any
  for (let i = 0; i <= 96; i++) {
    if(i === 0 ){
      hours = 0;
      minutes = 0;
      timeframes.push({timeframeRepresentation : i, timeframe : "0" + hours.toString() + ":" + minutes.toString() + "0"})
    }else{
      minutes = minutes + 15
      if(minutes === 60){
        hours = hours + 1;
        minutes = 0;
        timeframes.push({timeframeRepresentation : i, timeframe : (hours<10) ?  "0" + hours.toString()  + ":" + minutes.toString() + "0" : hours.toString() + ":" + minutes.toString() + "0"})
      }else{
        timeframes.push({timeframeRepresentation : i, timeframe : (hours<10) ?  "0" + hours.toString()  + ":" + minutes.toString()  : hours.toString() + ":" + minutes.toString()})
      }
    }
  }
  console.log(timeframes)
}
  return (
    //atkreipk demesi i spacing ant container class
    <div className={classes.main}>
        <Grid container className={classes.container} direction="column" justifyContent="center" alignItems="center" spacing={0.5} >
            {weekSchedule?.map((weekday:any)=>{
              if(copyWeekdaySchedule){
                if(copyWeekdaySchedule === weekday.weekday){
                  return (
                    <Grid item className={classes.weekday}>
                        <Weekday weekday={weekday.weekday} scheduleForAWeekday={weekday} copyWeekdaySchedule={copyWeekdaySchedule} setCopyWeekdaySchedule={setCopyWeekdaySchedule} setScheduleToCopy={setScheduleToCopy}/>
                    </Grid>
                  ) 
                }else{
                  return (
                    <Grid item className={classes.weekday}>
                        <WeekdayPaste weekday={weekday.weekday} setCopyWeekdaySchedule={setCopyWeekdaySchedule} scheduleToCopy={scheduleToCopy} setWeekdaysToPasteSchedule={setWeekdaysToPasteSchedule} weekdaysToPasteSchedule={weekdaysToPasteSchedule}/>
                    </Grid>
                  )
                }
              }else{
                return (
                  <Grid item className={classes.weekday}>
                      <Weekday weekday={weekday.weekday} scheduleForAWeekday={weekday} copyWeekdaySchedule={copyWeekdaySchedule} setCopyWeekdaySchedule={setCopyWeekdaySchedule} setScheduleToCopy={setScheduleToCopy}/>
                  </Grid>
                )
              }
            })}
            {copyWeekdaySchedule? 
                        <Grid item container className={classes.saveAndCancelButons} direction="row" justifyContent="center" alignItems="flex-end" >
                          <Grid item>
                          {/* <Button variant="outlined" size="small" color="primary" onClick={generate}>generate</Button> */}
                            <Button variant="outlined" size="small" color="primary" onClick={saveNewWeekSchedule}>Save</Button>
                          </Grid>
                          <Grid item xs={0.2}></Grid>
                          <Grid item>
                            <Button variant="outlined" size="small" color="secondary" onClick={cancelWeekScheduleChanges}>Cancel</Button>
                          </Grid>
                        </Grid>
                        :null}
        </Grid>
        {/* <Grid container className={classes.container} direction="column" justifyContent="center" alignItems="center" spacing={0.5} >
          {weekSchedule?.map((weekday:any)=>{
            // console.log(weekday.weekday)
            return (
              // <p>hmm</p>
              <Grid item className={classes.weekday}>
                <Weekday weekday={weekday.weekday} copyWeekdaySchedule={copyWeekdaySchedule} setCopyWeekdaySchedule={setCopyWeekdaySchedule} setScheduleToCopy={setScheduleToCopy}/>
              </Grid>
            )
          })}
        </Grid> */}
    </div>
  );
};

export default Schedule;
