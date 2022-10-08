import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

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
import moment from 'moment';

// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer:{
      // border: '3px dashed red',
      height: '100%',
      overflow: 'hidden',
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
      height: '100%'
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
      position: 'relative',
      height: '10%',
      left: '0.5%'
    },
    logs:{
      position: 'relative',
      marginLeft: 'auto',
      marginRight: 'auto',
      height: '90%',
      width: '99%',
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

const Logs: React.FC = () => {
  const [valueFrom, setValueFrom] = React.useState<String | null>(null);
  const [valueTo, setValueTo] = React.useState<String | null>(new Date().toISOString()); // is visu surasti seniause!

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
      // const swx = logsai.map(function(e) { return e.dateAndTime; }).sort().reverse()[0]
      // console.log(typeof swx, typeof valueTo)
      // setValueFrom(swx)
      const earliest = logsai.reduce((a, b) => (a.dateAndTime > b.dateAndTime ? a : b));
      console.log(earliest.dateAndTime)
      setValueFrom(moment(earliest.dateAndTime.split('T')[0]).format())

    },[])

  

    const classes = useStyles();
    const dispatch = useDispatch()

//   const getData = () => {
//     dispatch(initializeData())
//   }

  return (
    // <div className={classes.main}>
    //   <div className={classes.datepicker}>
    //     <DatePickerComponent/>
    //   </div>
    //   <div className={classes.logs}>
    //     <LogTable logs={logsai}/>
    //     {/* {logsai.map((log)=>{
    //       return(
    //         <p className={classes.description}>{log.description}swxxxx</p>
    //       )
    //     })} */}
    //   </div>
    // </div>
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
        <LogTable logs={logsai}/>
      </Grid>
    </Grid>
  );
};

export default Logs;
