import React, {useState} from 'react';

import { useParams, useNavigate } from 'react-router-dom';


//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid } from '@mui/material/';



// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';
import {setNewHeatingSchedule} from '../../../Redux-reducers/heatingScheduleReducer'


//types
import timeslot from '../../../Types/types';

//components
import Weekday from './Weekday';
import WeekdayPaste from './WeekdayPaste';
import ProgressCircular from '../../ProgressBar/ProgressCircular';
// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      //  boxSizing: 'border-box',
       position: 'relative', //sitas!!!
       width: '100%',
       height: '100%',
    //    border: "10px solid pink",
    //    background: '#CFD8DC',
      //  left: '4%',
      //  top: '10%',
    },
    container:{
        // border: "1px solid pink",
        width: '100%',
        height: '100%',
        //    background: '#CFD8DC',
    },
    weekday:{
        // border: "1px solid lime",
        height: '12%',
        width: '100%',
        // marginTop: '10%',

    },
    saveAndCancelButons:{
        // border: "1px solid lime",
        position:'relative',
        height: '6%',
        top: '2%',
    },
  }),
);

const EditWeekdaySchedule: React.FC = () => {
    const [weekdayScheduleToEdit, setWeekdayScheduleToEdit] = useState<any>(null); //define type

    const classes = useStyles();
    const dispatch = useDispatch()
    const {weekday} = useParams();
    const navigate = useNavigate();
    
    const weekdaySchedule = useSelector((state:any)=>{//define type
      // console.log(state)
      return(
        state.heatingSchedule?.find((weekdaySchedule:any)=>{ //define type
          return weekdaySchedule.weekday.toLowerCase() === weekday?.toLowerCase() ? weekdaySchedule : null
        })
      )
    })

    console.log(weekdaySchedule)


  return (
    //atkreipk demesi i spacing ant container class
    <div className={classes.main}>
       {weekdaySchedule ? `${weekdaySchedule.weekday}`: '404'}
    </div>
  );
};

export default EditWeekdaySchedule;
