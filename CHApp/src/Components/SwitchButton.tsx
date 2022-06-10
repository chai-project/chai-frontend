
import * as React from 'react';
//MUI
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup'; // cia bus visi switchai
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#5ACBCC' : '#5ACBCC',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#5ACBCC',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#5ACBCC' : '#5ACBCC',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));



  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
        opacity: '0.7'
    },
  }),
);



  const SwitchButton: React.FC<{labelLeft: String, labelRight: String, action: () => void}> = ({labelLeft, labelRight, action}) => {

    const classes = useStyles();
    // const dispatch = useDispatch()

//   const getData = () => {
//     dispatch(initializeData())
//   }

  return (
    <div>
        <Stack direction="row" spacing={1} alignItems="center">
            <Typography className={classes.label} color='textSecondary'>{labelLeft}</Typography>
            <IOSSwitch sx={{ m: 1 }} defaultChecked onClick={()=>{action()}}/>
            <Typography  className={classes.label} color='textSecondary'>{labelRight}</Typography>
        </Stack>
    </div>
  );
};

export default SwitchButton;

  