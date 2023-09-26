import React, {useState} from 'react';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { IconButton, Grid} from '@mui/material/';
  //icons
  import MenuIcon from '@mui/icons-material/Menu';
  import CloseIcon from '@mui/icons-material/Close';

//components
import DrawerComponent from './Drawer';


// Styles 
    //Logo
    import Logo from '../../IMG/logo.png'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appbar: {
      zIndex: 4
    },
    drawer:{

    },
    menuButton: {
      [theme.breakpoints.up('lg')]: {
        display: 'none',
      }
    },
    logoContainer:{
      position: 'fixed',
      zIndex: 4,
      [theme.breakpoints.up('lg')]: {
        display: 'none',
      }
    },
    logo:{
      height: '50px',
      [theme.breakpoints.down('lg')]: {
        marginTop: '5px',
        marginLeft: '-35px',
        height: '35px',
      }
    },
    navigationMenuIcons:{
      width: '10px',
      position: 'fixed',
      marginLeft: '15px',
      zIndex: 4,
    }
  }),
);

const NavbarTop: React.FC<{handleBackDrop:(event:any) => void, homeLabel:String | null, state:any}> = ({handleBackDrop, homeLabel, state}) => {

  const [drawerOpenState, setDrawerOpenState] = useState<boolean>(false)
  const classes = useStyles();

  return (
    <div>
        <Grid container xs={2} sm={1} md={1} lg={1} direction="row" justifyContent="flex-start" className={classes.navigationMenuIcons}>
          <Grid item xs={5} className={classes.menuButton}>
            <IconButton size='medium' edge='start' color='primary' onClick={() => setDrawerOpenState(!drawerOpenState)}>
              {drawerOpenState ? <CloseIcon/> : <MenuIcon/> }
            </IconButton>
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="flex-end">
          <Grid item xs={3} sm={2} md={1.5} lg={1} className={classes.logoContainer}>
            <img className={classes.logo} src={Logo}></img>
          </Grid>
        </Grid>
        <DrawerComponent drawerOpenState={drawerOpenState} homeLabel={homeLabel} state={state}/>
    </div>
  );
};

export default NavbarTop;
