import React, {useState} from 'react';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, AppBar, Toolbar, IconButton, Stack} from '@mui/material/';
  //icons
  import MenuIcon from '@mui/icons-material/Menu';
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appbar: {
      zIndex: 2
    },
    drawer:{

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
        <AppBar className={classes.appbar} color="transparent" elevation={1} position='fixed'>
          <Toolbar>
            <Stack direction='row' >
              <IconButton size='small' edge='start' color='primary' onClick={() => setDrawerOpenState(!drawerOpenState)}>
                <MenuIcon/>
              </IconButton>
              <IconButton size='small' color='primary'>
                <SettingsIcon/>
              </IconButton>
            </Stack>
          </Toolbar>
        </AppBar>
        <DrawerComponent drawerOpenState={drawerOpenState}/>
    </div>
  );
};

export default NavbarTop;
