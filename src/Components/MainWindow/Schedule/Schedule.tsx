import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { createBrowserHistory } from 'history';
import useMediaQuery from '@mui/material/useMediaQuery';



//mui
import {makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid , Box} from '@mui/material/';

// redux
import {useSelector, useDispatch} from 'react-redux'

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
    </Grid>
  );
};

export default Schedule;

