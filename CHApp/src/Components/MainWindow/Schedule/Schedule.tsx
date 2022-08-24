import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid } from '@mui/material/';



// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';


//types


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

    }
  }),
);

const Schedule: React.FC = () => {
    const [copyWeekdaySchedule, setCopyWeekdaySchedule] = useState<String | null>(null);
    const weekdays = ["Monday", 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    const classes = useStyles();
    const dispatch = useDispatch()

//   const getData = () => {
//     dispatch(initializeData())
//   }

  return (
    <div className={classes.main}>
        <Grid container className={classes.container} direction="column" justifyContent="center" alignItems="center" spacing={0.5}>
            {/* <Grid item className={classes.weekday}>
                <Weekday/>
            </Grid> */}
            {/* <button onClick={()=>{console.log(copyWeekdaySchedule)}}>state</button> */}
            {weekdays.map((weekday)=>{
              if(copyWeekdaySchedule){
                if(copyWeekdaySchedule === weekday){
                  return (
                    <Grid item className={classes.weekday}>
                        <Weekday weekday={weekday} setCopyWeekdaySchedule={setCopyWeekdaySchedule}/>
                    </Grid>
                  ) 
                }else{
                  return (
                    <Grid item className={classes.weekday}>
                        <WeekdayPaste weekday={weekday} setCopyWeekdaySchedule={setCopyWeekdaySchedule}/>
                    </Grid>
                  )
                }
              }else{
                return (
                  <Grid item className={classes.weekday}>
                      <Weekday weekday={weekday} setCopyWeekdaySchedule={setCopyWeekdaySchedule}/>
                  </Grid>
                )
              }
                return (
                    <Grid item className={classes.weekday}>
                        <Weekday weekday={weekday} setCopyWeekdaySchedule={setCopyWeekdaySchedule}/>
                    </Grid>
                )
            })}
        </Grid>
    </div>
  );
};

export default Schedule;
