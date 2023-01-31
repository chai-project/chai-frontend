
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
    container:{
        height: '100%',
        width: '100%',
        [theme.breakpoints.down('md')]: {

        }
    },
    logo:{
        height: '150px',
        [theme.breakpoints.down('md')]: {
            marginRight:0,
            height: '100px',
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


  return (
            <Grid container direction="column" justifyContent="center" alignItems="center" className={classes.container}>
                <Grid xs ={3} item container direction="row" justifyContent="flex-end" alignItems="center">
                    <Grid item>
                        <img className={classes.logo} src={Logo}></img>
                    </Grid>
                </Grid>
                <Grid xs={6} item container direction="column" justifyContent="center" alignItems="center" className={classes.error} >
                    <Grid item>
                        <Typography variant="h4"><b>{ErrorMessage ? ErrorMessage : "404, page not found."}</b></Typography>
                    </Grid>
                </Grid>
                <Grid xs={3}item className={classes.empty} ></Grid>
            </Grid>
  );
};

export default ErrorComponent;

  