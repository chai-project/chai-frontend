import React, {useEffect, useState} from 'react';

import { useParams, useNavigate } from 'react-router-dom';


//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid, IconButton, Typography, CircularProgress } from '@mui/material/';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';



// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';
import {setNewHeatingSchedule} from '../../../../Redux-reducers/heatingScheduleReducer'


//types
import timeslot from '../../../../Types/types';

//components
import Weekday from '../Weekday';
import WeekdayPaste from '../WeekdayPaste';
import ProgressCircular from '../../../ProgressBar/ProgressCircular';
import Labels from './Labels';
import TimeslotsData from './TimeslotsData';
// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      //  boxSizing: 'border-box',
      //  position: 'relative', //sitas!!!
       width: '100%',
       height: '100%',
      //  border: "10px solid pink",
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
    closePageButton:{
        position:'absolute',
    },
    mainContainer:{
      border: "1px solid lime",
      height: '100%'
    },
    secondaryContainer :{
      border: "1px solid pink",
      width: '100%',
      overflow: 'auto'
    },
    saveAndCancelButtons:{
      // border: "1px solid pink",
      // position:'absolute',
      // left: '82%',
      // marginLeft:'50px',
    },
    timeslotsData:{
      maxHeight:'70%',
      width: '100%',
      overflow: 'auto',
      '@global': {
        '*::-webkit-scrollbar': {
          width: '0.4em'
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: '#5ACBCC',
          outline: '1px solid slategrey'
        }
      },
    }
  }),
);

const EditWeekdaySchedule: React.FC = () => {
  const [weekdayScheduleToEdit, setWeekdayScheduleToEdit] = useState<any>(null); //define type

  const {weekday} = useParams();

  const weekdaySchedule = useSelector((state:any)=>{//define type
    // console.log(state)
    return(
      state.heatingSchedule?.find((weekdaySchedule:any)=>{ //define type
        return weekdaySchedule.weekday.toLowerCase() === weekday?.toLowerCase() ? weekdaySchedule : null
      })
    )
  })

  useEffect(()=>{
    setWeekdayScheduleToEdit(weekdaySchedule.schedule);
  },[weekdaySchedule.schedule]);
  
    // const [weekdayScheduleToEdit, setWeekdayScheduleToEdit] = useState<any>(weekdaySchedule.schedule); //define type
    const classes = useStyles();
    const dispatch = useDispatch()
    // const {weekday} = useParams();
    const navigate = useNavigate();
    
    // const weekdaySchedule = useSelector((state:any)=>{//define type
    //   // console.log(state)
    //   return(
    //     state.heatingSchedule?.find((weekdaySchedule:any)=>{ //define type
    //       return weekdaySchedule.weekday.toLowerCase() === weekday?.toLowerCase() ? weekdaySchedule : null
    //     })
    //   )
    // })
    // const [weekdayScheduleToEdit, setWeekdayScheduleToEdit] = useState<any>(weekdaySchedule.schedule); //define type

    // console.log('swx:',weekdayScheduleToEdit)

    const closeEditWeekdayPage = () => {
      navigate('/Schedule')
    }

    const saveWeekdayScheduleChanges = () => {
      console.log('save')
    };

    const cancelWeekdayScheduleChanges = () => {
      setWeekdayScheduleToEdit(weekdaySchedule.schedule);
    };

    const krw =() => {
      // const newwtf = weekdayScheduleToEdit.filter((timeslot:any)=>{
      //   if(timeslot.id === 0){
      //     timeslot.profileName = "WTF????"
      //     return timeslot
      //   }else{
      //     return timeslot
      //   }
      // })
      // console.log(newwtf)
      // let beleka = weekdayScheduleToEdit.map((t:any)=>{
      //   if(t.id===0){
      //     // t.profileName = "ZEURU!!!"
      //     return {...t, profileName: 'ZEURU KRW'}
      //   }else {
      //     return {...t}
      //   }
      // });
      // console.log(beleka)
      console.log(weekdaySchedule.schedule, 'redux');
      console.log(weekdayScheduleToEdit, 'local')
    }
      
    // console.log(weekdaySchedule.schedule, 'redux');
    // console.log(weekdayScheduleToEdit, 'local')
  return (
    <Grid>
    <Grid container className={classes.main} direction="column" alignItems="center" justifyContent="flex-start">
      <Grid xs={1} item container direction="row" alignItems="center" justifyContent="center">
        <Grid xs={4}item ></Grid>
        <Grid xs={4} item container direction="row" alignItems="center" justifyContent="center">
          <Typography><b>{weekdaySchedule.weekday}</b></Typography>
        </Grid>
        <Grid xs={3.75} item container direction="row" alignItems="center" justifyContent="flex-end">
            <IconButton className={classes.closePageButton} size='small' edge='start' color='primary' onClick={closeEditWeekdayPage}>
              <HighlightOffIcon/>
            </IconButton>
        </Grid>
        <Grid xs={0.25} item></Grid>
      </Grid>
      <Grid xs={6}className={classes.timeslotsData} item>
        <TimeslotsData timeslots={weekdayScheduleToEdit} setWeekdayScheduleToEdit={setWeekdayScheduleToEdit} />
      </Grid>
      <Grid xs={4.25} item>chart</Grid>
      <Grid xs={0.75} item container direction="row" alignItems="flex-start" justifyContent="flex-end">
        {weekdayScheduleToEdit !== weekdaySchedule.schedule ? 
                                                                  <Grid xs={5} item className={classes.saveAndCancelButtons} container  direction="row" alignItems="flex-start" justifyContent="flex-end" spacing={1}>
                                                                    <Grid item>
                                                                      <Button variant="contained" color='primary' size='small' onClick={saveWeekdayScheduleChanges}>Save</Button>
                                                                    </Grid>
                                                                    <Grid item>
                                                                      <Button variant="contained" color='secondary' size='small' onClick={cancelWeekdayScheduleChanges}>Cancel</Button>
                                                                    </Grid>
                                                                    <Grid xs={0.5}></Grid>
                                                                  </Grid>
                                                                  :null 
        }
      </Grid>
    </Grid>
    </Grid>
  );
};

export default EditWeekdaySchedule;
