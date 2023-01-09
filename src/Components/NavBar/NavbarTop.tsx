import React, {useState} from 'react';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, AppBar, Toolbar, IconButton, Stack, Link, Grid} from '@mui/material/';
  //icons
  import MenuIcon from '@mui/icons-material/Menu';
  import CloseIcon from '@mui/icons-material/Close';
  import SettingsIcon from '@mui/icons-material/Settings';



// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';


//types
import chartDataType from '../../Types/types'

//components
import SwitchButton from '../Buttons/SwitchButton';
import DrawerComponent from './Drawer';


// Styles 
    //Logo
    import Logo from '../../IMG/logo.png'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appbar: {
      // height: '50px',
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
      // height: '50px',
      // width: '500px',
      // border: "2px dashed lime",
      [theme.breakpoints.up('lg')]: {
        display: 'none',
      }
    },
    logo:{
      height: '50px',
      // border: "2px dashed pink",

      [theme.breakpoints.down('lg')]: {
        marginTop: '5px',
        marginLeft: '-35px',
        height: '35px',
      }
    },
    navigationMenuIcons:{
      // height: '35px',
      width: '10px',
      position: 'fixed',
      marginLeft: '15px',
      zIndex: 4,
            // border: "2px dashed pink",
    }
  }),
);

const NavbarTop: React.FC<{handleBackDrop:(event:any) => void, homeLabel:String | null, state:any}> = ({handleBackDrop, homeLabel, state}) => {

  const [drawerOpenState, setDrawerOpenState] = useState<boolean>(false)
    const classes = useStyles();
    const dispatch = useDispatch()

//   const getData = () => {
//     dispatch(initializeData())
//   }

  return (
    <div>
        {/* <AppBar className={classes.appbar} color="transparent" elevation={1} position='fixed'>
          <Toolbar>
            <Stack direction='row' sx={{ flexGrow: 1}}>
              <div className={classes.menuButton}>
                <IconButton size='small' edge='start' color='primary' onClick={() => setDrawerOpenState(!drawerOpenState)}>
                  {drawerOpenState ? <CloseIcon/> : <MenuIcon/> }
                </IconButton>
              </div>
              <IconButton size='small' color='primary'>
                <SettingsIcon/>
              </IconButton>
            </Stack>
            <Link href="/">
              <img className={classes.logo} src={Logo}></img>
            </Link>
          </Toolbar>
        </AppBar> */}
        <Grid container xs={2} sm={1} md={1} lg={1} direction="row" justifyContent="flex-start" className={classes.navigationMenuIcons}>
          <Grid item xs={5} className={classes.menuButton}>
            <IconButton size='medium' edge='start' color='primary' onClick={() => setDrawerOpenState(!drawerOpenState)}>
              {drawerOpenState ? <CloseIcon/> : <MenuIcon/> }
            </IconButton>
          </Grid>
          {/* <Grid item xs={5}>
            <IconButton size='small' color='primary' onClick={handleBackDrop}>
              <SettingsIcon/>
            </IconButton>
          </Grid> */}
        </Grid>
        <Grid container direction="row" justifyContent="flex-end">
          <Grid item xs={3} sm={2} md={1.5} lg={1} className={classes.logoContainer}>
            {/* <Link href="/"> */}
              <img className={classes.logo} src={Logo}></img>
            {/* </Link> */}
          </Grid>
        </Grid>
        <DrawerComponent drawerOpenState={drawerOpenState} homeLabel={homeLabel} state={state}/>
    </div>
  );
};

export default NavbarTop;
