import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid, Divider, IconButton, Box, Menu, MenuItem, Fade } from '@mui/material/';
import ClearIcon from '@mui/icons-material/Clear';



// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';


//types
import timeslot from '../../../Types/types';


//components
import WeekdayScheduleView from './WeekdayScheduleView';
import { Typography } from '@material-ui/core';
// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topBorder: {
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
        // border: "2px dashed red",
        width: '100%',
        height: '75%',
          //  background: 'red',
    },
    schedule:{
      // border: "1px solid pink",
      height: '70%',
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
  }),
);

const WeekdayPaste: React.FC<{weekday: String, setCopyWeekdaySchedule:any, scheduleToCopy:timeslot[]|null}>= ({weekday,setCopyWeekdaySchedule,scheduleToCopy}) => {
    const [pasteScheduleForAWeekday, setPasteScheduleForAWeekday] = useState<timeslot[] | null>(null);

    //delete weekday copy button
    const deleteWeekdayScheduleCopy = () => {
      console.log('deleting copy of: ', weekday);
      setPasteScheduleForAWeekday(null)
    };
    //paste weekday button
    const pasteWeekdaySchedule = () => {
      console.log('pasting to: ', weekday);
      setPasteScheduleForAWeekday(scheduleToCopy);
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
        <Divider className={classes.divider} textAlign='left'><b>{weekday}</b></Divider>
        <Grid container className={classes.container} direction="row" justifyContent="center" alignItems="center">
          {pasteScheduleForAWeekday ? 
                                    <Grid item xs={8} className={classes.schedule}>
                                      <WeekdayScheduleView timeslots={pasteScheduleForAWeekday}/>
                                    </Grid>
                                    : 
                                    <Grid item container xs={8} className={classes.schedulePaste} direction="row" justifyContent="center" alignItems="center">
                                      <Button variant="outlined" size="small" onClick={pasteWeekdaySchedule} >Paste</Button>
                                    </Grid>
                                    }
            {/* <Grid item container xs={8} className={classes.schedulePaste} direction="row" justifyContent="center" alignItems="center">
              <Button variant="outlined" size="small" onClick={pasteWeekdaySchedule} >Paste</Button>
              <button onClick={()=>{      console.log('schedule???: ', pasteScheduleForAWeekday);}}>karocia</button>
            </Grid>
            <Grid item xs={8} className={classes.schedule}>
              <WeekdayScheduleView timeslots={pasteScheduleForAWeekday}/>
            </Grid> */}
            <Grid item xs={0.5}></Grid>
            <Grid item xs={1} container className={classes.clearButton}  direction="row" justifyContent="center" alignItems="center">
              {pasteScheduleForAWeekday ? 
                                        <IconButton size='small' edge='start' color='secondary' onClick={deleteWeekdayScheduleCopy}>
                                          <ClearIcon/>
                                        </IconButton> 
                                        : null}
            </Grid>
        </Grid>
    </Box>
  );
};

export default WeekdayPaste;
