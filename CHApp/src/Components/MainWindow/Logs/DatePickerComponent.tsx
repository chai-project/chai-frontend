import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from '@mui/material/styles';
// import Stack from '@mui/material/Stack';


const theme = createTheme({
  components: {
    MuiIconButton: {
      styleOverrides: {
        sizeMedium: {
          color: '#5ACBCC'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: 'pallete.text.prirmary'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'yellow'
        }
      }
    }
  }
});
// const StyledPicker = withStyles({
//   root: {
//    '& .MuiPickersCalendarHeader-iconButton': {
//      backgroundColor: '#f2f2f2',
//      borderRadius: 0,
//      width: 32,
//      height: 32,
//      margin: '10 30',
//    },
//  },
// })(DatePicker);
//dauggzadantis apacioje!!!
const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  // color:'red',
  height: '2000px',
  color: theme.palette.mode === 'dark' ? 'green' : 'yellow',
  '& .MuiPickersCalendarHeader-iconButton': {
    backgroundColor: 'red',
  }
}));

const DatePickerComponent: React.FC = () => {
  const [valueFrom, setValueFrom] = React.useState<Date | null>(new Date());
  const [valueTo, setValueTo] = React.useState<Date | null>(new Date());

  return (
    // <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            disableFuture
            label="From"
            openTo='day'
            views={['month', 'day']}
            value={valueFrom}
            onChange={(newValue:any) => {
              setValueFrom(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            disableFuture
            label="To"
            openTo='day'
            views={['month', 'day']}
            value={valueTo}
            onChange={(newValue:any) => {
              setValueTo(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
      </LocalizationProvider>
  );
}
export default DatePickerComponent