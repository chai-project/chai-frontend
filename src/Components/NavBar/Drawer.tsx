import React, {useState} from 'react';
// import Drawer from '@material-ui/core/Drawer';
// import List from '@material-ui/core/List';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import ListItem from '@material-ui/core/ListItem';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Checkbox from '@material-ui/core/Checkbox';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Button from '@material-ui/core/Button';
//mui 
import { Paper, Drawer, Grid } from '@mui/material/';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

//components
import QuickAccess from '../QuickAccess/QuickAccess';
import HeatingQATEST from '../QuickAccess/Heating/HeatingQATEST';
import EnergyQA from '../QuickAccess/Energy/EnergyQA';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex', // sita nutrinti jeigu noresi
      [theme.breakpoints.up('lg')]: {
        // display: 'none',
      }
    },
    drawer: {
      width: '100vw',
      // minHeight:'100vh', // nezinau ka cia padariau bet veleu pataisysi nes dabar du scroll barai yra!
      flexShrink: 0,
      zIndex: 3
    },
    drawerPaper: {
      height: 'calc(100% - 64px)',
      top: 64,
      width:'100%', // 
      [theme.breakpoints.up('xs')]: {
        top: 56,
      },
      [theme.breakpoints.up('sm')]: {
        top: 64,
      }
    },
    drawerContainer: {
      // minheight: '100vh', //ir cia del scroll barsu!
      // position: 'relative',
      // border: '2px solid red',
      // overflow: 'hidden',
      // alignItems: 'center',
      // width: '100vw',

    },
    content: {
      border: '1px solid pink',
      // position: 'relative',
      height: '85%', // cia buvo klaida!!!
      width: '400px', // 380px
      boxShadow: "none",
      // alignItems: 'center',
      // justifyContent:"center",
      // left: '50%',
      // top: '50%',
      // WebkitTransform: 'translate(-50%, -50%)',
      // transform: 'translate(-50%, -50%)',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    buttons: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    heating:{
      width: '40%',
      [theme.breakpoints.down('sm')]: {
          width: '70%',
        },
    },
    energy:{
      width: '40%',
      [theme.breakpoints.down('sm')]: {
          width: '70%',
        },
    }
  }),
);



const DrawerComponent: React.FC<any> = (props: any) => {
  const classes = useStyles();

  

  return (
    <div className={classes.root}>
      <Drawer
        anchor="left"
        open={props.drawerOpenState}
        className={classes.drawer}
        variant={!true ? "temporary" : "persistent"}
        transitionDuration={500}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Grid container xs={12} direction="column" alignItems="center" justifyContent="center" className={classes.drawerContainer} > {/* //  className={classes.drawerContainer}*/}
          <Grid xs={3} item className={classes.heating} >
            <HeatingQATEST homeLabel={props.homeLabel}/>
          </Grid>
          <Grid xs={3} item className={classes.energy} >
            <EnergyQA/>
          </Grid>
          {/* <Grid item container direction="row" alignItems="center" justifyContent="center" className={classes.content}> */}
            {/* <QuickAccess homeLabel={props.homeLabel}/> */}
          {/* </Grid> */}
        </Grid>
      </Drawer>
    </div>
  );
}


export default DrawerComponent