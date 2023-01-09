import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";


//mui
import useMediaQuery from '@mui/material/useMediaQuery';
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid, Divider, IconButton, Box, Menu, MenuItem, Fade, useTheme, Typography } from '@mui/material/';
import ClearIcon from '@mui/icons-material/Clear';



// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';


//types
import timeslot from '../../../Types/types';


//components
import WeekdayScheduleView from './WeekdayScheduleView';
// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topBorder: {
        // border: "2px dashed red",
      //  boxSizing: 'border-box',
       position: 'relative', //sitas!!!
       width: '100%',
       height: '100%',
    //    background: '#CFD8DC',
      //  left: '4%',
      //  top: '10%',
    },
    divider:{
        "&.MuiDivider-root": {
          "&::before": {
            borderTop: "medium solid #57CBCC"
          },
          "&::after": {
            borderTop: "medium solid #57CBCC"
          }
        },
    },
    container:{
      // border: "1px dashed red",
      height: '75%',
      [theme.breakpoints.down('md')]: {
        height: '60%', //780px
      },
      [theme.breakpoints.down('sm')]: {
        height: '70%',
        // minHeight: '650px',
      }
          //  background: 'red',
    },
    schedule:{
      // border: "1px solid pink",
      height: '80%',
      // background: 'red',
      // borderRadius: '25px',
      // overflow: 'hidden',
      // height: '12%',
      // width: '100%',

  },
    schedulePaste:{
        border: "1px dashed #57CBCC",
        height: '80%',
        // background: 'red',
        // borderRadius: '25px',
        // overflow: 'hidden',
        // height: '12%',
        // width: '100%',

    },
    clearButton:{
        // border: "1px solid pink",
        height: '80%',
        // background: 'red',
    },
    pasteButton:{
      height: '20px'
    },
    
  }),
);

const WeekdayPaste: React.FC<{weekday: String, setCopyWeekdaySchedule:any, scheduleToCopy:timeslot[]|null, setWeekdaysToPasteSchedule:any, weekdaysToPasteSchedule:String[],  indexOfASchedeule:number, scheduleForAWeekday:any}>= ({weekday,setCopyWeekdaySchedule,scheduleToCopy, setWeekdaysToPasteSchedule, weekdaysToPasteSchedule,  indexOfASchedeule, scheduleForAWeekday}) => {
    const [pasteScheduleForAWeekday, setPasteScheduleForAWeekday] = useState<any>(null); //define type was timeslot[]|null

    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.down("md"));


    // console.log(scheduleForAWeekday)
    //delete weekday copy button
    const deleteWeekdayScheduleCopy = () => {
      // console.log('deleting copy of: ', weekdaysToPasteSchedule, weekday);
      setWeekdaysToPasteSchedule(weekdaysToPasteSchedule.filter((day:any)=>{return day !== weekday}))
      setPasteScheduleForAWeekday(null)
    };
    //paste weekday button
    const pasteWeekdaySchedule = () => {
      // console.log('pasting to: ', weekday);
      setPasteScheduleForAWeekday(scheduleToCopy);
      setWeekdaysToPasteSchedule((weekdaysToPasteSchedule:String[]) => [...weekdaysToPasteSchedule, weekday])
    };
    //styles 
    const classes = useStyles();
    //redux
    const dispatch = useDispatch()

//   const getData = () => {
//     dispatch(initializeData())
//   }

  return (
    //buvo div konteineris vietoj box todel tos  spalvos nebuvo ir schedule componenete spacingas 0.5 dabar anksciau jo iswiso nebuvo geriau atrodo 
    //gal iswiso tamsi spalva pgal mane
    <Box className={classes.topBorder} bgcolor="background.default" >
        <Divider className={classes.divider} textAlign='left'><Typography variant={breakpoint ? "subtitle2" : 'inherit'}><b>{scheduleForAWeekday.weekday}</b></Typography></Divider>
        <Grid item container className={classes.container} direction="row" justifyContent="center" alignItems="flex-start">
          <Grid item xs={8} container direction="row" justifyContent="center" alignItems="center" className={pasteScheduleForAWeekday ? classes.schedule : classes.schedulePaste }>
          {pasteScheduleForAWeekday ? <WeekdayScheduleView timeslots={pasteScheduleForAWeekday.schedule} indexOfaWeekday={indexOfASchedeule} weekday={weekday}/> : <Button variant="outlined" size="small" onClick={pasteWeekdaySchedule} className={classes.pasteButton}>Paste</Button>}
          </Grid>
          <Grid item xs={1} container className={classes.clearButton}  direction="column" justifyContent="center" alignItems="center">
          {pasteScheduleForAWeekday ? 
                                        <IconButton size='small' edge='start' color='secondary' onClick={deleteWeekdayScheduleCopy} sx={breakpoint ? {fontSize:'20px'} : {fontSize:'24px'}}>
                                          <ClearIcon/>
                                        </IconButton> 
                                        : null}
          </Grid>
        </Grid>
        {/* <Grid container className={classes.container} direction="row" justifyContent="center" alignItems="center">
          {pasteScheduleForAWeekday ? 
                                    <Grid item xs={8} className={classes.schedule}>
                                      <WeekdayScheduleView timeslots={pasteScheduleForAWeekday.schedule} indexOfaWeekday={indexOfASchedeule} weekday={weekday}/>
                                    </Grid>
                                    : 
                                    <Grid item container xs={8} className={classes.schedulePaste} direction="row" justifyContent="center" alignItems="center">
                                      <Button variant="outlined" size="small" onClick={pasteWeekdaySchedule} className={classes.pasteButton}>Paste</Button>
                                    </Grid>
                                    }
            <Grid item xs={0.5}></Grid>
            <Grid item xs={1} container className={classes.clearButton}  direction="row" justifyContent="center" alignItems="center">
              {pasteScheduleForAWeekday ? 
                                        <IconButton size='small' edge='start' color='secondary' onClick={deleteWeekdayScheduleCopy}>
                                          <ClearIcon/>
                                        </IconButton> 
                                        : null}
            </Grid>
        </Grid> */}
    </Box>
  );
};

export default WeekdayPaste;
