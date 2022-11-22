import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from "react-router-dom";
import { createBrowserHistory } from 'history';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid, Divider, IconButton, Box, Menu, MenuItem, Fade } from '@mui/material/';
import MoreVertIcon from '@mui/icons-material/MoreVert';



// redux
import {useSelector, useDispatch} from 'react-redux'
import { setNewHeatingSchedule } from '../../../Redux-reducers/heatingScheduleReducer';
// import { initializeData } from './Redux-reducers/dataReducer';


//types
import timeslot from '../../../Types/types';

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
        paddingBottom: '1%' // 
        // background: 'red',
    },
  }),
);

const Weekday: React.FC<{weekday: String, scheduleForAWeekday: {weekday:String,schedule:{id:number, profileName:String,profileStart:String,profileEnd:String, temperature:String}[]} ,  setCopyWeekdaySchedule:any, copyWeekdaySchedule:String|null, setScheduleToCopy:any, indexOfASchedeule:number}>= ({weekday, scheduleForAWeekday, setCopyWeekdaySchedule,copyWeekdaySchedule, setScheduleToCopy, indexOfASchedeule}) => {
      
    const url = createBrowserHistory()
    const parameters = new URLSearchParams(url.location.search);
    const homeLabel =  parameters.get('home')
    const navigate = useNavigate();
    //more button
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };
    //copy button
    const copyWeekdayScheduleButton = () => {
      // console.log('copy', scheduleForAWeekday.schedule);
      setCopyWeekdaySchedule(scheduleForAWeekday.weekday);
      setScheduleToCopy(scheduleForAWeekday);
      setAnchorEl(null);
    };
    //reset button
    const resetWeekdaySchedule = () => { //define type !!!
      const defaultProfile = {
          profileName: "Nights",
          profileID: 1,
          color: "#57A6F0",
          profileStart: "00:00",
          profileEnd: "24:00"
      }
      dispatch(setNewHeatingSchedule(homeLabel, [scheduleForAWeekday.weekday], [defaultProfile]))
      setAnchorEl(null);
    };
    //edit button
    const editWeekdaySchedule = () => {
      navigate(`/Schedule/${scheduleForAWeekday.weekday}`);
      setAnchorEl(null);
    };
    //styles 
    const classes = useStyles();
    //redux
    const dispatch = useDispatch()

  const setSelectedTimeslot = () => {
    
  }

  return (
    //buvo div konteineris vietoj box todel tos  spalvos nebuvo ir schedule componenete spacingas 0.5 dabar anksciau jo iswiso nebuvo geriau atrodo 
    //gal iswiso tamsi spalva pgal mane
    <Box className={classes.topBorder} bgcolor="background.default" >
        <Divider className={classes.divider} textAlign='left'><b>{scheduleForAWeekday.weekday}</b></Divider>
        <Grid container className={classes.container} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={8} className={classes.schedule}>
              <WeekdayScheduleView timeslots={scheduleForAWeekday.schedule} indexOfaWeekday={indexOfASchedeule} weekday={weekday}/>
            </Grid>
            <Grid item xs={0.5}></Grid>
            <Grid item xs={1} container className={classes.moreButton}  direction="row" justifyContent="center" alignItems="center">
              {!copyWeekdaySchedule ? <div>
                                      <IconButton size='small' edge='start' color='primary' onClick={handleClick}>
                                          <MoreVertIcon/>
                                      </IconButton>
                                      <Menu
                                        id="fade-menu"
                                        MenuListProps={{
                                          'aria-labelledby': 'fade-button',
                                        }}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleMenuClose}
                                        TransitionComponent={Fade}
                                      >
                                        <MenuItem onClick={editWeekdaySchedule}>Edit</MenuItem>
                                        <MenuItem onClick={copyWeekdayScheduleButton}>Copy</MenuItem>
                                        <MenuItem onClick={resetWeekdaySchedule}>Clear</MenuItem>
                                      </Menu>
                                    </div> : null}
            </Grid>
        </Grid>
    </Box>
  );
};

export default Weekday;
