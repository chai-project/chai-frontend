import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid } from '@mui/material/';



// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';


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
        height: '6%'
    },
  }),
);

const Schedule: React.FC = () => {
    const [copyWeekdaySchedule, setCopyWeekdaySchedule] = useState<string | null>(null);
    const [scheduleToCopy, setScheduleToCopy] = useState<timeslot[]|null>(null);
    const weekdays = ["Monday", 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    const classes = useStyles();
    const dispatch = useDispatch()

    //save&cancel buttons
    const saveNewWeekSchedule = () => {
      console.log('saving new week schedule')
    };
    const cancelWeekScheduleChanges = () => {
      console.log('cancel new week schedule changes');
      setCopyWeekdaySchedule(null)
    };

//   const getData = () => {
//     dispatch(initializeData())
//   }

  return (
    //atkreipk demesi i spacing ant container class
    <div className={classes.main}>
        <Grid container className={classes.container} direction="column" justifyContent="center" alignItems="center" spacing={0.5} >
        {/* {copyWeekdaySchedule? 
                        <Grid item container className={classes.saveAndCancelButons} direction="row" justifyContent="center" alignItems="center" >
                          <Grid item>
                            <Button variant="contained" size="small" color="primary" onClick={saveNewWeekSchedule}>Save</Button>
                          </Grid>
                          <Grid item xs={0.2}></Grid>
                          <Grid item>
                            <Button variant="contained" size="small" color="secondary" onClick={cancelWeekScheduleChanges}>Cancel</Button>
                          </Grid>
                        </Grid>
                        :null} */}
            {/* <Grid item className={classes.weekday}>
                <Weekday/>
            </Grid> */}
            {/* <button onClick={()=>{console.log(copyWeekdaySchedule,scheduleToCopy)}}>state</button> */}
            {weekdays.map((weekday)=>{
              if(copyWeekdaySchedule){
                if(copyWeekdaySchedule === weekday){
                  return (
                    <Grid item className={classes.weekday}>
                        <Weekday weekday={weekday} copyWeekdaySchedule={copyWeekdaySchedule} setCopyWeekdaySchedule={setCopyWeekdaySchedule} setScheduleToCopy={setScheduleToCopy}/>
                    </Grid>
                  ) 
                }else{
                  return (
                    <Grid item className={classes.weekday}>
                        <WeekdayPaste weekday={weekday} setCopyWeekdaySchedule={setCopyWeekdaySchedule} scheduleToCopy={scheduleToCopy}/>
                    </Grid>
                  )
                }
              }else{
                return (
                  <Grid item className={classes.weekday}>
                      <Weekday weekday={weekday} copyWeekdaySchedule={copyWeekdaySchedule} setCopyWeekdaySchedule={setCopyWeekdaySchedule} setScheduleToCopy={setScheduleToCopy}/>
                  </Grid>
                )
              }
                // return (
                //     <Grid item className={classes.weekday}>
                //         <Weekday weekday={weekday} setCopyWeekdaySchedule={setCopyWeekdaySchedule}/>
                //     </Grid>
                // )
            })}
            {copyWeekdaySchedule? 
                        <Grid item container className={classes.saveAndCancelButons} direction="row" justifyContent="center" alignItems="flex-end" >
                          <Grid item>
                            <Button variant="outlined" size="small" color="primary" onClick={saveNewWeekSchedule}>Save</Button>
                          </Grid>
                          <Grid item xs={0.2}></Grid>
                          <Grid item>
                            <Button variant="outlined" size="small" color="secondary" onClick={cancelWeekScheduleChanges}>Cancel</Button>
                          </Grid>
                        </Grid>
                        :null}
        </Grid>
    </div>
  );
};

export default Schedule;
