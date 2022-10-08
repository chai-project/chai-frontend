import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from '@mui/material/styles';
import { CssBaseline, AppBar, Toolbar, IconButton, Stack, Link, Grid} from '@mui/material/';
// import Stack from '@mui/material/Stack';
import {makeStyles, Theme, createStyles, withStyles  } from '@material-ui/core/styles';
import moment from 'moment';

//styles 
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textfield: {
      // backgroundColor: 'lime',
      // outlineColor: 'lime',
      // color:'red',
      width: '150px',
      // color: 'red',
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
        // color: 'red',
        '& fieldset': {
          borderColor: 'white',
        },
        '&:hover fieldset': {
          borderColor: '#5ACBCC',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#5ACBCC',
        },
        '& MuiSvgIcon': {
        color: 'red',
        },

      },
      
    },
  }),
);

const DatePickerComponent: React.FC<{valueFrom:any, setValueFrom:any, valueTo:any, setValueTo:any }> = ({ valueFrom, setValueFrom, valueTo, setValueTo}) => {
  // const [valueFrom, setValueFrom] = React.useState<Date | null>(new Date());
  // const [valueTo, setValueTo] = React.useState<Date | null>(new Date()); // is visu surasti seniause!
  const classes = useStyles();
  // console.log(valueFrom?.split('T')[0])

  return (
    // <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Grid xs={12} container direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
          <Grid item>
            <DatePicker
              disableFuture
              inputFormat="DD/MM/yyyy"
              // shouldDisableDate={}
              minDate={moment('2022-09-27')}
              // defaultValue={'23-09-2022'}
              label="From"
              openTo='day'
              views={['month', 'day']}
              value={new Date('2022-10-4').toISOString()} //new Date('2022-09-27').toISOString()
              onChange={(newValue:any) => {
                setValueFrom(newValue);
              }}
              renderInput={(params) => <TextField className={classes.textfield} sx={{svg:{color:'#5ACBCC'}}} {...params} />}
            />
          </Grid>
          <Grid item>
          <DatePicker
            disableFuture
            inputFormat="DD/MM/yyyy"
            label="To"
            openTo='day'
            views={['month', 'day']}
            value={valueTo}
            onChange={(newValue:any) => {
              // console.log(newValue._d.toISOString(),'wtf???')
              setValueTo(newValue);
            }}
            renderInput={(params) => <TextField className={classes.textfield} sx={{svg:{color:'#5ACBCC'}}} {...params} />}
          />
          </Grid>
        </Grid>
        {/* <Grid item>
          <TextField type="date" inputProps={{min: '01-10-2022'}}  value={valueTo.split('T')[0]} onChange={(newValue:any)=>{setValueTo(newValue.toISOString())}} className={classes.textfield} sx={{svg:{color:'#5ACBCC'}}}/>
        </Grid> */}
      </LocalizationProvider>
  );
}
export default DatePickerComponent