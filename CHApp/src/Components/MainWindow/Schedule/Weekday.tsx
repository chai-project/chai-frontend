import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid, Divider, IconButton, Box, Menu, MenuItem, Fade } from '@mui/material/';
import MoreVertIcon from '@mui/icons-material/MoreVert';



// redux
import {useSelector, useDispatch} from 'react-redux'
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
        // background: 'red',
    },
  }),
);

const Weekday: React.FC<{weekday: String, setCopyWeekdaySchedule:any, copyWeekdaySchedule:String|null, setScheduleToCopy:any}>= ({weekday,setCopyWeekdaySchedule,copyWeekdaySchedule, setScheduleToCopy}) => {
    const [profile, setProfile] = useState('');
    //test timeslots for a weekday
    const profilesForAweekDay= [
      {
          profileName: "Morning",
          profileStart:'00:00',
          profileEnd: '08:15',
          temperature: '19'
      },
      {
          profileName: "Empty",
          profileStart:'08:15',
          profileEnd: '12:30',
          temperature: '0'
      },
      {
          profileName: "Afternoon",
          profileStart:'12:30',
          profileEnd: '14:00',
          temperature: '21'
      },
      {
          profileName: "Empty",
          profileStart:'14:00',
          profileEnd: '17:30',
          temperature: '0'
      },
      {
          profileName: "Evening",
          profileStart:'17:30',
          profileEnd: '20:00',
          temperature: '24'
      },
      {
          profileName: "Night",
          profileStart:'20:00',
          profileEnd: '24:00',
          temperature: '17'
      },
      
  ]

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
      console.log('copy', weekday);
      setCopyWeekdaySchedule(weekday);
      setScheduleToCopy(profilesForAweekDay);
      setAnchorEl(null);
    };
    //reset button
    const resetWeekdaySchedule = () => {
      console.log('reseting : ', weekday)
      setAnchorEl(null);
    };
    //styles 
    const classes = useStyles();
    //redux
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
              <WeekdayScheduleView timeslots={profilesForAweekDay}/>
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
                                        <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
                                        <MenuItem onClick={copyWeekdayScheduleButton}>Copy</MenuItem>
                                        <MenuItem onClick={resetWeekdaySchedule}>Reset</MenuItem>
                                      </Menu>
                                    </div> : null}
                {/* <IconButton size='small' edge='start' color='primary' onClick={handleClick}>
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
                  <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
                  <MenuItem onClick={copyWeekdayScheduleButton}>Copy</MenuItem>
                  <MenuItem onClick={resetWeekdaySchedule}>Reset</MenuItem>
                </Menu> */}
            </Grid>
        </Grid>
    </Box>
  );
};

export default Weekday;
