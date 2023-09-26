import React, {useState} from 'react';
import dayjs from 'dayjs'


//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Box } from '@mui/material/';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';

//components
import TimeslotPeriodFromTo from './TimeslotPeriodFromTo';
import ProfilePicker from './ProfilePicker';
import Labels from './Labels';
// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main:{
      height: '100%',
      width: '100%',
    },
    timeslots:{
        maxHeight: '65%',
        overflow: 'auto'
    },
    labels:{
        height: '7%',
        width: '100%',
    },
    addNew:{
        height: '15%',
        width: '100%',
    },
    timeslot:{
        width: '100%',
        marginTop: '5px',
        borderBottom: '1px solid #5ACBCC',
        borderTop: '1px solid #5ACBCC',
    },
    profile:{
        fontSize: '15px',
        width: '14%',
        [theme.breakpoints.down('md')]: {
            width: '15%',
            fontSize: '14px',
        },
        [theme.breakpoints.down('sm')]: {
            width: '35%',
            fontSize: '14px',
        }
    },
    period:{
        width: '36%',
        fontSize: '15px',
        [theme.breakpoints.down('md')]: {
            width: '35%',
            fontSize: '14px',
        },
        [theme.breakpoints.down('sm')]: {
            width: '40%',
            fontSize: '14px',
        }
    },
    deleteButton:{

        [theme.breakpoints.down('md')]: {

          }
    },
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
  }),
);

const TimeslotsData: React.FC<{timeslots:any, setWeekdayScheduleToEdit:any}> = ({timeslots, setWeekdayScheduleToEdit}) => {

    const classes = useStyles();
    const emptyTimeslot = {profileName: null, profileStart: "00:00", profileEnd: '24:00', profileID:null }
    const [timeslotToAdd, setTimeslotToAdd] = useState<any>(emptyTimeslot)

    const deleteTimeslot = (id:number) => {
        if(timeslots.length > 1){
            const newTimeslots = timeslots.filter((timeslot:any)=>{return(timeslot.id !== id)})
            sortTimeslots(newTimeslots)
        };
    };
//  1 check if the last one 2 >check if less 3 check if difference 4 assisgn
    const addNewTimeslot = () => {
        let newTimeslots:any[] = []
        for(let i = 0; i<timeslots.length;i++){ 
            const alreadyInArray = newTimeslots.indexOf(timeslotToAdd)
            const startTimeForATimeslot = newTimeslots.length !== 0 ? dayjs().set('hour', newTimeslots[newTimeslots.length -1].profileEnd.split(":")[0]).set('minute', newTimeslots[newTimeslots.length -1].profileEnd.split(":")[1]).set('second', 0) : dayjs().set('hour', timeslots[i].profileStart.split(":")[0]).set('minute', timeslots[i].profileStart.split(":")[1]).set('second', 0)
            const hoursFrom:string = startTimeForATimeslot.hour() < 10 ? `0${startTimeForATimeslot.hour()}` : `${startTimeForATimeslot.hour()}`
            const minutesFrom:string = startTimeForATimeslot.minute() < 10 ? `0${startTimeForATimeslot.minute()}` : `${startTimeForATimeslot.minute()}` 
 
            if(timeslotToAdd.profileStart <= timeslots[i].profileStart && alreadyInArray < 0){
                if(timeslotToAdd.profileEnd >= timeslots[i].profileEnd){
                    if(timeslotToAdd.profileEnd === "24:00"){
                        newTimeslots.push(timeslotToAdd)
                    }else if(i === 0){
                        newTimeslots.push(timeslotToAdd)
                    }else{
                        newTimeslots[newTimeslots.length -1].profileEnd = timeslotToAdd.profileStart
                        newTimeslots.push(timeslotToAdd)
                    }
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
                        newTimeslots.push({...timeslots[i], profileStart: `${hoursFrom}:${minutesFrom}` })
                    }
                }
            }
            
        }
        sortTimeslots(newTimeslots)
        setTimeslotToAdd(emptyTimeslot)
    };

    const sortTimeslots = (newTimeslots:any) => {
        let noDuplicates: any[] = []
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
    <Grid className={classes.main} container direction="column" alignItems="center" justifyContent="flex-start" > 
        <Grid xs={1} item className={classes.labels} >
            <Labels first={'Profile'} second={'Period'} third={'Delete'}/>
        </Grid>
        <Grid className={classes.timeslots} item container direction="row" alignItems="flex-start" justifyContent="flex-start">
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
                            </Grid>
                        </Box>
                    )
            })}
        </Grid>
        <Grid  xs={2} item className={classes.addNew}>
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


