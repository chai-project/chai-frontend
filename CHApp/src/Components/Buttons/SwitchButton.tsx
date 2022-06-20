
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
    root:{
      margin: 3
    },
    labelLeft: {
      position: 'relative',
      width: '70px',
      opacity: '0.7',
      textAlign:'right',
      // border: '2px solid red',
    },
    labelRight:{
      position: 'relative',
      width: '70px',
      opacity: '0.7',
      textAlign:'left',
      // border: '2px solid red',
    }
  }),
);



  const SwitchButton: React.FC<{labelLeft: String, labelRight: String, action: (event:any) => void , status: boolean, disabled: boolean}> = ({labelLeft, labelRight, action, status, disabled}) => {

    const classes = useStyles();

    const toogle = (event:any) =>{
      action(event)
      console.log(event.target.checked)
    }

  return (
    <div className={classes.root}>
        <Stack direction="row" spacing={1} alignItems="center">
          <div className={classes.labelLeft}>
            <Typography variant="subtitle2" color='textSecondary'>{labelLeft}</Typography>
          </div>
          <IOSSwitch sx={{ m: 1 }} disabled={disabled} checked={status} onChange={toogle}/>
          <div className={classes.labelRight}>
            <Typography  variant="subtitle2" color='textSecondary'>{labelRight}</Typography>
          </div>
        </Stack>
    </div>
  );
};

export default SwitchButton;

  