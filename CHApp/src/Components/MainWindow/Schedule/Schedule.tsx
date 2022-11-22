import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { createBrowserHistory } from 'history';


//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid , Box} from '@mui/material/';



// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';
import {setNewHeatingSchedule} from '../../../Redux-reducers/heatingScheduleReducer'
import { setActiveProfile } from '../../../Redux-reducers/heatingComponentReducer';


//types
import timeslot from '../../../Types/types';

//components
import Weekday from './Weekday';
import WeekdayPaste from './WeekdayPaste';
import ProgressCircular from '../../ProgressBar/ProgressCircular';
import TimeslotMoreInfoOverlay from './Edit/SelectedTimeslot/TimeslotMoreInfoOverlay';
// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      //  boxSizing: 'border-box',
       position: 'relative', //sitas!!!
       width: '100%',
       height: '100%',
    //    border: "10px solid pink",
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
        height: '13%', // buvo 12
        width: '100%',
        // marginTop: '10%',

    },
    saveAndCancelButons:{
        // border: "1px solid lime",
        // position:'absolute', //buvo absolute 
        height: '7%', 
        width:'100%',
    },
  }),
);

const Schedule: React.FC<{weekSchedule:any, heatingProfiles:any}> = ({weekSchedule, heatingProfiles}) => {
    //copy schedule
    const [copyWeekdaySchedule, setCopyWeekdaySchedule] = useState<string | null>(null);
    const [scheduleToCopy, setScheduleToCopy] = useState<any>(null); // define type was timeslot[]|null
    const [weekdaysToPasteSchedule, setWeekdaysToPasteSchedule] = useState<String[]>([]);

    const url = createBrowserHistory()
    const parameters = new URLSearchParams(url.location.search);
    const homeLabel =  parameters.get('home')

    // useEffect(()=>{
    //   // console.log(weekSchedule[0], 'zeuri temele')
    //   const activeProfile =  weekSchedule[0].schedule.find((profile:any)=>{//define type later
    //     const timeNow = new Date().toString().split(" ")[4].split(":").splice(0,2);
    //     if(timeNow[0] >= profile.profileStart.split(":")[0] && timeNow[0] <= profile.profileEnd.split(":")[0]){
    //       if(timeNow[0] ===  profile.profileEnd.split(":")[0]){
    //         return timeNow[1] <=  profile.profileEnd.split(":")[1] ? profile : null
    //       } else if (timeNow[1] === profile.profileStart.split(":")[0]){
    //         return timeNow[1] >= profile.profileStart.split(":")[1] ? profile : null
    //       } else {
    //         return profile
    //       }
    //     }
    //   });
    //   dispatch(setActiveProfile(activeProfile))

    //   // const activeProfile = useSelector( (state:any)=>{ //define type later 
    //   //   if(state.heatingSchedule){
    //       // const activeProfile =  state.heatingSchedule[0]?.schedule.find((profile:any)=>{//define type later
    //       //   const timeNow = new Date().toString().split(" ")[4].split(":").splice(0,2);
    //       //   if(timeNow[0] >= profile.profileStart.split(":")[0] && timeNow[0] <= profile.profileEnd.split(":")[0]){
    //       //     if(timeNow[0] ===  profile.profileEnd.split(":")[0]){
    //       //       return timeNow[1] <=  profile.profileEnd.split(":")[1] ? profile : null
    //       //     } else if (timeNow[1] === profile.profileStart.split(":")[0]){
    //       //       return timeNow[1] >= profile.profileStart.split(":")[1] ? profile : null
    //       //     } else {
    //       //       return profile
    //       //     }
    //       //   }
    //       // });
    //       // dispatch(setActiveProfile(activeProfile))
    //   //   };
    //   // });
    // },[])

    
    

    const classes = useStyles();
    const dispatch = useDispatch()

    //save&cancel buttons
    const saveNewWeekSchedule = () => {
      //define here new schedule/ send to reeducer and assign over there
      // console.log('saving new week schedule')
      // let newWeekSchedule:any = weekSchedule;
      // weekdaysToPasteSchedule.forEach((weekday)=>{
      //   newWeekSchedule.map((weekdaySchedule:any)=>{
      //     return weekdaySchedule.weekday === weekday ? weekdaySchedule.schedule = scheduleToCopy.schedule : weekdaySchedule
      //   })
      //   // console.log(weekdaysToPasteSchedule,'conkretu')
      //   //send to the server if 200, update redux
      //   dispatch(setNewHeatingSchedule(weekdaysToPasteSchedule, scheduleToCopy.schedule ));
      //   setWeekdaysToPasteSchedule([]);
      //   setCopyWeekdaySchedule(null);
      // });
      dispatch(setNewHeatingSchedule(homeLabel, weekdaysToPasteSchedule, scheduleToCopy.schedule ));
      setWeekdaysToPasteSchedule([]);
      setCopyWeekdaySchedule(null);
    };
    const cancelWeekScheduleChanges = () => {
      setWeekdaysToPasteSchedule([]);
      setCopyWeekdaySchedule(null)
      
    };


    // const activeProfile = ()=>{ //define type later 
    //   if(weekSchedule){
    //     const activeProfile =  weekSchedule[0]?.schedule.find((profile:any)=>{//define type later
    //       const timeNow = new Date().toString().split(" ")[4].split(":").splice(0,2);
    //       if(timeNow[0] >= profile.profileStart.split(":")[0] && timeNow[0] <= profile.profileEnd.split(":")[0]){
    //         if(timeNow[0] ===  profile.profileEnd.split(":")[0]){
    //           return timeNow[1] <=  profile.profileEnd.split(":")[1] ? profile : null
    //         } else if (timeNow[1] === profile.profileStart.split(":")[0]){
    //           return timeNow[1] >= profile.profileStart.split(":")[1] ? profile : null
    //         } else {
    //           return profile
    //         }
    //       }
    //     });
    //     dispatch(setActiveProfile(activeProfile))
    //     return activeProfile
    //   };
    // };
    // activeProfile()

    //prsto reikalai seni :D

  return (
    //atkreipk demesi i spacing ant container class
    <div className={classes.main}>
        {heatingProfiles.selectedProfile ? <TimeslotMoreInfoOverlay heatingProfiles={heatingProfiles}/> : null}
        <Grid container className={classes.container} direction="column" justifyContent={weekSchedule ? "center" : "center"} alignItems="center" spacing={0.5} > {/* buvo justify content center*/}
        <Grid item xs={0.2}></Grid> 
          {weekSchedule ? null :           
                                <Grid item>
                                  <ProgressCircular size={40}/>
                                </Grid>
          }
            {weekSchedule?.map((weekday:any, index:number)=>{
              if(copyWeekdaySchedule){
                if(copyWeekdaySchedule === weekday.weekday){
                  return (
                    <Grid item className={classes.weekday}>
                        <Weekday weekday={weekday.weekday} scheduleForAWeekday={weekday} copyWeekdaySchedule={copyWeekdaySchedule} setCopyWeekdaySchedule={setCopyWeekdaySchedule} setScheduleToCopy={setScheduleToCopy} indexOfASchedeule={index}/>
                    </Grid>
                  ) 
                }else{
                  return (
                    <Grid item className={classes.weekday}>
                        <WeekdayPaste weekday={weekday.weekday} scheduleForAWeekday={weekday} setCopyWeekdaySchedule={setCopyWeekdaySchedule} scheduleToCopy={scheduleToCopy} setWeekdaysToPasteSchedule={setWeekdaysToPasteSchedule} weekdaysToPasteSchedule={weekdaysToPasteSchedule}  indexOfASchedeule={index}/>
                    </Grid>
                  )
                }
              }else{
                return (
                  <Grid item className={classes.weekday}>
                      <Weekday weekday={weekday.weekday} scheduleForAWeekday={weekday} copyWeekdaySchedule={copyWeekdaySchedule} setCopyWeekdaySchedule={setCopyWeekdaySchedule} setScheduleToCopy={setScheduleToCopy} indexOfASchedeule={index}/>
                  </Grid>
                )
              }
            })}
            <Grid item container className={classes.saveAndCancelButons} direction="row" justifyContent="flex-end" alignItems="center">
            {copyWeekdaySchedule? 
                        <Grid item container direction="row" justifyContent="flex-end" alignItems="center" >
                          <Grid item>
                            <Button variant="contained" size="small" color="primary" onClick={saveNewWeekSchedule}>Save</Button>
                          </Grid>
                          <Grid item xs={0.2}></Grid>
                          <Grid item>
                            <Button variant="contained" size="small" color="secondary" onClick={cancelWeekScheduleChanges}>Cancel</Button>
                          </Grid>
                          <Grid item xs={0.4}></Grid>
                        </Grid>
                        :null
            }
            </Grid>
        </Grid>
    </div>
  );
};

export default Schedule;
