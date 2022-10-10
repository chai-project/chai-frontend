import React, {useEffect, useState} from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CssBaseline, AppBar, Toolbar, IconButton, Stack, Link, Grid, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent} from '@mui/material/';
// import Stack from '@mui/material/Stack';
import {makeStyles, Theme, createStyles, withStyles, useTheme  } from '@material-ui/core/styles';
import { time } from 'console';
// import { useTheme } from '@mui/material/styles';

//styles 
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main:{
      // border: "5px solid red",
      // width: '4px',
      // width: '100%',
      // height: '1px',
    },
    from:{
      // border: "2px dashed pink",
      // width: '50px'
      // width: '200px'
    },
    to:{
      // border: "2px dashed yellow",
    },
    labelHours: {
      // height:'25px',

      "&.MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#5ACBCC" // sia spalva pakeisti i balta arba jouda priklauso nuo app temos.
        },
        "&:hover fieldset": {
          // borderColor: "yellow"
        },
        "&.Mui-focused fieldset": {
          // borderColor: "green"
        },
      },
      "&.Mui-focused": {
        // color: "green",
      },
      [theme.breakpoints.down('md')]: {
        height:'25px',
        width: '60px',
        "&.MuiOutlinedInput-root": {
          fontSize:'11px',
        }
      }
      
    },
    labelMinutes: {
      // height:'25px',
      width:'70px',
      "&.MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#5ACBCC" // sia spalva pakeisti i balta arba jouda priklauso nuo app temos.
        },
        "&:hover fieldset": {
          // borderColor: "yellow"
        },
        "&.Mui-focused fieldset": {
          // borderColor: "green"
        },
      },
      "&.Mui-focused": {
        // color: "green",
      },
      [theme.breakpoints.down('md')]: {
        height:'25px',
        width: '60px',
        "&.MuiOutlinedInput-root": {
          fontSize:'11px',
        }
      }
      
    },
    icon:{
      color:"#5ACBCC !important"
    },
    textLabel: {
      // width: '20px',
      fontSize:'10px',
      [theme.breakpoints.down('md')]: {
        fontSize:'9px',
        // height:'25px',
        // width: '65px',
      }
    }
  }),
);

const TimeslotPeriodFromTo: React.FC<{fromTo: any, timeslots:any, asignedTimeslot:any, sortTimeslots:any  }> = ({fromTo, timeslots, asignedTimeslot, sortTimeslots }) => {
  const [hoursFrom, setHoursFrom] = useState<string>("");
  const [minutesFrom, setMinutesFrom] = useState<string>("");
  const [hoursTo, setHoursTo] = useState<string>("");
  const [minutesTo, setMinutesTo] = useState<string>("");

  useEffect(()=>{
    setHoursFrom(asignedTimeslot.profileStart.split(':')[0]);
    setMinutesFrom(asignedTimeslot.profileStart.split(':')[1]);
    setHoursTo(asignedTimeslot.profileEnd.split(':')[0]);
    setMinutesTo(asignedTimeslot.profileEnd.split(':')[1]);
  },[asignedTimeslot]);

  // console.log(asignedTimeslot,'blblb', timeslots)

  const classes = useStyles();
  const theme = useTheme();
  const breakpoint = useMediaQuery(theme.breakpoints.down("md"));

  const hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
  const hoursTest:any[] = []
  const krc = () => {
    timeslots.find((timeslot:any, index:number, array:any)=>{
    if(timeslot.id === asignedTimeslot.id){
      console.log(Number(array[index+1]?.profileEnd.split(":")[0]))
      if(Number(array[index+1]?.profileEnd.split(":")[0] !== NaN)){
        for(let i= 0; i<=Number(array[index+1]?.profileEnd.split(":")[0]); i++ ){
          hoursTest.push(i)
        }
      }
      // Number("5")
    }
  })
}
  krc()
  console.log(hoursTest, asignedTimeslot,'zz')
  const minutes= [0,15,30,45]

  const handleSetHoursFrom = (event: SelectChangeEvent) => {
    setHoursFrom(String(event.target.value)); //event.target.value as string buvo
    const newTimeslots: any[] = []
    for(let i =0; i<timeslots.length; i++){
        if(asignedTimeslot.id === timeslots[i].id){
          if(newTimeslots[i-1]){
            newTimeslots[i-1].profileEnd = String(event.target.value)+":"+asignedTimeslot.profileStart.split(":")[1]
          }
          // newTimeslots[i-1].profileEnd = String(event.target.value)+":"+asignedTimeslot.profileStart.split(":")[1]
          newTimeslots.push({...timeslots[i], profileStart: String(event.target.value)+":"+asignedTimeslot.profileStart.split(":")[1]})
        }else{
          newTimeslots.push({...timeslots[i]})
        }
    }
    // const newTimeslots = timeslots.map((timeslot:any, index:number, self:any)=>{
    //   if(asignedTimeslot.id === timeslot.id){
    //     if(index !== 0){
    //       return {...self[index-1], profileEnd: event.target.value + ":" + timeslot.profileStart.split(":")[1]} & { ...timeslot, profileStart:event.target.value + ":" + timeslot.profileStart.split(":")[1] }
    //     }else {
    //       return {...timeslot, profileStart:event.target.value + ":" + timeslot.profileStart.split(":")[1]  }
    //     }
    //   }else{
    //     return {...timeslot}
    //   }
    // });
    sortTimeslots(newTimeslots)
  };
  const handleSetMinutesFrom = (event: SelectChangeEvent) => {
    setMinutesFrom(String(event.target.value)); //event.target.value as string buvo
    const newTimeslots: any[] = []
    for(let i =0; i<timeslots.length; i++){
        if(asignedTimeslot.id === timeslots[i].id){
          if(newTimeslots[i-1]){
            newTimeslots[i-1].profileEnd = asignedTimeslot.profileStart.split(":")[0]+":"+String(event.target.value)
          }
          newTimeslots.push({...timeslots[i], profileStart: asignedTimeslot.profileStart.split(":")[0]+":"+String(event.target.value)})
        }else{
          newTimeslots.push({...timeslots[i]})
        }
    }
    sortTimeslots(newTimeslots)
  };
  const handleSetHoursTo = (event: SelectChangeEvent) => {
    setHoursTo(String(event.target.value)); //event.target.value as string buvo
    const newTimeslots: any[] = []
    let index: number|null =null;
    for(let i =0 ; i<timeslots.length; i++){
        if(asignedTimeslot.id === timeslots[i].id){
          newTimeslots.push({...timeslots[i], profileEnd: String(event.target.value)+":"+asignedTimeslot.profileEnd.split(":")[1]});
          index = i;
        }else{
          if(index!==null){
            newTimeslots.push({...timeslots[index+1], profileStart: String(event.target.value)+":"+timeslots[index].profileEnd.split(":")[1]});
            index = null;
        }
          newTimeslots.push({...timeslots[i]})
        }
    }
    sortTimeslots(newTimeslots)
  };
  const handleSetMinutesTo = (event: SelectChangeEvent) => {
    setMinutesTo(String(event.target.value)); //event.target.value as string buvo
    const newTimeslots: any[] = []
    let index: number|null =null;
    for(let i =0 ; i<timeslots.length; i++){
        if(asignedTimeslot.id === timeslots[i].id){
          newTimeslots.push({...timeslots[i], profileEnd: asignedTimeslot.profileEnd.split(":")[0] +":"+ String(event.target.value)});
          index = i;
        }else{
          if(index!==null){
            newTimeslots.push({...timeslots[index+1], profileStart: asignedTimeslot.profileEnd.split(":")[0] +":"+ String(event.target.value)});
            index = null;
        }
          newTimeslots.push({...timeslots[i]})
        }
    }
    sortTimeslots(newTimeslots)
  };

  //netaip darai seni yra lentele pasidares esi reduserije tai pagal ja ir padarysi nes ten i back edna ne laika o skaiciu tik nusiust reike xD
  return (
    <Grid container className={classes.main} direction={breakpoint ? "column" : "row"} justifyContent="center" alignItems="center">
      <Grid item container xs={6} className={classes.from} direction="column" justifyContent="center" alignItems="flex-start">
        {/* <Grid item className={classes.textLabel}>From: </Grid> */}
        <Grid item container direction="row" justifyContent="flex-start" alignItems="center">
          <Grid item>
            <FormControl sx={{ m: 1, maxWidth: 120 }} size="small">
              <InputLabel id="demo-select-small">From</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={hoursFrom}
                label="HoursFrom"
                onChange={handleSetHoursFrom}
                className={classes.labelHours}
                inputProps={{
                  classes: {
                    icon: classes.icon,
                      },
                  }}
              >
                {hours.map((hour)=>{
                  return(
                    <MenuItem value={hour < 10 ? "0"+hour : hour}>{hour < 10 ? "0"+hour : hour}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item className={classes.textLabel}>:</Grid>
          <Grid item>
            <FormControl sx={{ m: 1, maxWidth: 120 }} size="small">
              {/* <InputLabel id="demo-select-small">Minutes</InputLabel> */}
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={minutesFrom}
                // label="minutesFrom"
                onChange={handleSetMinutesFrom}
                className={classes.labelMinutes}
                inputProps={{
                  classes: {
                    icon: classes.icon,
                      },
                  }}
              >
                {minutes.map((minutes)=>{
                  return(
                    <MenuItem value={minutes < 15 ? "0"+minutes : minutes}>{minutes < 15 ? "0"+minutes : minutes}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container xs={6} className={classes.to} direction="column" justifyContent="flex-start" alignItems="flex-start">
        {/* <Grid item className={classes.textLabel}>To: </Grid> */}
        <Grid item container direction="row" justifyContent="flex-start" alignItems="center">
          <Grid item>
            <FormControl sx={{ m: 1, maxWidth: 120 }} size="small">
              <InputLabel id="demo-select-small">To</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={hoursTo}
                label="HoursTo"
                onChange={handleSetHoursTo}
                className={classes.labelHours}
                inputProps={{
                  classes: {
                    icon: classes.icon,
                      },
                  }}
              >
                {hours.map((hour)=>{
                  return(
                    <MenuItem value={hour < 10 ? "0"+hour : hour}>{hour < 10 ? "0"+hour : hour}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item className={classes.textLabel}>:</Grid>
          <Grid item>
            <FormControl sx={{ m: 1, maxWidth: 120 }} size="small">
              {/* <InputLabel id="demo-select-small">Minutes</InputLabel> */}
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={minutesTo}
                // label="MinutesTo"
                onChange={handleSetMinutesTo}
                className={classes.labelMinutes}
                inputProps={{
                  classes: {
                    icon: classes.icon,
                      },
                  }}
              >
                {minutes.map((minutes)=>{
                  return(
                    <MenuItem value={minutes < 15 ? "0"+minutes : minutes}>{minutes < 15 ? "0"+minutes : minutes}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default TimeslotPeriodFromTo