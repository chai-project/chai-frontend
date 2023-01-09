import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import dayjs from 'dayjs'
import moment from 'moment';

import { createBrowserHistory } from 'history';


//mui
import {makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, TextField, Grid } from '@mui/material/';



// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';
import { initialiseLogs } from '../../../Redux-reducers/logsReducer';


//types
import chartDataType from '../../../Types/types'

//components
import SwitchButton from '../../Buttons/SwitchButton';
import DatePickerComponent from './DatePickerComponent';
import LogTable from './LogTable';
import ProgressCircular from '../../ProgressBar/ProgressCircular';
import Checkboxes from './Checkboxes';

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
      // border: '1px dashed orange',
    },
    datepickerbuttons:{
      position: 'relative',
      left: '1%',
      // border: '3px dashed red',
    },
    checkboxButtons:{
      position: 'relative',
      right: '1%',
      // border: '3px dashed green',
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
      width: '100%',
      // top: '10%',
      // overflowY: 'scroll',
      // overflowX: 'hidden',
      // border: '1px dashed red',
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

const Logs: React.FC<{currentState:any, homeLabel:any}> = ({currentState, homeLabel}) => {
  const [valueFrom, setValueFrom] = React.useState<String | null>(null);
  // const [valueTo, setValueTo] = React.useState<String | null>(new Date().toISOString()); // is visu surasti seniause!
  const [valueTo, setValueTo] = React.useState<String | null>(null); // is visu surasti seniause!
  const [isGettingMoreLogs, setIsGettingMoreLogs] = React.useState<boolean>(false); // is visu surasti seniause!


  //pages and ref for logtable
  const [page, setPage] = React.useState(0);

  const [logs, setLogs] = useState<any[]|null>(null);

  // Filtering
  const [uniquefilterValues, setUniquefilterValues] = useState<any>({'System': true, 'User': true});


  const classes = useStyles();
  const dispatch = useDispatch()
  


  // const url = createBrowserHistory()
  // const parameters = new URLSearchParams(url.location.search);
  // const homeLabel =  parameters.get('home')

    useEffect(()=>{
      setLogs(currentState.logs.logs?.filter((log:any)=>{return uniquefilterValues[log.category]}));
      setValueFrom(currentState.logs.from);
      setValueTo(currentState.logs.to);
      setIsGettingMoreLogs(false)
    },[currentState.logs, uniquefilterValues])

    useEffect(()=>{
      setPage(0)
    },[uniquefilterValues])

  return (
    <Grid container direction='column' justifyContent='center' alignItems='center' className={classes.mainContainer} padding={0}>
    <Grid item xs={1.4}className={classes.buttons}>
      <Grid container xs={12} direction="row" justifyContent='flex-start' alignItems='center' className={classes.datepickerContainer}>
        <Grid item xs={8} className={classes.datepickerbuttons}> 
          <DatePickerComponent valueFrom={valueFrom} setValueFrom={setValueFrom} valueTo={valueTo} setValueTo={setValueTo} homeLabel={homeLabel} logs={logs} setLogs={setLogs} page={page} setPage={setPage}/>
        </Grid>
        <Grid xs={4} item container className={classes.checkboxButtons} direction="row" justifyContent='flex-end' alignItems='center'>
          <Checkboxes logs={logs} setLogs={setLogs} uniquefilterValues={uniquefilterValues} setUniquefilterValues={setUniquefilterValues}/>
        </Grid>
      </Grid>
    </Grid>
    <Grid item container xs={10.2}className={classes.logs} direction="row" justifyContent='center' alignItems='center'>
      {logs ? <LogTable logs={logs} label={homeLabel!} previousSkip={currentState.logs.skip} lastRawLog={currentState.logs.lastRawLog} setIsGettingMoreLogs={setIsGettingMoreLogs} isGettingMoreLogs={isGettingMoreLogs} fromRedux={currentState.logs.from} toRedux={currentState.logs.to} page={page} setPage={setPage} fromDatePicker={valueFrom} toDatePicker={valueTo} /> : <ProgressCircular size={40}/>}
      {/* <LogTable logs={logs} label={homeLabel!} previousSkip={currentState.logs.skip} lastRawLog={currentState.logs.lastRawLog} setIsGettingMoreLogs={setIsGettingMoreLogs} isGettingMoreLogs={isGettingMoreLogs} fromRedux={currentState.logs.from} toRedux={currentState.logs.to} page={page} setPage={setPage} fromDatePicker={valueFrom} toDatePicker={valueTo} /> */}
    </Grid>
  </Grid>
  );
};

export default Logs;