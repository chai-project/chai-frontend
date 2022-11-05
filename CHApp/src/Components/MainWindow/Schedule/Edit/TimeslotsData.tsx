import React, {useState} from 'react';

import { useParams, useNavigate } from 'react-router-dom';


//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid, IconButton, TextField, Box } from '@mui/material/';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/';

// import TimePicker from '@mui/x-date-pickers-pro/TimePicker';
// or
// import TimePicker from '@mui/x-date-pickers/TimePicker';
// or
// import { TimePicker } from '@mui/x-date-pickers-pro';
// or
import { TimePicker } from '@mui/x-date-pickers';



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
import { Typography } from '@material-ui/core';
import { profile, time } from 'console';
import TimeslotPeriodFromTo from './TimeslotPeriodFromTo';
import ProfilePicker from './ProfilePicker';
import Labels from './Labels';
import Setpoint from './Setpoint';
// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main:{
    //   border: "1px solid lime",
      height: '100%',
      width: '100%',
    },
    timeslots:{
        maxHeight: '70%',
        width: '100%',
        // border: "1px solid red",
        overflow: 'auto'
    },
    labels:{
        height: '7%',
        width: '100%',
        // border: "1px solid orange",
    },
    addNew:{
        height: '15%',
        width: '100%',
        // border: "1px solid orange",
    },
    timeslot:{
        width: '100%',
        marginTop: '5px',
        borderBottom: '1px solid #5ACBCC',
        borderTop: '1px solid #5ACBCC',
        // border: "4px solid lime",
    },
    profile:{
        // border: "1px solid red",
        fontSize: '15px',
        width: '14%',
        [theme.breakpoints.down('md')]: {
            width: '35%',
            fontSize: '14px',
            // marginLeft: 'auto',
            // marginRight: 'auto',
          }
    },
    setpoint:{
        // border: "1px solid red",
        width: '7%',
        fontSize: '15px',
        [theme.breakpoints.down('md')]: {
            width: '15%',
            fontSize: '14px',
            // marginLeft: 'auto',
            // marginRight: 'auto',
          }
    },
    period:{
        // border: "1px solid red",
        width: '35%',
        fontSize: '15px',
        [theme.breakpoints.down('md')]: {
            width: '42%',
            fontSize: '14px',
            // marginLeft: 'auto',
            // marginRight: 'auto',
          }
    },
    estimatedCosts:{
        // border: "1px solid red",
        width: '12%',
        fontSize: '15px',
        [theme.breakpoints.down('md')]: {
            width: '20%',
            fontSize: '14px',
            // marginLeft: 'auto',
            // marginRight: 'auto',
          }
    },
    deleteButton:{
        // border: "1px solid red",
        // width: '6%',
        // fontSize: '15px',
        [theme.breakpoints.down('md')]: {
            // width: '10%',
            // fontSize: '14px',
            // marginLeft: 'auto',
            // marginRight: 'auto',
          }
    },
    periodFrom:{
        border: "1px solid red",
        // width: '8%',
    },
    periodEnd:{
        border: "1px solid red",
        // width: '8%',
    },
    profileContainer:{
        border: "1px solid orange",
        width:'100%',
        // marginTop: '5px',
        // overflow: 'hidden'
        borderBottom: '1px solid #5ACBCC'
        // "&:hover": {
        //     backgroundColor: '#5ACBCC'
        //   }
    }
  }),
);

const TimeslotsData: React.FC<{timeslots:any, setWeekdayScheduleToEdit:any}> = ({timeslots, setWeekdayScheduleToEdit}) => {
    // const [weekdayScheduleToEdit, setWeekdayScheduleToEdit] = useState<any>(null); //define type

    const classes = useStyles();
    const dispatch = useDispatch()
    const {weekday} = useParams();
    const navigate = useNavigate();
    const emptyTimeslot = {profileName: null, profileStart: '00:00', profileEnd: '24:00' }

    const deleteTimeslot = (id:number) => {
        if(timeslots.length > 1){
            const newTimeslots = timeslots.filter((timeslot:any)=>{return(timeslot.id !== id)})
            sortTimeslots(newTimeslots)
        };
    };

    const sortTimeslots = (newTimeslots:any) => { //define types later
        let noDuplicates: any[] = []
        for(let i =0; i<newTimeslots.length; i++){
            if(i===0){
                if(i === newTimeslots.length -1 && (timeslots[i].profileEnd !== "24:00" || timeslots[i].profileStart !== "00:00" )){
                    noDuplicates.push({...newTimeslots[i],profileStart: "00:00" ,profileEnd:'24:00'})
                }else{
                    if(newTimeslots[i].profileStart === newTimeslots[i].profileEnd){
                        noDuplicates.push({...newTimeslots[i], profileStart:'00:00',profileEnd: "00:15"})
                    }else{
                        noDuplicates.push({...newTimeslots[i], profileStart:'00:00'})
                    }
                }
            }else{
                if(noDuplicates[noDuplicates.length-1].profileName === newTimeslots[i].profileName){
                    noDuplicates[noDuplicates.length-1].profileEnd = newTimeslots[i].profileEnd
                }else if(newTimeslots[i].profileStart === newTimeslots[i].profileEnd){
                    newTimeslots.splice(i,1)
                }else{
                    if(i === newTimeslots.length -1){
                        noDuplicates.push({...newTimeslots[i], profileEnd:'24:00'})
                    }else{
                        if(newTimeslots[i].profileEnd < newTimeslots[i].profileStart){
                            const timeFrame = parseInt(newTimeslots[i].profileStart.split(":")[1])
                            noDuplicates.push({...newTimeslots[i], profileEnd: newTimeslots[i].profileStart.split(":")[0] + `:${timeFrame === 0 ? 15 : timeFrame === 15 ? 30 : timeFrame === 30 ? 45 : '00'}`})
                        }else{
                            noDuplicates.push(newTimeslots[i])
                        }
                    }
                }
            }
        };
        noDuplicates.forEach((timeslot:any, index:number, arr:any)=>{
            if(index !== 0){
                timeslot.profileStart = arr[index-1].profileEnd
            }
        })

        for(let i = 0; i < noDuplicates.length; i++){
            const profile = noDuplicates[i]
            const deleteOne = (found:any) => {
                if(found){
                    const indexOfEarlier = noDuplicates.indexOf(found);
                    noDuplicates.splice(indexOfEarlier,1)
                    noDuplicates[indexOfEarlier-1].profileEnd = profile.profileStart
                    const anotherCheck = noDuplicates.find((timeslot:any, indexOfATimeslot:number)=>{
                        return profile.profileStart < timeslot.profileStart && i > indexOfATimeslot
                    });
                    deleteOne(anotherCheck)
                }
            }
            const checkEarlier = noDuplicates.find((timeslot:any, indexOfATimeslot:number)=>{
                return profile.profileStart <= timeslot.profileStart && i > indexOfATimeslot
            });
            deleteOne(checkEarlier)
        }
        setWeekdayScheduleToEdit(noDuplicates);
    };

  return (
    <Grid className={classes.main} container direction="column" alignItems="center" justifyContent="flex-start" > 
        <Grid item className={classes.labels} >
            <Labels first={'Profile'} second={'Period'}/>
        </Grid>
        <Grid item className={classes.timeslots} container direction="row" alignItems="center" justifyContent="center">
            {timeslots?.map((timeslot:any)=>{
                // console.log(timeslot)
                return (
                    <Box className={classes.timeslot} bgcolor="background.default">
                        <Grid item container direction="row" alignItems="center" justifyContent="center">
                            <Grid item className={classes.profile}>
                                <ProfilePicker timeslots={timeslots} asignedTimeslot={timeslot} setWeekdayScheduleToEdit={setWeekdayScheduleToEdit} sortTimeslots={sortTimeslots}/> 
                            </Grid>
                            {/* <Grid item className={classes.setpoint}>
                                <Setpoint timeslots={timeslots} asignedTimeslot={timeslot}/>
                            </Grid> */}
                            <Grid item className={classes.period}>
                                <TimeslotPeriodFromTo fromTo={[timeslot.profileStart, timeslot.profileEnd]} timeslots={timeslots} asignedTimeslot={timeslot} sortTimeslots={sortTimeslots}/>
                            </Grid>
                            <Grid item className={classes.deleteButton} >
                                <IconButton size='small' edge='end' color='primary' disabled={timeslots.length <= 1 ? true : false} onClick={()=>{deleteTimeslot(timeslot.id)}}>
                                    <DeleteForeverIcon/>
                                </IconButton>
                            </Grid>
                            <Grid item xs={0.1}></Grid>
                        </Grid>
                    </Box>
                )
            })}
        </Grid>
        <Grid item className={classes.labels} >
            <Labels first={'Assign new profile'} second={''}/>
        </Grid>
        <Grid item className={classes.addNew} >
            <Box className={classes.timeslot} bgcolor="primary.secondary">
                <Grid item container direction="row" alignItems="center" justifyContent="center">
                    <Grid item className={classes.profile}>
                        <ProfilePicker timeslots={timeslots} asignedTimeslot={''} setWeekdayScheduleToEdit={setWeekdayScheduleToEdit} sortTimeslots={sortTimeslots}/> 
                    </Grid>
                    <Grid item className={classes.period}>
                                <TimeslotPeriodFromTo fromTo={['00:00', '00:00']} timeslots={timeslots} asignedTimeslot={emptyTimeslot} sortTimeslots={sortTimeslots}/>
                    </Grid>
                    <Grid className={classes.deleteButton}>
                        <IconButton size='small' edge='start' color='primary'>
                            <AddIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    </Grid> 
  );
};

export default TimeslotsData;
