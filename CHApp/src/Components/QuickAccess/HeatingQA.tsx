import React, {useState} from 'react';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Box, Divider, AppBar, Toolbar, IconButton, Stack, Link} from '@mui/material/';



// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';


//components



// Styles 
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider:{
      "&.MuiDivider-root": {
        "&::before": {
          borderTop: "medium solid #57CBCC"
        },
        "&::after": {
          borderTop: "medium solid #57CBCC"
        }
      },
    },
    container:{
      height: '160px',
      minWidth: '90%',
      borderRadius: '25px'
    },
  }),
);

const HeatingQA: React.FC = () => {

  const [drawerOpenState, setDrawerOpenState] = useState<boolean>(false)
    const classes = useStyles();
    const dispatch = useDispatch()

//   const getData = () => {
//     dispatch(initializeData())
//   }

  return (
    <div>
      <Divider className={classes.divider} textAlign='left'><b>Heating</b></Divider>
      <Box className={classes.container} bgcolor="background.default">
        currently 27 celsius
      </Box>
    </div>
  );
};

export default HeatingQA;
