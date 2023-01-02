import React, {useState} from 'react';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Box, Divider, Grid, Button, AppBar, Toolbar, IconButton, Stack, Link} from '@mui/material/';
    //icons
    import FileDownloadIcon from '@mui/icons-material/FileDownload';
    import FileUploadIcon from '@mui/icons-material/FileUpload';
    import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';

    import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
    import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
    import LineAxisIcon from '@mui/icons-material/LineAxis';
    import MovingIcon from '@mui/icons-material/Moving';
    import ShowChartIcon from '@mui/icons-material/ShowChart';

    import TrendingDownIcon from '@mui/icons-material/TrendingDown';



// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';


//components



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
    const dispatch = useDispatch()

//   const getData = () => {
//     dispatch(initializeData())
//   }

const changeState = (eachCase: String) => {
    setState(eachCase)
}

  return (
    <div className={classes.root}>
    <Grid container direction="row" justifyContent="center" alignItems="flex-start"> {/* justifycontent flex-end man geriau atrodo zymei */}
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
