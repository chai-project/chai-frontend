import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import {Grid, TextField} from '@mui/material/';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';

// redux
import {useDispatch} from 'react-redux'
import { initialiseLogs } from '../../../Redux-reducers/logsReducer';

//styles 
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textfield: {
      width: '150px',
      '& label':{
        zIndex: 0
      },
      '& label.Mui-focused': {
        color: '#5ACBCC',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#5ACBCC',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white',
        },
        '&:hover fieldset': {
          borderColor: '#5ACBCC',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#5ACBCC',
        }
      },
      
    },
  }),
);

const DatePickerComponent: React.FC<{valueFrom:any, setValueFrom:any, valueTo:any, setValueTo:any, homeLabel:any, logs:any, setLogs:any, page:number, setPage:any }> = ({ valueFrom, setValueFrom, valueTo, setValueTo, homeLabel, logs, setLogs, page, setPage}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const defaultMinDate = dayjs('2021-01-01');


  const handleSetFrom = (newFromValue:any) => {
    dispatch(initialiseLogs(homeLabel, newFromValue, valueTo))
    setPage(0)
    setValueFrom(newFromValue);

  };
  const handleSetTo = (newToValue:any) => {
    dispatch(initialiseLogs(homeLabel, valueFrom, newToValue))
    setPage(0)
    setValueTo(newToValue);
  };

  return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid xs={12} container direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
          <Grid item>
            <DatePicker
              disableFuture
              inputFormat="DD/MM/YYYY"
              minDate={defaultMinDate}
              label="From"
              openTo='day'
              views={['month', 'day']}
              value={valueFrom}
              onChange={(newValue:any) => {
                handleSetFrom(newValue);
              }}
              renderInput={(params) => <TextField  size='small' className={classes.textfield} sx={{svg:{color:'#5ACBCC'}}} {...params} />}
            />
          </Grid>
          <Grid item>
          <DatePicker
            disableFuture
            minDate={valueFrom ? valueFrom : defaultMinDate }
            inputFormat="DD/MM/YYYY"
            label="To"
            openTo='day'
            views={['month', 'day']}
            value={valueTo}
            onChange={(newValue:any) => {
              handleSetTo(newValue);
            }}
            renderInput={(params) => <TextField  size='small' className={classes.textfield} sx={{svg:{color:'#5ACBCC'}}} {...params} />}
          />
          </Grid>
        </Grid>
      </LocalizationProvider>
  );
}
export default DatePickerComponent