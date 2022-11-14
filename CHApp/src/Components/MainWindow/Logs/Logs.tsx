import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import dayjs from 'dayjs'
import moment from 'moment';

//mui
import {makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, TextField, Grid } from '@mui/material/';



// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';


//types
import chartDataType from '../../../Types/types'

//components
import SwitchButton from '../../Buttons/SwitchButton';
import DatePickerComponent from './DatePickerComponent';
import LogTable from './LogTable';
import ProgressCircular from '../../ProgressBar/ProgressCircular';

import { profile } from 'console';

// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer:{
      // border: '3px dashed red',
      height: '100%',
      // overflow: 'hidden',
    },
    buttons:{
      // border: '3px dashed lime',
      width:'100%'
    },
    table:{
      // border: '3px dashed orange',
      width:'100%'
    },
    datepickerContainer:{
      height: '100%',
      // border: '3px dashed orange',
    },
    datepickerbuttons:{
      position: 'relative',
      left: '1%'
      // border: '3px dashed red',
    },
    main: {
      //  boxSizing: 'border-box',
       position: 'relative', //sitas!!!
       marginLeft: 'auto',
       marginRight: 'auto',
       top: '2%',
       width: '99%',
       height: '97%',
      //  border: '3px dashed #5ACBCC',
      //  background: '#CFD8DC',
      //  left: '4%',
      //  top: '10%',
    },
    datepicker:{
      position: 'absolute',
      height: '10%',
      left: '0.5%'
    },
    logs:{
      position: 'relative',
      marginLeft: 'auto',
      marginRight: 'auto',
      height: '90%',
      width: '99%',
      // top: '10%',
      // overflowY: 'scroll',
      // overflowX: 'hidden',
      // border: '3px dashed red',
      [theme.breakpoints.down('md')]: {
        height:'25px',
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
    description: {
      "&:hover": {
        backgroundColor: '#5ACBCC'
      }
    }
  }),
);

const Logs: React.FC<{currentState:any}> = ({currentState}) => {
  const [valueFrom, setValueFrom] = React.useState<String | null>(null);
  const [valueTo, setValueTo] = React.useState<String | null>(new Date().toISOString()); // is visu surasti seniause!
  const [logs, setLogs] = useState<any[]|null>(null)

    const logsai = [
      {
        dateAndTime: '2022-10-04T20:50:33.000Z',
        date: '4/10/2022',
        time: '14:22',
        category: 'User',
        description: 'You changed the target temperature to 21.5°C. The current price 12.4 p/kWh. The AI has been updated and now believes you are moderately sensitive to price and your preferred temperature (when energy is free) is 23.2°C.'
      },
      {
        dateAndTime: '2022-10-04T16:50:33.000Z',
        date: '4/10/2022',
        time: '17:22',
        category: 'Price',
        description: 'The current price is now 27.9 p/kWh. The system changed the target temperature to 20°C because the AI believes you are moderately sensitive to price and your preferred temperature (when energy is free) is 23.2°C.'
      },
      // {
      //   dateAndTime: '2022-9-23T20:50:33.000Z',
      //   date: '27/9/2022',
      //   time: '11:22',
      //   category: 'XAI',
      //   description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      // },
      // {
      //   date: '1/7/2002',
      //   time: '11:22',
      //   category: 'XAI',
      //   description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      // },
      // {
      //   date: '1/7/2002',
      //   time: '11:22',
      //   category: 'XAI',
      //   description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      // },
      // {
      //   date: '1/7/2002',
      //   time: '11:22',
      //   category: 'XAI',
      //   description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      // },
      // {
      //   date: '1/7/2002',
      //   time: '11:22',
      //   category: 'XAI',
      //   description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      // },
      // {
      //   date: '1/7/2002',
      //   time: '11:22',
      //   category: 'XAI',
      //   description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      // },
      // {
      //   date: '1/7/2002',
      //   time: '11:22',
      //   category: 'XAI',
      //   description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      // },
      // {
      //   date: '1/7/2002',
      //   time: '11:22',
      //   category: 'XAI',
      //   description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      // },
      // {
      //   date: '1/7/2002',
      //   time: '11:22',
      //   category: 'XAI',
      //   description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      // },
      // {
      //   date: '1/7/2002',
      //   time: '11:22',
      //   category: 'XAI',
      //   description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      // },
      // {
      //   date: '1/7/2002',
      //   time: '11:22',
      //   category: 'XAI',
      //   description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      // },
      // {
      //   date: '1/7/2002',
      //   time: '11:22',
      //   category: 'XAI',
      //   description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      // },
      // {
      //   date: '1/7/2002',
      //   time: '11:22',
      //   category: 'XAI',
      //   description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      // },
      // {
      //   date: '1/7/2002',
      //   time: '11:22',
      //   category: 'XAI',
      //   description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      // },
      // {
      //   date: '1/7/2002',
      //   time: '11:22',
      //   category: 'XAI',
      //   description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      // },
      // {
      //   date: '1/7/2002',
      //   time: '11:22',
      //   category: 'XAI',
      //   description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      // }
    ]

    useEffect(()=>{
      // const logs = currentState.logs?.map((rawLog:any, index:number, arr:any)=>{

      //   let priceSensitivity = null
      //   if(rawLog.parameters.length === 5 ){
      //     const priceSensivityBoundaries = (bias:any ) => {
      //       const finiteIntervals = 4;
      //       const minSetpoint = 7;
      //       const maxPrice = 35;
      //       const upperBound = (bias - minSetpoint) / maxPrice;
      //       const intervalWidth = upperBound / finiteIntervals;
      //       let boundaries:any[] = []
      
      //       for(let i:number = 0; i<finiteIntervals+1; i++  ){
      //         boundaries.push(intervalWidth*i)
      //       }
      //       return boundaries
      //     };
      //     let segment = 0
      //     const boundaries = priceSensivityBoundaries(rawLog.parameters[4]);
      //     for(let i:number = 0; i<boundaries.length; i++){
      //       if(-rawLog.parameters[3] >= boundaries[i]){
      //         segment = i+1
      //       }
      //     };
      //     priceSensitivity =  segment === 0 ? "Negative" : segment === 1 ? "Very low" : segment === 2 ? "Low" : segment === 3 ? "Moderate" : segment === 4 ? "High" :  "Very high" 
      //   }

      //   const profile = currentState.heatingProfiles.heatingProfiles.find((profile:any)=>{return profile.profile === rawLog.parameters[0]})
      //   switch(rawLog.category) {
      //     case "VALVE_SET":
      //       // console.log(rawLog.parameters)
      //       // const profileName = currentState.heatingProfiles.heatingProfiles.find((profile:any)=>{return profile.profile === rawLog.parameters[0]})
      //       return {dateAndTime: rawLog.timestamp ,date: dayjs(rawLog.timestamp).get('year') + "/" + dayjs(rawLog.timestamp).get('month') + "/" + dayjs(rawLog.timestamp).get('day')  ,time: dayjs(rawLog.timestamp).get('hour') +":"+ dayjs(rawLog.timestamp).get('minute')   , category: "System" , description: `The system set the target temperature to ${rawLog.parameters[2]}°C because the current price is ${rawLog.parameters[1]} p/kWh and the active profile is ${profile.profileName} where the AI believes your price sensitivity is ${priceSensitivity} and your preferred temperature (if energy were free) is ${rawLog.parameters[4]}°C.`}
      //       break;
      //     case "SETPOINT_MODE":
      //       if(rawLog.parameters[0] === 'override' && rawLog.parameters[1] !== null ){
      //         return  {dateAndTime: rawLog.timestamp , date: dayjs(rawLog.timestamp).get('year') + "/" + dayjs(rawLog.timestamp).get('month') + "/" + dayjs(rawLog.timestamp).get('day')  ,time: dayjs(rawLog.timestamp).get('hour') +":"+ dayjs(rawLog.timestamp).get('minute') , category: "User" , description: `You set the target temperature to ${rawLog.parameters[1]}°C (${rawLog.parameters[0]} mode is now active).` }
      //       }else {
      //         return  {dateAndTime: rawLog.timestamp , date: dayjs(rawLog.timestamp).get('year') + "/" + dayjs(rawLog.timestamp).get('month') + "/" + dayjs(rawLog.timestamp).get('day')  ,time: dayjs(rawLog.timestamp).get('hour') +":"+ dayjs(rawLog.timestamp).get('minute') , category: "User" , description: `You switched to ${rawLog.parameters[0]} mode.` }
      //       }
      //       break;
      //     case "PROFILE_UPDATE":
      //       return {dateAndTime: rawLog.timestamp ,date: dayjs(rawLog.timestamp).get('year') + "/" + dayjs(rawLog.timestamp).get('month') + "/" + dayjs(rawLog.timestamp).get('day')  ,time: dayjs(rawLog.timestamp).get('hour') +":"+ dayjs(rawLog.timestamp).get('minute') , category: "System" , description: `Profile ${profile.profileName} has been updated because you set the target temperature to ${rawLog.parameters[2]}°C when the price was ${rawLog.parameters[1]} p/kWh where the AI now believes your price sensitivity is ${priceSensitivity} and your preferred temperature (if energy were free) is ${rawLog.parameters[4]}°C.`}
      //         // code block
      //       break;
      //     case "PROFILE_RESET":
      //         // code block
      //       return {dateAndTime: rawLog.timestamp ,date: dayjs(rawLog.timestamp).get('year') + "/" + dayjs(rawLog.timestamp).get('month') + "/" + dayjs(rawLog.timestamp).get('day')  ,time: dayjs(rawLog.timestamp).get('hour') +":"+ dayjs(rawLog.timestamp).get('minute') , category: "User" , description: `You reset profile ${profile.profileName}`}
      //       break;
      //     case "SCHEDULE_EDIT":
      //         // code block
      //       return {dateAndTime: rawLog.timestamp ,date: dayjs(rawLog.timestamp).get('year') + "/" + dayjs(rawLog.timestamp).get('month') + "/" + dayjs(rawLog.timestamp).get('day')  ,time: dayjs(rawLog.timestamp).get('hour') +":"+ dayjs(rawLog.timestamp).get('minute') , category: "User" , description: `You edited the schedule.`}
      //       break;
      //     default:
      //       break;
      //       // code block
      //   }
      // })
      // setLogs(logs)
      // console.log(logs)
      setLogs(currentState.logs)
      const earliest = logsai.reduce((a, b) => (a.dateAndTime > b.dateAndTime ? a : b));
      setValueFrom(moment(earliest.dateAndTime.split('T')[0]).format())

    },[currentState.logs])

  

    const classes = useStyles();
    const dispatch = useDispatch()

//   const getData = () => {
//     dispatch(initializeData())
//   }

  return (
    <Grid container direction='column' justifyContent='center' alignItems='center' className={classes.mainContainer}>
    {/* <button onClick={()=>{console.log(valueFrom)}}>data</button> */}
    {/* <button onClick={()=>{setValueFrom("2022-9-23T20:50:33.000Z")}}> zeur</button> */}
    <Grid item xs={1.4}className={classes.buttons}>
      <Grid container xs={12} direction="row" justifyContent='flex-start' alignItems='center' className={classes.datepickerContainer}>
        <Grid item xs={12} className={classes.datepickerbuttons}> 
          <DatePickerComponent valueFrom={valueFrom} setValueFrom={setValueFrom} valueTo={valueTo} setValueTo={setValueTo} />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={10.5}className={classes.logs}>
      <LogTable logs={logs}/>
    </Grid>
  </Grid>

    // <Grid item container direction='column' justifyContent='center' alignItems='center' >
    //   {/* <button onClick={()=>{console.log(valueFrom)}}>data</button> */}
    //   {/* <button onClick={()=>{setValueFrom("2022-9-23T20:50:33.000Z")}}> zeur</button> */}
    //   { logs === null ? <ProgressCircular size={40}/> : 
    //     <Grid xs={12} item container direction='column' justifyContent='center' alignItems='center'  className={classes.mainContainer} >
    //       <Grid item xs={0.2}></Grid>
    //       <Grid xs={1} item container direction="row" justifyContent='flex-start' alignItems='center' className={classes.datepickerContainer}>
    //         <Grid item xs={0.25}></Grid>
    //         <Grid item xs={11.75}>
    //           <DatePickerComponent valueFrom={valueFrom} setValueFrom={setValueFrom} valueTo={valueTo} setValueTo={setValueTo} />
    //         </Grid>
    //       </Grid>
    //       <Grid item xs={0.4}></Grid>
    //       <Grid item container xs={10.4} className={classes.logs} >
    //         <Grid item>
    //           <LogTable logs={logsai}/>
    //         </Grid>
    //       </Grid>
    //     </Grid>
      
    //   }
    // </Grid>
  );
};

export default Logs;


          // {/* <Grid item xs={1}> </Grid> */}
          // // <Grid item xs={1} className={classes.buttons}>
          // //   <Grid item container xs={12} direction="row" justifyContent='flex-start' alignItems='center' className={classes.datepickerContainer}>
          // //     <Grid item xs={12} className={classes.datepickerbuttons}> 
          // //       <DatePickerComponent valueFrom={valueFrom} setValueFrom={setValueFrom} valueTo={valueTo} setValueTo={setValueTo} />
          // //     </Grid>
          // //   </Grid>
          // // </Grid>
          // // <Grid item xs={10.5}className={classes.logs}>
          // //   <LogTable logs={logsai}/>
          // // </Grid>