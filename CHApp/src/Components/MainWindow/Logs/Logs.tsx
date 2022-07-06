import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

//mui
import {makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, TextField } from '@mui/material/';



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
      overflowX: 'hidden'
      // border: '3px dashed red',
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
    <div className={classes.main}>
      <div className={classes.datepicker}>
        <DatePickerComponent/>
      </div>
      <div className={classes.logs}>
        <LogTable logs={logsai}/>
        {/* {logsai.map((log)=>{
          return(
            <p className={classes.description}>{log.description}swxxxx</p>
          )
        })} */}
      </div>
    </div>
  );
};

export default Logs;
