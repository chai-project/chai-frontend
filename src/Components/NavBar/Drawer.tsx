import React from 'react';

//mui 
import { Drawer, Grid } from '@mui/material/';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

//components
import HeatingQATEST from '../QuickAccess/Heating/HeatingQATEST';
import EnergyQA from '../QuickAccess/Energy/EnergyQA';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      [theme.breakpoints.up('lg')]: {

      }
    },
    drawer: {
      width: '100vw',
      flexShrink: 0,
      zIndex: 3
    },
    drawerPaper: {
      height: 'calc(100% - 64px)',
      top: 64,
      width:'100%',
      [theme.breakpoints.up('xs')]: {
        top: 56,
      },
      [theme.breakpoints.up('sm')]: {
        top: 64,
      }
    },
    drawerContainer: {

    },
    content: {
      border: '1px solid pink',
      height: '85%',
      width: '400px',
      boxShadow: "none",
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
        <Grid container xs={12} direction="column" alignItems="center" justifyContent="center" className={classes.drawerContainer} >
          <Grid xs={3} item className={classes.heating} >
            <HeatingQATEST homeLabel={props.homeLabel}/>
          </Grid>
          <Grid xs={3} item className={classes.energy} >
            <EnergyQA/>
          </Grid>
        </Grid>
      </Drawer>
    </div>
  );
}


export default DrawerComponent