import React from 'react';



//mui
import {makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import { Grid } from '@mui/material/';


//components
import Weekday from './Weekday';
import WeekdayPaste from './WeekdayPaste';

// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
       position: 'relative',
       width: '100%',
       height: '100%',
    },
    container:{
        width: '100%',
        height: '100%',
    },
    weekday:{
        height: '12%',
        width: '100%',
    },
    saveAndCancelButons:{
        height: '7%', 
        width:'100%',
    },
    schedule:{

    },
    confirmButtons:{

    }
  }),
);

const Schedule: React.FC<{weekSchedule:any,copyWeekdaySchedule:any, setCopyWeekdaySchedule:any, setScheduleToCopy:any, weekdaysToPasteSchedule:any, scheduleToCopy:any, setWeekdaysToPasteSchedule:any}> = ({weekSchedule,copyWeekdaySchedule, setCopyWeekdaySchedule, setScheduleToCopy, weekdaysToPasteSchedule, scheduleToCopy, setWeekdaysToPasteSchedule }) => {
    const classes = useStyles();
    const theme = useTheme();

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

