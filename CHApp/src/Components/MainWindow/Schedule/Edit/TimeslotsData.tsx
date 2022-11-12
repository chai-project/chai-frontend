import React, {useState} from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs'


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
    //   border: "5px solid pink",
      height: '100%',
      width: '100%',
    },
    timeslots:{
        // height: '55%',
        maxHeight: '60%',
        // width: '100%',
        // border: "3px solid red",
        overflow: 'scroll'
    },
    labels:{
        height: '7%',
        width: '100%',
        // border: "1px dashed white",
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
        // border: "3px solid lime",
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
    period:{
        // border: "1px solid red",
        width: '36%',
        fontSize: '15px',
        [theme.breakpoints.down('md')]: {
            width: '50%',
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
    // '@global': {
    //     '*::-webkit-scrollbar': {
    //       width: '0.4em'
    //     },
    //     '*::-webkit-scrollbar-track': {
    //       '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    //     },
    //     '*::-webkit-scrollbar-thumb': {
    //       backgroundColor: '#5ACBCC',
    //       outline: '1px solid slategrey'
    //     }
    //   },
  }),
);

const TimeslotsData: React.FC<{timeslots:any, setWeekdayScheduleToEdit:any}> = ({timeslots, setWeekdayScheduleToEdit}) => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const {weekday} = useParams();
    const navigate = useNavigate();
    const emptyTimeslot = {profileName: null, profileStart: "00:00", profileEnd: '24:00', profileID:null }
    const [timeslotToAdd, setTimeslotToAdd] = useState<any>(emptyTimeslot)

    const deleteTimeslot = (id:number) => {
        // console.log(id)
        if(timeslots.length > 1){
            const newTimeslots = timeslots.filter((timeslot:any)=>{return(timeslot.id !== id)})
            sortTimeslots(newTimeslots)
        };
    };
//  1 check if the last one 2 >check if less 3 check if difference 4 assisgn // pervadinti constus laiko !! 
    const addNewTimeslot = () => {
        let newTimeslots:any[] = []
        let biggerTimeslotSpaceIsAlreadyUsed = 0
        for(let i = 0; i<timeslots.length;i++){ 
            const alreadyInArray = newTimeslots.indexOf(timeslotToAdd)
            const startTimeForATimeslot = newTimeslots.length !== 0 ? dayjs().set('hour', newTimeslots[newTimeslots.length -1].profileEnd.split(":")[0]).set('minute', newTimeslots[newTimeslots.length -1].profileEnd.split(":")[1]).set('second', 0) : dayjs().set('hour', timeslots[i].profileStart.split(":")[0]).set('minute', timeslots[i].profileStart.split(":")[1]).set('second', 0)
            const hoursFrom:string = startTimeForATimeslot.hour() < 10 ? `0${startTimeForATimeslot.hour()}` : `${startTimeForATimeslot.hour()}`
            const minutesFrom:string = startTimeForATimeslot.minute() < 10 ? `0${startTimeForATimeslot.minute()}` : `${startTimeForATimeslot.minute()}` 
            const endTimeForATimeslot = dayjs().set('hour', timeslots[i].profileEnd.split(":")[0]).set('minute', timeslots[i].profileEnd.split(":")[1]).set('second', 0)
            const hoursTo:string = endTimeForATimeslot.hour() < 10 ? `0${endTimeForATimeslot.hour()}` : `${endTimeForATimeslot.hour()}`
            const minutesTo:string = endTimeForATimeslot.minute() < 10 ? `0${endTimeForATimeslot.minute()}` : `${endTimeForATimeslot.minute()}` 
            // console.log(`${hoursFrom}:${minutesFrom} to ${hoursTo}:${minutesTo}`)
            // newTimeslots.push({...timeslots[i]})
            // console.log(newTimeslots.length !== 0  ?  timeslots[i].start : timeslots[i-1].profileEnd )
            if(timeslotToAdd.profileStart <= timeslots[i].profileStart && alreadyInArray < 0){
                if(timeslotToAdd.profileEnd >= timeslots[i].profileEnd){
                    if(timeslotToAdd.profileEnd === "24:00"){
                        newTimeslots.push(timeslotToAdd)
                    }else if(i === 0){
                        newTimeslots.push(timeslotToAdd)
                        // newTimeslots.push({...timeslots[i], profileStart: timeslotToAdd.profileEnd ,profileEnd: timeslots[i+1].profileStart  })
                    }else{
                        newTimeslots[newTimeslots.length -1].profileEnd = timeslotToAdd.profileStart
                        newTimeslots.push(timeslotToAdd)
                    }
                    // newTimeslots[newTimeslots.length -1].profileEnd = timeslotToAdd.profileStart
                    // newTimeslots.push(timeslotToAdd)
                    
                }else if(newTimeslots[i-1]){
                    newTimeslots[i-1].profileEnd = timeslotToAdd.profileStart
                    newTimeslots.push(timeslotToAdd)
                    newTimeslots.push({...timeslots[i], profileStart: timeslotToAdd.profileEnd })
                }else{
                    newTimeslots.push(timeslotToAdd)
                    newTimeslots.push({...timeslots[i], profileStart: timeslotToAdd.profileEnd })
                }
            }else{
                if(timeslotToAdd.profileStart >= timeslots[i].profileStart && timeslotToAdd.profileEnd <= timeslots[i].profileEnd && alreadyInArray < 0){
                    if(timeslotToAdd.profileEnd < timeslots[i].profileEnd){
                        newTimeslots.push({...timeslots[i], profileEnd: timeslotToAdd.profileStart })
                        newTimeslots.push(timeslotToAdd)
                        newTimeslots.push({...timeslots[i], profileStart: timeslotToAdd.profileEnd })

                    }else{
                        newTimeslots.push({...timeslots[i], profileEnd: timeslotToAdd.profileStart })
                        newTimeslots.push(timeslotToAdd)
                    }
                }else{
                    if(timeslots[i].profileEnd <= newTimeslots[newTimeslots.length -1]?.profileEnd){
                        //do nothing
                    }else{
                        // console.log('wyf???',i, timeslots[i])
                        // newTimeslots[newTimeslots.length -1].profileEnd = timeslotToAdd.profileStart
                        // if(newTimeslots[newTimeslots.length - 1]){
                        //     newTimeslots[newTimeslots.length -1].profileEnd = timeslotToAdd.profileStart
                        //     newTimeslots.push(timeslots[i])
                        // }else{
                        //     newTimeslots[newTimeslots.length -1].profileEnd = timeslotToAdd.profileStart
                        //     newTimeslots.push({...timeslots[i], profileStart: `${hoursFrom}:${minutesFrom}` })

                        // }
                        newTimeslots.push({...timeslots[i], profileStart: `${hoursFrom}:${minutesFrom}` })
                    }
                }
            }
            
        }
        sortTimeslots(newTimeslots)
        setTimeslotToAdd(emptyTimeslot)
        // console.log(emptyTimeslot)
        // setWeekdayScheduleToEdit(newTimeslots)
    };

    // const addNewTimeslot = () => {
    //     let newTimeslots:any[] = []
    //     let biggerTimeslotSpaceIsAlreadyUsed = 0
    //     for(let i = 0; i<timeslots.length;i++){ 
    //         const alreadyInArray = newTimeslots.indexOf(timeslotToAdd)
    //         const fromPlus15Min = timeslots[i-1] ? dayjs().set('hour', newTimeslots[i].profileEnd.split(":")[0]).set('minute', newTimeslots[i].profileEnd.split(":")[1]).set('second', 0) : dayjs().set('hour', timeslots[i].profileStart.split(":")[0]).set('minute', timeslots[i].profileStart.split(":")[1]).set('second', 0) // cia laikai kazkas pisasi ???
    //         const hoursFrom:string = fromPlus15Min.hour() < 10 ? `0${fromPlus15Min.hour()}` : `${fromPlus15Min.hour()}`
    //         const minutesFrom:string = fromPlus15Min.minute() < 10 ? `0${fromPlus15Min.minute()}` : `${fromPlus15Min.minute()}` 
    //         const toPlus15Min = dayjs().set('hour', timeslots[i].profileEnd.split(":")[0]).set('minute', timeslots[i].profileEnd.split(":")[1]).set('second', 0).add(15,'minutes')
    //         const hoursTo:string = toPlus15Min.hour() < 10 ? `0${toPlus15Min.hour()}` : `${toPlus15Min.hour()}`
    //         const minutesTo:string = toPlus15Min.minute() < 10 ? `0${toPlus15Min.minute()}` : `${toPlus15Min.minute()}` 
    //         // console.log(timeslots[i].profileName, timeslots[i].profileStart, "previous", hoursFrom, minutesFrom)
    //         console.log(timeslots[i].profileName, ": ", newTimeslots[i]?.profileName , newTimeslots[i]?.profileEnd)
    //         // console.log(i, timeslots.length -1 )

    //         //check if timeslot has 15min space
    //         const from = dayjs().set('hour', timeslots[i].profileStart.split(":")[0]).set('minute', timeslots[i].profileStart.split(":")[1]).set('second', 0);
    //         const to = dayjs().set('hour', timeslots[i].profileEnd.split(":")[0]).set('minute', timeslots[i].profileEnd.split(":")[1]).set('second', 0);
    //         if(i == timeslots.length - 1 ){
    //             // console.log(timeslots[i].profileName, ": ", newTimeslots[i].profileEnd)
    //             console.log('zeuru')
    //             // const addAnother15MinFrom = fromPlus15Min.add(15,'minutes');
    //             newTimeslots.push({...timeslots[i], profileStart: `${hoursFrom}:${minutesFrom}`, profileEnd: `24:00`})
    //         }else 
    //         if(timeslotToAdd.profileStart <= timeslots[i].profileStart && alreadyInArray < 0){
    //             newTimeslots.push(timeslotToAdd)
    //             const extra15MinAdd = fromPlus15Min.add(15,'minutes')
    //             const hoursFromExtra15Add:string = extra15MinAdd.hour() < 10 ? `0${extra15MinAdd.hour()}` : `${extra15MinAdd.hour()}`
    //             const minutesFromExtra15Add:string = extra15MinAdd.minute() < 10 ? `0${extra15MinAdd.minute()}` : `${extra15MinAdd.minute()}` 
    //             newTimeslots.push({...timeslots[i], profileStart: `${hoursFromExtra15Add}:${minutesFromExtra15Add}`, profileEnd: `${hoursTo}:${minutesTo}`})
    //         }else{
    //             if(to.diff(from,'minutes') > 15 && biggerTimeslotSpaceIsAlreadyUsed < 1){
    //                 biggerTimeslotSpaceIsAlreadyUsed++
    //                 const addAnother15MinFrom = toPlus15Min.subtract(15,'minutes');
    //                 const hoursFromExtraAnother15min:string = addAnother15MinFrom.hour() < 10 ? `0${addAnother15MinFrom.hour()}` : `${addAnother15MinFrom.hour()}`
    //                 const minutesFromExtraAnother15min:string = addAnother15MinFrom.minute() < 10 ? `0${addAnother15MinFrom.minute()}` : `${addAnother15MinFrom.minute()}` 
    //                 newTimeslots.push({...timeslots[i],profileStart: `${hoursFrom}:${minutesFrom}`, profileEnd: `${hoursFromExtraAnother15min}:${minutesFromExtraAnother15min}`})
    //             }else{
    //                 // console.log(i, timeslots.length -1 )
    //                 // if(i == timeslots.length - 1 ){
    //                 //     // console.log(timeslots[i].profileName, ": ", newTimeslots[i].profileEnd)
    //                 //     console.log('zeuru')
    //                 //     // const addAnother15MinFrom = fromPlus15Min.add(15,'minutes');
    //                 //     newTimeslots.push({...timeslots[i], profileStart: `${hoursFrom}:${minutesFrom}`, profileEnd: `24:00`})
    //                 // }else{
    //                 //     // console.log(timeslots[i].profileName)

    //                 //     newTimeslots.push({...timeslots[i], profileStart: `${hoursFrom}:${minutesFrom}`, profileEnd: `${hoursTo}:${minutesTo}`})
    //                 // }
    //                 newTimeslots.push({...timeslots[i], profileStart: `${hoursFrom}:${minutesFrom}`, profileEnd: `${hoursTo}:${minutesTo}`})

    //             }
    //         }
    //     }
    //     console.log(newTimeslots,'zeuru')
    //     setWeekdayScheduleToEdit(newTimeslots)
    // };

    const sortTimeslots = (newTimeslots:any) => { //define types later
        let noDuplicates: any[] = []
        // console.log(newTimeslots,'newtimeslots!!')
        for(let i =0; i<newTimeslots.length; i++){
            if(i===0){
                if(i === newTimeslots.length -1 && (timeslots[i].profileEnd !== "24:00" || timeslots[i].profileStart !== "00:00" )){
                    noDuplicates.push({...newTimeslots[i],profileStart: "00:00" ,profileEnd:'24:00', id:i})
                }else{
                    if(newTimeslots[i].profileStart === newTimeslots[i].profileEnd){
                        noDuplicates.push({...newTimeslots[i], profileStart:'00:00',profileEnd: "00:15", id:i})
                    }else{
                        noDuplicates.push({...newTimeslots[i], profileStart:'00:00', id:i})
                    }
                }
            }else{
                if(noDuplicates[noDuplicates.length-1].profileName === newTimeslots[i].profileName){
                    noDuplicates[noDuplicates.length-1].profileEnd = newTimeslots[i].profileEnd
                }else if(i === newTimeslots.length-1){
                    noDuplicates.push({...newTimeslots[i], profileStart: newTimeslots[i-1].profileEnd, profileEnd: "24:00", id:i})
                }else{
                    noDuplicates.push({...newTimeslots[i], profileStart: newTimeslots[i-1].profileEnd,id:i})
                }
            }
        };
        setWeekdayScheduleToEdit(noDuplicates);
    };

  return (
    <Grid className={classes.main} item container direction="column" alignItems="center" justifyContent="flex-start" > 
        <Grid xs={1} item className={classes.labels} >
            <Labels first={'Profile'} second={'Period'}/>
        </Grid>
        <Grid  className={classes.timeslots} container direction="row" alignItems="flex-start" justifyContent="flex-start">
            {timeslots?.map((timeslot:any)=>{
                return (
                    <Box className={classes.timeslot} bgcolor="background.default">
                        <Grid item container direction="row" alignItems="center" justifyContent="center">
                            <Grid item className={classes.profile}>
                                <ProfilePicker timeslots={timeslots} asignedTimeslot={timeslot} setWeekdayScheduleToEdit={setWeekdayScheduleToEdit} sortTimeslots={sortTimeslots} setTimeslotToAdd={setTimeslotToAdd} timeslotToAdd={timeslotToAdd} isForAddingATimeslot={false}/> 
                            </Grid>
                            <Grid item className={classes.period}>
                                <TimeslotPeriodFromTo timeslots={timeslots} asignedTimeslot={timeslot} sortTimeslots={sortTimeslots} setTimeslotToAdd={setTimeslotToAdd} timeslotToAdd={timeslotToAdd} isForAddingATimeslot={false}/>
                            </Grid>
                            <Grid item className={classes.deleteButton} >
                                <IconButton size='small' edge='end' color='primary' disabled={timeslots.length <= 1 ? true : false} onClick={()=>{deleteTimeslot(timeslot.id)}}>
                                    <DeleteForeverIcon/>
                                </IconButton>
                            </Grid>
                            {/* <Grid item xs={0.1}></Grid> */}
                        </Grid>
                    </Box>
                )
            })}
        </Grid>
        <Grid xs={1} item className={classes.labels} >
            <Labels first={'Assign new profile'} second={''}/>
        </Grid>
        <Grid xs={2} item className={classes.addNew} >
            <Box className={classes.timeslot} bgcolor="primary.secondary">
                <Grid item container direction="row" alignItems="center" justifyContent="center">
                    <Grid item className={classes.profile}>
                        <ProfilePicker timeslots={timeslots} asignedTimeslot={timeslotToAdd} setWeekdayScheduleToEdit={setWeekdayScheduleToEdit} sortTimeslots={sortTimeslots} setTimeslotToAdd={setTimeslotToAdd} timeslotToAdd={timeslotToAdd} isForAddingATimeslot={true}/> 
                    </Grid>
                    <Grid item className={classes.period}>
                                <TimeslotPeriodFromTo  timeslots={timeslots} asignedTimeslot={timeslotToAdd} sortTimeslots={sortTimeslots} setTimeslotToAdd={setTimeslotToAdd} timeslotToAdd={timeslotToAdd} isForAddingATimeslot={true}/>
                    </Grid>
                    <Grid className={classes.deleteButton}>
                        <IconButton size='small' edge='start' color='primary' disabled={!timeslotToAdd.profileName} onClick={addNewTimeslot}>
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


