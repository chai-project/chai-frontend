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
       position: 'absolute', //sitas!!!
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
      // border: "1px solid lime",
      height: '100%'
    },
    XAIcharts:{
      // border: "2px solid pink",
      width: '100%'
    },
    secondaryContainer :{
      // border: "1px solid pink",
      width: '100%',
      overflow: 'auto'
    },
    saveAndCancelButtons:{
      // border: "1px solid orange",
      // position:'absolute',
      // left: '82%',
      // marginLeft:'50px',
    },
    timeslotsData:{
      // position:'relative',
      // border: "2px dashed lime",
      // maxHeight:'45%',
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
    }
  }),
);

const EditWeekdaySchedule: React.FC = () => {
  const [weekdayScheduleToEdit, setWeekdayScheduleToEdit] = useState<any>(null); //define type
  const [schedulesAreEqual, setSchedulesAreEqual] = useState<boolean>(true)

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
    setWeekdayScheduleToEdit(weekdaySchedule?.schedule);
  },[weekdaySchedule?.schedule]);
  
  // useEffect(()=>{
  //   console.log('zerutu?')
  //   if(weekdayScheduleToEdit){
  //     for (let i = 0; i < weekdaySchedule.schedule.length; ++i) {
  //       if (weekdaySchedule.schedule[i] !== weekdayScheduleToEdit[i]){
  //         console.log('blblb')
  //         setSchedulesAreEqual(false)
  //         break;
  //       }
  //     }
  //     if(weekdaySchedule?.schedule.length !== weekdayScheduleToEdit.length){
  //       console.log('blblb')

  //       setSchedulesAreEqual(false)
  //     }
  //   }
  // },[weekdayScheduleToEdit]);

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
      // console.log(weekdayScheduleToEdit, 'blbbll')
      dispatch(setNewHeatingSchedule([weekday], weekdayScheduleToEdit))
      // console.log('save')
    };

    const cancelWeekdayScheduleChanges = () => {
      setWeekdayScheduleToEdit(weekdaySchedule.schedule);
    };

    // console.log(weekdaySchedule.schedule, 'redux');
    // console.log(weekdayScheduleToEdit, 'local')
  return (

      <Grid container className={classes.main} direction="column" alignItems="center" justifyContent="flex-start">
      <Grid xs={1} item container direction="row" alignItems="center" justifyContent="center">
          <Grid xs={1.5}item ></Grid>
          <Grid xs={8} item container direction="row" alignItems="center" justifyContent="center">
            <Typography><b>{weekdaySchedule?.weekday}</b></Typography>
          </Grid>
          <Grid xs={1} item container direction="row" alignItems="center" justifyContent="flex-end">
              {/* <Grid xs={9} item container className={classes.saveAndCancelButtons} direction="row" alignItems="center" justifyContent="flex-end" spacing={1}>
                <Grid item>{weekdayScheduleToEdit !== weekdaySchedule?.schedule ? <Button variant="contained" color='primary' size='small' onClick={saveWeekdayScheduleChanges}>Save</Button> : null}</Grid>
                <Grid item>{weekdayScheduleToEdit !== weekdaySchedule?.schedule ? <Button variant="contained" color='secondary' size='small' onClick={cancelWeekdayScheduleChanges}>Cancel</Button>:null}</Grid>
              </Grid> */}
              <Grid xs={1} item></Grid>
              <Grid xs={1} item>
                <IconButton className={classes.closePageButton} size='small' edge='start' color='primary' onClick={closeEditWeekdayPage}>
                  <HighlightOffIcon/>
                </IconButton>
              </Grid>
              {/* {weekdayScheduleToEdit !== weekdaySchedule.schedule? "swx": "bl"} */}
              {/* <IconButton className={classes.closePageButton} size='small' edge='start' color='primary' onClick={closeEditWeekdayPage}>
                <HighlightOffIcon/>
              </IconButton> */}
          </Grid>
          <Grid xs={0.5} item></Grid>
        </Grid>
        <Grid xs={5.25} item container> 
          <TimeslotsData timeslots={weekdayScheduleToEdit} setWeekdayScheduleToEdit={setWeekdayScheduleToEdit} />
        </Grid>
        <Grid xs={0} item className={classes.XAIcharts}>{/** XAI CHARTS **/}</Grid>
        <Grid xs={0.75} className={classes.saveAndCancelButtons} item container direction="row" alignItems="flex-start" justifyContent="flex-end">
          {weekdayScheduleToEdit !== weekdaySchedule.schedule || weekdayScheduleToEdit.length !== weekdaySchedule.schedule.length ? 
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
  );
};

export default EditWeekdaySchedule;
