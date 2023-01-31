import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createBrowserHistory } from 'history';
import services from '../../../Services/services'



//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid } from '@mui/material/';



// redux
import {useSelector, useDispatch} from 'react-redux';
import { setNotification, setErrorMessage } from '../../../Redux-reducers/notificationsReducer';
import { initialiseLogs } from '../../../Redux-reducers/logsReducer';
// import { initializeData } from './Redux-reducers/dataReducer';


//types
import profile from '../../../Types/types'
// 

//components
import SelectProfileButton from './SelectProfileButton';
import Profile from './Profile';
import ProgressCircular from '../../ProgressBar/ProgressCircular';
import XaiFeaturesOverlay from './XAI/XaiFeaturesOverlay';
import ConfirmOverlay from './ConfirmOverlay';
import RefreshRequest from '../../RefreshRequest/RefreshRequest';
import { initializeHeatingProfiles, setUserResetProfile } from '../../../Redux-reducers/heatingProfilesReduces';
// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      //  boxSizing: 'border-box',
    //    position: 'relative', //sitas!!!
    //    width: '100%',
       height: '100%',
    //    background: '#CFD8DC',
      //  left: '4%',
      //  top: '10%',
    },
    buttons:{
        // width: '100%',
        // height: '15%',
    //   border: '3px dashed red',

    },
    profileContent:{
        // border: "2px dashed red",
        width: '100%',
        height: '100%',
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
        position: 'relative',
        left: '1%',
        // border: '3px dashed red',
        
        // margin: 'auto',
        // border: "1px solid pink",
        width: '15%',
        // position: 'relative',
        [theme.breakpoints.down('md')]: {
            width: '35%',
          }
    },
    resetProfileButtons:{
        position: 'relative',
        right: '1%',
        // border: '3px dashed red',
        // border: "1px solid yellow",
        width: '50%',
        // position:'relative'
    },
    spaceBetweenButtons:{
        width: '30%',
        [theme.breakpoints.down('md')]: {
            width: '13%'
          }
    },
  }),
);


const Profiles: React.FC<{currentState:any, homeLabel:any}> = ({currentState, homeLabel}) => {
    const [profile, setProfile] = useState<profile|null>(null);
    const [profileToReset, setProfileToReset] = useState<String|null>()
    const [loadingRequestToTheServer, setLoadingRequestToTheServer] = useState<boolean>(false)


    useEffect(()=>{
        if(currentState.heatingProfiles.error){
            dispatch(setErrorMessage(currentState.heatingProfiles.error, 5000))
        }
    },[currentState.heatingProfiles.error])


    const classes = useStyles();
    const dispatch = useDispatch();

    const openConfirmOverlay = (profile:String) => {
        setProfileToReset(profile)
    }
    
    const resetProfileOrAllProfiles = async () => {
        if(homeLabel){
            setLoadingRequestToTheServer(true)
            if(profileToReset === "all"){
                const request = await services.resetAllprofiles(homeLabel)
                if(request === 200){
                    dispatch(setNotification(`All profiles were successfully reset.`, 5000));
                    dispatch(initialiseLogs(homeLabel, null, null))
                    dispatch(setUserResetProfile(true))
                    //update notifications!!!
                    // break;
                }else {
                    dispatch(setErrorMessage(`Server error, failed to reset all profiles.`, 5000));
                }
            }else {
                if(profileToReset === profile?.profileName){
                    const request = await services.resetProfile(homeLabel, profile?.profile)
                    //if 200 ad notification
                    if(request === 200){
                        dispatch(setNotification(`Profile ${profile?.profileName} was successfully reset.`, 5000));
                        dispatch(initialiseLogs(homeLabel, null, null))
                        dispatch(setUserResetProfile(true))
                        //update notifications!!!
                        // break;
                    }else{
                        dispatch(setErrorMessage(`Server error, failed to reset ${profile?.profileName}.`, 5000));
                    }
                }else{
                    dispatch(setErrorMessage(`Profile to reset and selected profile does not match.`, 5000));

                }
            }

        }else{
            dispatch(setErrorMessage(`Incorrect home label`, 5000));
        }
        
        setProfileToReset(null)
        // setConfirmOverlayMessage(null)
        setLoadingRequestToTheServer(false)
    }

    // ()=>{resetSelectedProfile(profile.profile)}
  return (
    <Grid container className={classes.mainContainer}  direction="column" justifyContent="center" alignItems="center" padding={1}>
        {currentState.xaiFeatures.selectedProfile ? <XaiFeaturesOverlay xaiFeaturesState={currentState.xaiFeatures} homeLabel={homeLabel} userChanged={currentState.heatingComponent.userChanged}/> : null }
        {profileToReset ? <ConfirmOverlay profileToReset={profileToReset} setProfileToReset={setProfileToReset} resetProfileOrAllProfiles={resetProfileOrAllProfiles} loadingRequestToTheServer={loadingRequestToTheServer}/> : null }
        {currentState.heatingProfiles.heatingProfiles.length !== 0 ? 
                        <Grid container xs={12} className={classes.container} direction="column" justifyContent="flex-start" alignItems="center" >
                            <Grid xs={1.4} item container className={classes.buttons} direction="row" justifyContent="center" alignItems="center">
                                <Grid item xs={3} className={classes.selectProfileButton}>
                                    {currentState.heatingProfiles.heatingProfiles?
                                        <SelectProfileButton allProfiles={currentState.heatingProfiles.heatingProfiles} profile={profile} setProfile={setProfile}/>
                                    :null}
                                </Grid>
                                {/* <Grid item className={classes.spaceBetweenButtons}></Grid> */}
                                <Grid item xs={9} className={classes.resetProfileButtons} direction="row" justifyContent="flex-end" alignItems="center">
                                    <Grid item container direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
                                        <Grid  item>
                                            {profile? <Button variant="outlined" color='secondary' size='small' onClick={()=>{openConfirmOverlay(profile.profileName)}}>Reset this profile</Button> : null}
                                        </Grid>
                                        <Grid item>
                                            <Button variant="outlined" color='secondary' size='small' onClick={()=>{openConfirmOverlay("all")}}>Reset all profiles</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={10.2} className={classes.profileContent}>
                                {profile ? <Profile profile={profile} homeLabel={homeLabel}/> : <h1>No selected profile. Please select a profile.</h1>}
                            </Grid>
                        </Grid>
                     : 
                        <Grid container className={classes.container} direction="column" justifyContent="center" alignItems="center">
                            <Grid item>
                                {currentState.heatingProfiles.error ? <RefreshRequest showError={"Error"} action={()=>{dispatch(initializeHeatingProfiles(homeLabel))}}/> : <ProgressCircular size={40}/>}
                            </Grid>
                        </Grid>
        }
    </Grid>
  );
};

export default Profiles;

{/* <RefreshRequest showError={"Error"} action={()=>{dispatch(setXaiBandData(homeLabel, xaiFeaturesState.selectedProfile.profile,skipXaiBandData));}}/> */}
