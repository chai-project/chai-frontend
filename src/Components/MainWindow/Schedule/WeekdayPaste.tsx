import React, {useState} from 'react';

//mui
import useMediaQuery from '@mui/material/useMediaQuery';
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {Button, Grid, Divider, IconButton, Box, useTheme, Typography } from '@mui/material/';
import ClearIcon from '@mui/icons-material/Clear';

//types
import timeslot from '../../../Types/types';


//components
import WeekdayScheduleView from './WeekdayScheduleView';
// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topBorder: {
       position: 'relative',
       width: '100%',
       height: '100%',
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
      height: '75%',
      [theme.breakpoints.down('md')]: {
        height: '60%',
      },
      [theme.breakpoints.down('sm')]: {
        height: '70%',
      }
    },
    schedule:{
      height: '80%',
  },
    schedulePaste:{
        border: "1px dashed #57CBCC",
        height: '80%',
    },
    clearButton:{
        height: '80%',
    },
    pasteButton:{
      height: '20px'
    },
    
  }),
);

const WeekdayPaste: React.FC<{weekday: String, setCopyWeekdaySchedule:any, scheduleToCopy:timeslot[]|null, setWeekdaysToPasteSchedule:any, weekdaysToPasteSchedule:String[],  indexOfASchedeule:number, scheduleForAWeekday:any}>= ({weekday,setCopyWeekdaySchedule,scheduleToCopy, setWeekdaysToPasteSchedule, weekdaysToPasteSchedule,  indexOfASchedeule, scheduleForAWeekday}) => {
    const [pasteScheduleForAWeekday, setPasteScheduleForAWeekday] = useState<any>(null); 

    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.down("md"));

    //delete weekday copy button
    const deleteWeekdayScheduleCopy = () => {
      setWeekdaysToPasteSchedule(weekdaysToPasteSchedule.filter((day:any)=>{return day !== weekday}))
      setPasteScheduleForAWeekday(null)
    };
    //paste weekday button
    const pasteWeekdaySchedule = () => {
      setPasteScheduleForAWeekday(scheduleToCopy);
      setWeekdaysToPasteSchedule((weekdaysToPasteSchedule:String[]) => [...weekdaysToPasteSchedule, weekday])
    };
    //styles 
    const classes = useStyles();


  return (
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
    </Box>
  );
};

export default WeekdayPaste;
