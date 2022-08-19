import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid, Divider, IconButton, Box } from '@mui/material/';
import MoreVertIcon from '@mui/icons-material/MoreVert';



// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';


//types


//components
import WeekdayScheduleView from './WeekdayScheduleView';
// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topBorder: {
      //  boxSizing: 'border-box',
       position: 'relative', //sitas!!!
       width: '100%',
       height: '100%',
    //    background: '#CFD8DC',
      //  left: '4%',
      //  top: '10%',
    },
    divider:{
        "&.MuiDivider-root": {
          "&::before": {
            borderTop: "medium solid #57CBCC"
          },
          "&::after": {
            borderTop: "medium solid #57CBCC"
          }
        },
    },
    container:{
        // border: "2px dashed red",
        width: '100%',
        height: '75%',
          //  background: 'red',
    },
    schedule:{
        // border: "1px solid pink",
        height: '80%',
        // background: 'red',
        // borderRadius: '25px',
        // overflow: 'hidden',
        // height: '12%',
        // width: '100%',

    },
    moreButton:{
        // border: "1px solid pink",
        height: '80%',
        // background: 'red',
    },
  }),
);

const Weekday: React.FC<{weekday: String}>= ({weekday}) => {
    const [profile, setProfile] = useState('');

    const classes = useStyles();
    const dispatch = useDispatch()

//   const getData = () => {
//     dispatch(initializeData())
//   }

  return (
    //buvo div konteineris vietoj box todel tos  spalvos nebuvo ir schedule componenete spacingas 0.5 dabar anksciau jo iswiso nebuvo geriau atrodo 
    //gal iswiso tamsi spalva pgal mane
    <Box className={classes.topBorder} bgcolor="background.default" >
        <Divider className={classes.divider} textAlign='left'><b>{weekday}</b></Divider>
        <Grid container className={classes.container} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={8} className={classes.schedule}>
              <WeekdayScheduleView/>
            </Grid>
            <Grid item xs={0.5}></Grid>
            <Grid item xs={1} container className={classes.moreButton}  direction="row" justifyContent="center" alignItems="center">
                <IconButton size='small' edge='start' color='primary' onClick={() => {console.log('more',weekday)}}>
                    <MoreVertIcon/>
                </IconButton>
            </Grid>
        </Grid>
    </Box>
  );
};

export default Weekday;
