import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import dayjs from 'dayjs';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {Grid, Button} from '@mui/material/';


//services
import services from '../../Services/services';


// Styles 
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      margin:'5px'
    },
    underLine: {
        width: '35px',
        height: '2px',
        backgroundColor: '#57CBCC',
        borderRadius: 18,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
  }),
);

const NavBarBottom: React.FC<{homeLabel:string|null}> = ({homeLabel}) => {

    const cases = ['Schedule', 'Profiles', 'Notifications'];
    const location = useLocation();
    const { search } = useLocation();
    const navigate = useNavigate();
    const classes = useStyles();
    

    const handleChange = (eachCase:any) => {
      const now = dayjs()
      if(homeLabel && eachCase !== "Home"){
        services.addLogEntry(homeLabel, now.toISOString(), 'TAB_CHANGE', [eachCase])
      }
      navigate(`${eachCase === "Home" ? "/" + search : eachCase + search}`)
    };

  return (
    <div>
        <Grid className={classes.root} container direction="row" justifyContent="center" alignItems="center">
            {cases.map((eachCase)=>{
                return (
                    <Grid item >
                        <Button size='small' color="inherit" onClick={()=>{handleChange(eachCase)}}> {(location.pathname === "/" && eachCase=== "Home") ? <b>{eachCase}</b> : location.pathname !== "/"+eachCase ? eachCase : <b>{eachCase}</b>}</Button>
                        {(location.pathname === "/" && eachCase === "Home") ? <div className={classes.underLine}></div> : location.pathname.split("/")[1] !== eachCase ? null : <div className={classes.underLine}></div> }
                    </Grid>
                )
            })}
        </Grid>
    </div>
  );
};

export default NavBarBottom;
