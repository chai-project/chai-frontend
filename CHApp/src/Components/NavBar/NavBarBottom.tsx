import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, AppBar, Toolbar, Grid, Button, IconButton, Stack, Link} from '@mui/material/';
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
    root:{
        position: 'absolute',
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
    },
    button:{
      fontSize:'1px'
    }
  }),
);

const NavBarBottom: React.FC = () => {

    const [drawerOpenState, setDrawerOpenState] = useState<boolean>(false)
    const cases = ['Home', 'Schedule', 'Profiles', 'Notifications'];
    const location = useLocation();
    const navigate = useNavigate();
    const notifications = 15;
    const classes = useStyles();
    const dispatch = useDispatch()


//   const getData = () => {
//     dispatch(initializeData())
//   }

  return (
    <div>
        <Grid container direction="row" justifyContent="center" alignItems="center">
            {cases.map((eachCase)=>{
                return (
                    <Grid item >
                        <Button size='medium' color="inherit" onClick={()=>{navigate(`${eachCase === "Home" ? "/" : eachCase}`)}}> {(location.pathname === "/" && eachCase=== "Home") ? <b>{eachCase}</b> : location.pathname !== "/"+eachCase ? eachCase : <b>{eachCase}</b>}</Button>
                        {(location.pathname === "/" && eachCase === "Home") ? <div className={classes.underLine}></div> : location.pathname.split("/")[1] !== eachCase ? null : <div className={classes.underLine}></div> }
                    </Grid>
                )
            })}
        </Grid>
    </div>
  );
};

export default NavBarBottom;

// buvo underline.
//{(location.pathname === "/" && eachCase === "Home") ? <div className={classes.underLine}></div> : location.pathname !== "/"+ eachCase ? null : <div className={classes.underLine}></div> }
