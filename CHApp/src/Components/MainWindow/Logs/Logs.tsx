import React, {useState} from 'react';
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

    const logsai = [
      {
        date: '4/7/2002',
        time: '14:22',
        description: 'User changed setpoint to 21° and the current price is 9.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        description: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      }
    ]

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
      <Grid item xs={1.4}className={classes.buttons}>
        <Grid container xs={12} direction="row" justifyContent='flex-start' alignItems='center' className={classes.datepickerContainer}>
          <Grid item xs={12} className={classes.datepickerbuttons}> 
            <DatePickerComponent/>
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
