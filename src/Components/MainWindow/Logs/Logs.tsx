import React, {useEffect, useState} from 'react';
//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Grid } from '@mui/material/';



// redux
import {useSelector, useDispatch} from 'react-redux'
import { initialiseLogs } from '../../../Redux-reducers/logsReducer';
import { getMoreLogsOnUserClick } from '../../../Redux-reducers/logsReducer';

//components
import DatePickerComponent from './DatePickerComponent';
import LogTable from './LogTable';
import ProgressCircular from '../../ProgressBar/ProgressCircular';
import Checkboxes from './Checkboxes';

// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer:{
      height: '100%',
    },
    buttons:{
      width:'100%'
    },
    table:{
      width:'100%'
    },
    datepickerContainer:{
      height: '100%',
    },
    datepickerbuttons:{
      position: 'relative',
      left: '1%',
    },
    checkboxButtons:{
      position: 'relative',
      right: '1%',
    },
    main: {
       position: 'relative',
       marginLeft: 'auto',
       marginRight: 'auto',
       top: '2%',
       width: '99%',
       height: '97%',
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
  const [valueTo, setValueTo] = React.useState<String | null>(null);
  const [isGettingMoreLogs, setIsGettingMoreLogs] = React.useState<boolean>(false);
  
  //pages and ref for logtable
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);


  const [logs, setLogs] = useState<any[]|null>(null);
  const [logsLength, setLogsLength] = useState<number|null>(null);
  

  const classes = useStyles();
  const dispatch = useDispatch()

    useEffect(()=>{
      const allLogs = currentState.logs.logs?.filter((log:any)=>{return currentState.logs?.categoryFilters[log.category]})
      setLogs(allLogs)
      setLogsLength(allLogs?.length)
      setIsGettingMoreLogs(false)
    },[currentState.logs])


    useEffect(()=>{
      dispatch(initialiseLogs(homeLabel, currentState.logs.from, currentState.logs.to))
      setPage(0)
    },[currentState.logs?.categoryFilters])


    useEffect(()=>{
      if( logsLength !== null && logsLength <= rowsPerPage * 2 && currentState.logs.allLogsRetrieved === false && currentState.logs.initialiseFinished === true && !(!currentState.logs?.categoryFilters.User && !currentState.logs?.categoryFilters.System)){ // reike dar vieno kad butu initialised true
        dispatch(getMoreLogsOnUserClick(homeLabel, currentState.logs.skip, currentState.logs.lastRawLog, currentState.logs.from, currentState.logs.to));
        setIsGettingMoreLogs(true)
      }
    },[logsLength, currentState.logs.logs, currentState.logs.initialiseFinished])


  return (
    <Grid container direction='column' justifyContent='center' alignItems='center' className={classes.mainContainer} padding={0}>
    <Grid item xs={1.4}className={classes.buttons}>
      <Grid container xs={12} direction="row" justifyContent='flex-start' alignItems='center' className={classes.datepickerContainer}>
        <Grid item xs={8} className={classes.datepickerbuttons}> 
          <DatePickerComponent valueFrom={valueFrom} setValueFrom={setValueFrom} valueTo={valueTo} setValueTo={setValueTo} homeLabel={homeLabel} logs={logs} setLogs={setLogs} page={page} setPage={setPage}/>
        </Grid>
        <Grid xs={4} item container className={classes.checkboxButtons} direction="row" justifyContent='flex-end' alignItems='center'>
          <Checkboxes uniquefilterValues={currentState.logs?.categoryFilters}/>
        </Grid>
      </Grid>
    </Grid>
    <Grid item container xs={10.2}className={classes.logs} direction="row" justifyContent='center' alignItems='center'>
      {logs && logs.length > rowsPerPage || currentState.logs.allLogsRetrieved === true || (!currentState.logs?.categoryFilters.User && !currentState.logs?.categoryFilters.System) ?  <LogTable logs={logs} label={homeLabel!} previousSkip={currentState.logs.skip} lastRawLog={currentState.logs.lastRawLog} setIsGettingMoreLogs={setIsGettingMoreLogs} isGettingMoreLogs={isGettingMoreLogs} fromRedux={currentState.logs.from} toRedux={currentState.logs.to} page={page} setPage={setPage} fromDatePicker={valueFrom} toDatePicker={valueTo} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} allLogsRetrieved={currentState.logs.allLogsRetrieved} /> : <ProgressCircular size={40}/>}
    </Grid>
  </Grid>
  );
};

export default Logs;