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

//styles 
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textfield: {
      
      // backgroundColor: 'lime',
      // outlineColor: 'lime',
      // color:'red',
      width: '150px',
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
        },
        '& MuiSvgIcon': {
        color: 'red',
        },

      },
      
    },
    datepicker:{
      margin: 'auto'
    },
    tableRow: {
      // backgroundColor: 'red',
      // color: 'yellow',
      "&:hover": {
        backgroundColor: '#5ACBCC'
      }
    },
  }),
);

const DatePickerComponent: React.FC = () => {
  const [valueFrom, setValueFrom] = React.useState<Date | null>(new Date());
  const [valueTo, setValueTo] = React.useState<Date | null>(new Date()); // is visu surasti seniause!
  const classes = useStyles();


  return (
    // <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
          <Grid item>
            <DatePicker
              disableFuture
              label="From"
              openTo='day'
              views={['month', 'day']}
              value={valueFrom}
              onChange={(newValue:any) => {
                setValueFrom(newValue);
              }}
              renderInput={(params) => <TextField className={classes.textfield} sx={{svg:{color:'#5ACBCC'}}} {...params} />}
            />
          </Grid>
          <Grid item >
          <DatePicker
            className={classes.datepicker}
            disableFuture
            label="To"
            openTo='day'
            views={['month', 'day']}
            value={valueTo}
            onChange={(newValue:any) => {
              setValueTo(newValue);
            }}
            renderInput={(params) => <TextField className={classes.textfield} sx={{svg:{color:'#5ACBCC'}}} {...params} />}
          />
          </Grid>
        </Grid>
      </LocalizationProvider>
  );
}
export default DatePickerComponent