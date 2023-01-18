import React, {useEffect, useState} from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { createBrowserHistory } from 'history';



//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid, IconButton, Typography, CircularProgress } from '@mui/material/';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';



// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';
import {setNewHeatingSchedule} from '../../../../Redux-reducers/heatingScheduleReducer'

//utils
import utils from '../../../Utils/utils';


//types
import timeslot from '../../../../Types/types';

//components
import TimeslotsData from './TimeslotsData';
// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      //  boxSizing: 'border-box',
       position: 'absolute', //sitas!!!
       width: '100%',
       height: '100%',
      //  border: "1px solid pink",
    //    background: '#CFD8DC',
      //  left: '4%',
      //  top: '10%',
    },
    closePageButton:{
      // position:'absolute',
      // border: "1px solid lime",

    },
    saveAndCancelButtons:{
      // border: "1px solid orange",
    },
    button:{
      // height: '20px'
      // height: '75%',
      [theme.breakpoints.down('md')]: {
        height: '25px', //780px
      },
      [theme.breakpoints.down('sm')]: {
        height: '100%',
        // minHeight: '650px',
      }
    },
    timeslotsData:{
      // position:'relative',
      // border: "1px dashed red",
      maxHeight:'83%',
      // width: '100%',
      // overflow: 'auto',
      [theme.breakpoints.down('md')]: {
        // maxHeight:'50%',
        // width: '20%',
        // fontSize: '14px',
        // marginLeft: 'auto',
        // marginRight: 'auto',
      },
      // '@global': {
      //   '*::-webkit-scrollbar': {
      //     width: '0.4em'
      //   },
      //   '*::-webkit-scrollbar-track': {
      //     '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
      //   },
      //   '*::-webkit-scrollbar-thumb': {
      //     backgroundColor: '#5ACBCC',
      //     outline: '1px solid slategrey'
      //   }
      // },
    },
    titleAndCloseButton:{
      // border: "1px dashed lime",
    }
  }),
);

const EditWeekdaySchedule: React.FC = () => {
  const [weekdayScheduleToEdit, setWeekdayScheduleToEdit] = useState<any>(null); //define type
  const [schedulesAreEqual, setSchedulesAreEqual] = useState<boolean>(true);

  const url = createBrowserHistory()
  const parameters = new URLSearchParams(url.location.search);
  const homeLabel =  parameters.get('home')
  const {weekday} = useParams();

  const weekdaySchedule = useSelector((state:any)=>{//define type
    return(
      state.heatingSchedule?.find((weekdaySchedule:any)=>{ //define type
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
