import React from 'react';
//mui 
import {Grid, IconButton } from '@mui/material/';
import RefreshIcon from '@mui/icons-material/Refresh';

// redux

//JSX
const RefreshRequest: React.FC<{showError:any,  action:any}> = ({showError, action}) => {


  const getData = () => {
    action()
  }

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
        <Grid item >{showError ? showError: null }</Grid>
        <Grid item >
            <IconButton size='medium' edge='start' color='primary' onClick={getData}>
                <RefreshIcon/>
            </IconButton>
        </Grid>
    </Grid>
  );
};

export default RefreshRequest;
