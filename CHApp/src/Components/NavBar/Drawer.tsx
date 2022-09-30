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
      zIndex: 2
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
      minheight: '100vh', //ir cia del scroll barsu!
      // position: 'relative',
      // border: '2px solid red',
      // overflow: 'auto',
      // alignItems: 'center',
      // width: '100vw',

    },
    content: {
      // border: '1px solid pink',
      // position: 'relative',
      // height: '100vh', // cia buvo klaida!!!
      width: '380px',
      boxShadow: "none",
      alignItems: 'center',
      justifyContent:"center",
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
  }),
);

// interface Props { //instead of any in props
//   data:CVE_Item[] | undefined;
//   cveItemsToShow:CVE_Item[] | undefined;
//   setCveItemsToShow:any;
//   drawerOpenState: boolean;
//   dates:string[];
// }


const DrawerComponent: React.FC<any> = (props: any) => {
  const classes = useStyles();
//   const { data, cveItemsToShow, setCveItemsToShow, drawerOpenState, dates, } = props;

  

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
        <Grid container xs={12} direction="column" alignItems="center" justifyContent="center"> {/* //  className={classes.drawerContainer}*/}
          <Grid item className={classes.content}>
            <QuickAccess/>
          </Grid>
        </Grid>
        {/* <div className={classes.drawerContainer}>
          <div className={classes.content}>
            <QuickAccess/>
          </div>
        </div> */}
      </Drawer>
    </div>
  );
}


export default DrawerComponent