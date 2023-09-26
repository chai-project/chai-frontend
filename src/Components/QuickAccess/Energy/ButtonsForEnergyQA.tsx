import React from 'react';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Grid, Button} from '@mui/material/';

// Styles 
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
        position: 'relative',
        top: '5px',
        right: '10px'
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

const ButtonsForEnergyQA: React.FC<{state:String, setState: any, cases: String[], }> = ({state , setState, cases}) => {

    const classes = useStyles();

    const changeState = (eachCase: String) => {
        setState(eachCase)
    }

  return (
    <div className={classes.root}>
    <Grid container direction="row" justifyContent="center" alignItems="flex-start">
        {cases.map((eachCase)=>{
            return (
                <Grid item >
                    <Button size='small' color="inherit" onClick={()=>{changeState(eachCase)}}>{state !== eachCase ? eachCase : <b>{eachCase}</b>}</Button>
                    {state !== eachCase ? null : <div className={classes.underLine}></div>}
                </Grid>
            )
        })}
    </Grid>
</div>
  );
};

export default ButtonsForEnergyQA;
