import React, {useEffect, useState} from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { createBrowserHistory } from 'history';



//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button, Grid, IconButton } from '@mui/material/';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';



// redux
import {useSelector, useDispatch} from 'react-redux'
import {setNewHeatingSchedule} from '../../../../Redux-reducers/heatingScheduleReducer'

//utils
import utils from '../../../Utils/utils';


//components
import TimeslotsData from './TimeslotsData';
// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
       position: 'absolute',
       width: '100%',
       height: '100%',
    },
    closePageButton:{

    },
    saveAndCancelButtons:{

    },
    button:{

      [theme.breakpoints.down('md')]: {
        height: '25px',
      },
      [theme.breakpoints.down('sm')]: {
        height: '100%',
      }
    },
    timeslotsData:{
      maxHeight:'83%',
      [theme.breakpoints.down('md')]: {

      },
    },
    titleAndCloseButton:{

    }
  }),
);

const EditWeekdaySchedule: React.FC = () => {
  const [weekdayScheduleToEdit, setWeekdayScheduleToEdit] = useState<any>(null);

  const url = createBrowserHistory()
  const parameters = new URLSearchParams(url.location.search);
  const homeLabel =  parameters.get('home')
  const {weekday} = useParams();

  const weekdaySchedule = useSelector((state:any)=>{
    return(
      state.heatingSchedule?.find((weekdaySchedule:any)=>{
        return weekdaySchedule.weekday.toLowerCase() === weekday?.toLowerCase() ? weekdaySchedule : null
      })
    )
  })

  useEffect(()=>{
    setWeekdayScheduleToEdit(weekdaySchedule?.schedule);
  },[weekdaySchedule?.schedule]);
  

    const classes = useStyles();
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const closeEditWeekdayPage = () => {
      navigate('/Schedule')
    }

    const saveWeekdayScheduleChanges = () => {
      dispatch(setNewHeatingSchedule(homeLabel, [weekday], weekdayScheduleToEdit))
    };

    const cancelWeekdayScheduleChanges = () => {
      setWeekdayScheduleToEdit(weekdaySchedule.schedule);
    };

  return (
      <Grid container className={classes.main} direction="column" alignItems="center" justifyContent="flex-start">
        <Grid xs={1} item container  direction="row" alignItems="center" justifyContent="flex-end" className={classes.titleAndCloseButton}>
            <Grid item xs={0.5}></Grid>
            <Grid item xs={11} container direction="row" alignItems="center" justifyContent="flex-start"><b>{weekdaySchedule?.weekday}</b></Grid>
            <Grid item xs={0.5}>
              <IconButton className={classes.closePageButton} size='small' edge='start' color='primary' onClick={closeEditWeekdayPage}>
                <HighlightOffIcon/>
              </IconButton>
            </Grid>
        </Grid>
        <Grid xs={10} item container className={classes.timeslotsData}>
          <TimeslotsData timeslots={weekdayScheduleToEdit} setWeekdayScheduleToEdit={setWeekdayScheduleToEdit} />
        </Grid>
        <Grid xs={1} className={classes.saveAndCancelButtons} item container direction="row" alignItems="center" justifyContent="flex-end">
          {utils.areEqualArray(weekdaySchedule?.schedule, weekdayScheduleToEdit) === false || weekdayScheduleToEdit?.length !== weekdaySchedule?.schedule.length ? 
            <Grid xs={5} item  container  direction="row" alignItems="center" justifyContent="flex-end" spacing={1}>
              <Grid item>
                <Button variant="contained" color='primary' size='small' className={classes.button} onClick={saveWeekdayScheduleChanges}>Save</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color='secondary' size='small' className={classes.button} onClick={cancelWeekdayScheduleChanges}>Cancel</Button>
              </Grid>
              <Grid xs={0.5}></Grid>
            </Grid>
            :null 
          }
        </Grid>
      </Grid>
  );
};

export default EditWeekdaySchedule;
