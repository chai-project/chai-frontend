import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid } from '@mui/material/';



// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';


//types
import profile from '../../../Types/types'
// 

//components
import SelectProfileButton from './SelectProfileButton';
import Profile from './Profile';
import ProgressCircular from '../../ProgressBar/ProgressCircular';
// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      //  boxSizing: 'border-box',
       position: 'relative', //sitas!!!
       width: '100%',
       height: '100%',
    //    background: '#CFD8DC',
      //  left: '4%',
      //  top: '10%',
    },
    buttons:{
        width: '100%',
        height: '15%',
        // border: "2px dashed green",
    },
    content:{
        // border: "2px dashed lime",
        width: '100%',
        height: '85%',
    },
    container:{
        // border: "2px dashed lime",
        height: '100%',
        width: '100%',
        // position: 'relative'
    },
    selectButton:{
        // border: "2px dashed red",
        height:'72%'
    },
    selectProfileButton:{
        margin: 'auto',
        // border: "1px solid pink",
        width: '15%',
        // position: 'relative',
        [theme.breakpoints.down('md')]: {
            width: '35%',
          }
    },
    resetProfileButtons:{
        // border: "1px solid yellow",
        width: '50%',
        // position:'relative'
    },
    spaceBetweenButtons:{
        width: '30%',
        [theme.breakpoints.down('md')]: {
            width: '13%'
          }
    }
  }),
);


const Profiles: React.FC = () => {
    const [profile, setProfile] = useState<profile|null>(null);

    const allProfiles = useSelector((state:any)=>{
        return(
          state.heatingProfiles
        )
      })

      useEffect(()=>{
        
      },[])

    const classes = useStyles();
    const dispatch = useDispatch()

//   const getData = () => {
//     dispatch(initializeData())
//   }

  return (
    <div className={classes.main}>
        {allProfiles ? 
                        <Grid container className={classes.container} direction="column" justifyContent="flex-start" alignItems="center">
                            <Grid item container className={classes.buttons} direction="row" justifyContent="center" alignItems="center">
                                <Grid item className={classes.selectProfileButton}>
                                    <SelectProfileButton allProfiles={allProfiles} profile={profile} setProfile={setProfile}/>
                                </Grid>
                                <Grid item className={classes.spaceBetweenButtons}></Grid>
                                <Grid item className={classes.resetProfileButtons} direction="row" justifyContent="flex-end" alignItems="center">
                                    <Grid item container direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
                                        <Grid  item>
                                            {profile? <Button variant="outlined" color='secondary' size='small' onClick={()=>{console.log('this profile')}}>Reset this profile</Button> : null}
                                        </Grid>
                                        <Grid item>
                                            <Button variant="outlined" color='secondary' size='small' onClick={()=>{console.log('all profiles')}}>Reset all profiles</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item className={classes.content}>
                                {profile ? <Profile profile={profile}/> : null}
                            </Grid>
                        </Grid>
                     : 
                        <Grid container className={classes.container} direction="column" justifyContent="center" alignItems="center">
                            <Grid item>
                                <ProgressCircular/>
                            </Grid>
                        </Grid>
        }
        {/* <Grid container className={classes.container} direction="column" justifyContent="flex-start" alignItems="center">
            <Grid item container className={classes.buttons} direction="row" justifyContent="center" alignItems="center">
                <Grid item className={classes.selectProfileButton}>
                    <SelectProfileButton allProfiles={allProfiles} profile={profile} setProfile={setProfile}/>
                </Grid>
                <Grid item className={classes.spaceBetweenButtons}></Grid>
                <Grid item className={classes.resetProfileButtons} direction="row" justifyContent="flex-end" alignItems="center">
                    <Grid item container direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
                        <Grid  item>
                            {profile? <Button variant="outlined" color='secondary' size='medium' onClick={()=>{console.log('this profile')}}>Reset this profile</Button> : null}
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color='secondary' size='medium' onClick={()=>{console.log('all profiles')}}>Reset all profiles</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item className={classes.content}>
                {profile ? <Profile profile={profile}/> : null}
            </Grid>
        </Grid> */}
    </div>
  );
};

export default Profiles;
