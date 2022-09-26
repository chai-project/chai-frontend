import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, AppBar, Toolbar, Grid, Button, IconButton, Stack, Link, Tabs, Tab} from '@mui/material/';
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
        // position: 'absolute',
        // top: '5px',
        // right: '10px',
        margin:'5px' // nutrint jeigu netiks

    },
    underLine: {
        width: '35px',
        height: '2px',
        backgroundColor: '#57CBCC',
        borderRadius: 18,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
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


    // const [value, setValue] = React.useState('Home');

    // const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    //   setValue(newValue);
    //   navigate(newValue)
    // };

//   const getData = () => {
//     dispatch(initializeData())
//   }

  return (
    <div>
        <Grid className={classes.root} container direction="row" justifyContent="center" alignItems="center">
            {cases.map((eachCase)=>{
                return (
                    <Grid item >
                        <Button size='small' color="inherit" onClick={()=>{navigate(`${eachCase === "Home" ? "/" : eachCase}`)}}> {(location.pathname === "/" && eachCase=== "Home") ? <b>{eachCase}</b> : location.pathname !== "/"+eachCase ? eachCase : <b>{eachCase}</b>}</Button>
                        {(location.pathname === "/" && eachCase === "Home") ? <div className={classes.underLine}></div> : location.pathname.split("/")[1] !== eachCase ? null : <div className={classes.underLine}></div> }
                    </Grid>
                )
            })}
        </Grid>
        {/* <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="secondary tabs example"
        >
          {cases.map((eachCase)=> {
            return (
              <Tab value={eachCase} label={eachCase}/>
            )
          })}
        </Tabs> */}
    </div>
  );
};

export default NavBarBottom;

// buvo underline.
//{(location.pathname === "/" && eachCase === "Home") ? <div className={classes.underLine}></div> : location.pathname !== "/"+ eachCase ? null : <div className={classes.underLine}></div> }
