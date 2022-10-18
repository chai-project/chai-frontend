
import * as React from 'react';
//MUI
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid, Backdrop } from '@mui/material/';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { dark, light } from '../../Themes/themes'
//redux
import {useSelector, useDispatch} from 'react-redux';
//Styles
    //Logo
    import Logo from '../../IMG/logo.png'
import { Typography } from '@material-ui/core';

  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      margin: 3
    },
    labelLeft: {
      position: 'relative',
      width: '70px',
      opacity: '0.7',
      textAlign:'right',
      // border: '2px solid red',
    },
    labelRight:{
      position: 'relative',
      width: '70px',
      opacity: '0.7',
      textAlign:'left',
      // border: '2px solid red',
    },
    container:{
        height: '100%', //cia buvo height, ir jeigu nuskrolindavau main screen i virsu!
        width: '100%',
        // marginLeft: 'auto',
        // marginRight: 'auto',
        // minHeight:  '840px',
        // width: '100vw',
        // maxWidth: '1400px',
        // overflow: 'hidden',
        // border: "5px dashed purple",
        [theme.breakpoints.down('md')]: {
        //   minHeight:  '100%',
        //   height: '100%',
          // minHeight: '0%',
          // height: '600px',
          // minHeight: '650px',
        }
    },
    logo:{
        // border: "1px dashed lime",
        marginRight:50,
        height: '150px',
        [theme.breakpoints.down('md')]: {
            marginRight:0,
            //   minHeight:  '100%',
              height: '100px',
              // minHeight: '0%',
              // height: '600px',
              // minHeight: '650px',
            }
    },
    error:{
        // border: "1px dashed yellow",
    },
    empty:{
        // border: "1px dashed red",
    }
  }),
);



  const ErrorComponent: React.FC = () => {

    const classes = useStyles();

    const ErrorMessage: String = useSelector((state: any) => state.errorMessageForErrorComponent);

    // console.log('blblblblb', ErrorMessage)

  return (
    // <div className={classes.root}>
            <Grid container direction="column" justifyContent="center" alignItems="center" className={classes.container}>
                <Grid xs ={3} item container direction="row" justifyContent="flex-end" alignItems="center" className={classes.logo}>
                    <Grid item>
                        <img className={classes.logo} src={Logo}></img>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
                <Grid xs={6} item container direction="column" justifyContent="center" alignItems="center" className={classes.error} >
                    <Grid item>
                        <Typography variant="h4"><b>{ErrorMessage ? ErrorMessage : "404, page not found."}</b></Typography>
                    </Grid>
                </Grid>
                <Grid xs={3}item className={classes.empty} ></Grid>
            </Grid>
    // </div>
  );
};

export default ErrorComponent;

  