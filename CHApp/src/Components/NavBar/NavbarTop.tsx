import React, {useState} from 'react';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, AppBar, Toolbar, IconButton, Stack, Link} from '@mui/material/';
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
      zIndex: 2
    },
    drawer:{

    },
    menuButton: {
      [theme.breakpoints.up('lg')]: {
        display: 'none',
      }
    },
    logo:{
      height: '50px',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      }
    }
  }),
);

const NavbarTop: React.FC = () => {

  const [drawerOpenState, setDrawerOpenState] = useState<boolean>(false)
    const classes = useStyles();
    const dispatch = useDispatch()

//   const getData = () => {
//     dispatch(initializeData())
//   }

  return (
    <div>
        <AppBar className={classes.appbar} color="transparent" elevation={0} position='fixed'>
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
        </AppBar>
        <DrawerComponent drawerOpenState={drawerOpenState}/>
    </div>
  );
};

export default NavbarTop;
