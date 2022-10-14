import React, {useState} from 'react';

import { useParams, useNavigate } from 'react-router-dom';


//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid, IconButton, TextField, Box } from '@mui/material/';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
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
import { profile } from 'console';
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
        height: '15%',
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

    // console.log(timeslots,'timeslots')
    const deleteTimeslot = (id:number) => {
        if(timeslots.length > 1){
            const newTimeslots = timeslots.filter((timeslot:any)=>{return(timeslot.id !== id)})
            sortTimeslots(newTimeslots)
        }
        // error
        // const newTimeslots = timeslots.filter((timeslot:any)=>{return(timeslot.id !== id)})
        // sortTimeslots(newTimeslots)
        // console.log(newTimeslots,'zeuru')
        // setWeekdayScheduleToEdit(newTimeslots)
    };

    const sortTimeslots = (newTimeslots:any) => { //define types later
        let noDuplicates: any[] = []
        for(let i =0; i<newTimeslots.length; i++){
            if(i===0){
                if(i === newTimeslots.length -1 && (timeslots[i].profileEnd !== "24:00" || timeslots[i].profileStart !== "00:00" )){
                    noDuplicates.push({...newTimeslots[i],profileStart: "00:00" ,profileEnd:'24:00'})
                }else{
                    noDuplicates.push({...newTimeslots[i], profileStart:'00:00'})
                }
            }else{
                if(noDuplicates[noDuplicates.length-1].profileName === newTimeslots[i].profileName){
                    noDuplicates[noDuplicates.length-1].profileEnd = newTimeslots[i].profileEnd
                }else{
                    if(i === newTimeslots.length -1){
                        noDuplicates.push({...newTimeslots[i], profileEnd:'24:00'})
                    }else{
                        noDuplicates.push(newTimeslots[i])
                    }
                }
            }
        };
        // console.log(newTimeslots,'newTimeslots');
        // console.log(noDuplicates,'noduplicates');
        setWeekdayScheduleToEdit(noDuplicates);
    };

  return (
    <Grid className={classes.main} container direction="column" alignItems="center" justifyContent="flex-start" > 
        <Grid item className={classes.labels} >
            <Labels/>
        </Grid>
        <Grid item className={classes.timeslots} container direction="row" alignItems="center" justifyContent="center">
            {timeslots?.map((timeslot:any)=>{
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
                            {/* <Grid item className={classes.estimatedCosts}>
                                <Grid item container  direction="row" alignItems="center" justifyContent="center" >
                                    <Grid item>10.23 £</Grid>
                                    <Grid item xs={2}></Grid>
                                    <Grid item className={classes.deleteButton} >
                                        <IconButton size='small' edge='start' color='primary' disabled={timeslots.length <= 1 ? true : false} onClick={()=>{deleteTimeslot(timeslot.id)}}>
                                            <DeleteForeverIcon/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid> */}
                            <Grid item className={classes.deleteButton} >
                                <IconButton size='small' edge='start' color='primary' disabled={timeslots.length <= 1 ? true : false} onClick={()=>{deleteTimeslot(timeslot.id)}}>
                                    <DeleteForeverIcon/>
                                </IconButton>
                            </Grid>
                            <Grid item xs={0.1}></Grid>
                        </Grid>
                    </Box>
                )
            })}
        </Grid>
        <Grid item className={classes.addNew} >addnew</Grid>
    </Grid> 
  );
};

export default TimeslotsData;


// else if(timeslots[0].profileStart === newTimeslots[i].profileStart){ //cia kad overwrite index 0
//     noDuplicates.splice(0,1);
//     noDuplicates.push({...newTimeslots[i]})
// }else if(newTimeslots[i-1].profileStart === newTimeslots[i].profileStart){
//     noDuplicates.splice(noDuplicates.indexOf(newTimeslots[i-1]),1);
//     noDuplicates.push({...newTimeslots[i]})
// }else if(timeslots[0].profileEnd === newTimeslots[newTimeslots.length - 1].profileEnd){
//     console.log('seni!!!')
// }