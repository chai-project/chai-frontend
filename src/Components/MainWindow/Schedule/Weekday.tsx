import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from "react-router-dom";
import { createBrowserHistory } from 'history';
import useMediaQuery from '@mui/material/useMediaQuery';


//mui
import {makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid, Divider, IconButton, Box, Menu, MenuItem, Fade, Typography } from '@mui/material/';
import MoreVertIcon from '@mui/icons-material/MoreVert';



// redux
import {useSelector, useDispatch} from 'react-redux'
import { setNewHeatingSchedule } from '../../../Redux-reducers/heatingScheduleReducer';


//components
import WeekdayScheduleView from './WeekdayScheduleView';

// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topBorder: {
       position: 'relative',
       width: '100%',
       height: '100%',
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
        height: '75%',
        [theme.breakpoints.down('md')]: {
          height: '60%',
        },
        [theme.breakpoints.down('sm')]: {
          height: '70%',
        }
    },
    schedule:{
        height: '80%',
    },
    moreButton:{
        height: '80%',
    },
  }),
);

const Weekday: React.FC<{weekday: String, scheduleForAWeekday: {weekday:String,schedule:{id:number, profileName:String,profileStart:String,profileEnd:String, temperature:String}[]} ,  setCopyWeekdaySchedule:any, copyWeekdaySchedule:String|null, setScheduleToCopy:any, indexOfASchedeule:number}>= ({weekday, scheduleForAWeekday, setCopyWeekdaySchedule,copyWeekdaySchedule, setScheduleToCopy, indexOfASchedeule}) => {
      
    const url = createBrowserHistory()
    const parameters = new URLSearchParams(url.location.search);
    const homeLabel =  parameters.get('home')
    const navigate = useNavigate();

    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.down("md"));

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
      setCopyWeekdaySchedule(scheduleForAWeekday.weekday);
      setScheduleToCopy(scheduleForAWeekday);
      setAnchorEl(null);
    };

    //reset button
    const resetWeekdaySchedule = () => {
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

  return (
    <Box className={classes.topBorder} bgcolor="background.default" >
        <Divider className={classes.divider} textAlign='left'><Typography variant={breakpoint ? "subtitle2" : 'inherit'}><b>{scheduleForAWeekday.weekday}</b></Typography></Divider>
        <Grid container className={classes.container} direction="row" justifyContent="center" alignItems="flex-start">
          <Grid item xs={8} className={classes.schedule}>
            <WeekdayScheduleView timeslots={scheduleForAWeekday.schedule} indexOfaWeekday={indexOfASchedeule} weekday={weekday}/>
          </Grid>
          <Grid item xs={1} container className={classes.moreButton}  direction="column" justifyContent="center" alignItems="center">
            {!copyWeekdaySchedule ? <Grid item>
                                        <IconButton size='small' edge='start' color='primary' onClick={handleClick}>
                                            <MoreVertIcon sx={breakpoint ? {fontSize:'20px'} : {fontSize:'24px'}}/>
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
                                      </Grid> : null
            }
          </Grid>
        </Grid>
    </Box>
  );
};

export default Weekday;
