import React, {useEffect, useState} from 'react';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button, Grid} from '@mui/material/';



// redux
import {useSelector, useDispatch} from 'react-redux'
import {initializeHeatingSchedule,setNewHeatingSchedule} from '../../../Redux-reducers/heatingScheduleReducer'
import { setErrorMessage } from '../../../Redux-reducers/notificationsReducer';

//components
import ProgressCircular from '../../ProgressBar/ProgressCircular';
import TimeslotMoreInfoOverlay from './Edit/SelectedTimeslot/TimeslotMoreInfoOverlay';
import Schedule from './Schedule';
import RefreshRequest from '../../RefreshRequest/RefreshRequest';

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

    },
    saveAndCancelButons:{
        height: '7%', 
        width:'100%',
    },
    schedule:{

    },
    confirmButtons:{

    },
    button:{
      [theme.breakpoints.down('md')]: {
        height: '25px',
      },
      [theme.breakpoints.down('sm')]: {
        height: '100%',
      }
    }
  }),
);

const ScheduleComponent: React.FC<{weekSchedule:any, heatingProfiles:any, homeLabel:any}> = ({weekSchedule, heatingProfiles, homeLabel}) => {
    const [copyWeekdaySchedule, setCopyWeekdaySchedule] = useState<string | null>(null);
    const [scheduleToCopy, setScheduleToCopy] = useState<any>(null); 
    const [weekdaysToPasteSchedule, setWeekdaysToPasteSchedule] = useState<String[]>([]);

    const classes = useStyles();
    const dispatch = useDispatch()

    useEffect(()=>{
      if(weekSchedule?.error){
        dispatch(setErrorMessage(weekSchedule.error, 5000))
      }
    },[weekSchedule])

    //save&cancel buttons
    const saveNewWeekSchedule = () => {
      dispatch(setNewHeatingSchedule(homeLabel, weekdaysToPasteSchedule, scheduleToCopy.schedule ));
      setWeekdaysToPasteSchedule([]);
      setCopyWeekdaySchedule(null);
    };
    const cancelWeekScheduleChanges = () => {
      setWeekdaysToPasteSchedule([]);
      setCopyWeekdaySchedule(null)
      
    };

  return (
    <Grid container direction="column" justifyContent="center" className={classes.main}>
        {heatingProfiles.selectedTimeslot ? <TimeslotMoreInfoOverlay heatingProfiles={heatingProfiles}/> : null}
      <Grid item xs={10.9} container direction="row" justifyContent={weekSchedule ? "center" : "center"} alignItems="center" className={classes.schedule}>
        { !weekSchedule ? <ProgressCircular size={40}/> : weekSchedule.error ? <RefreshRequest showError={"Error"} action={()=>{dispatch(initializeHeatingSchedule(homeLabel))}}/> : <Schedule weekSchedule={weekSchedule} copyWeekdaySchedule={copyWeekdaySchedule} setCopyWeekdaySchedule={setCopyWeekdaySchedule} setScheduleToCopy={setScheduleToCopy} scheduleToCopy={scheduleToCopy} weekdaysToPasteSchedule={weekdaysToPasteSchedule} setWeekdaysToPasteSchedule={setWeekdaysToPasteSchedule} />}
      </Grid>
      <Grid item xs={0.8} container className={classes.confirmButtons}>
        {copyWeekdaySchedule? 
                            <Grid item container direction="row" justifyContent="flex-end" alignItems="flex-end" >
                              <Grid item>
                                <Button variant="contained" size="small" color="primary" className={classes.button} onClick={saveNewWeekSchedule}>Save</Button>
                              </Grid>
                              <Grid item xs={0.2}></Grid>
                              <Grid item>
                                <Button variant="contained" size="small" color="secondary" className={classes.button} onClick={cancelWeekScheduleChanges}>Cancel</Button>
                              </Grid>
                              <Grid item xs={0.4}></Grid>
                            </Grid>
                            :null
        }
      </Grid>
    </Grid>
  );
};

export default ScheduleComponent;

