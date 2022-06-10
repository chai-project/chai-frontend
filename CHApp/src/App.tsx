import React, {useState} from 'react';
import './App.css';

//mui
import { CssBaseline, Button, Paper } from '@mui/material/';


// redux
import {useSelector, useDispatch} from 'react-redux';
import { initializeData } from './Redux-reducers/dataReducer';


// types
import chartDataType from './Types/types'

// components
import MainWindow from './Components/MainWindow';
import QuickAccess from './Components/QuickAccess';
import SwitchButton from './Components/SwitchButton';

// theme
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { dark, light } from './Themes/themes'



const App: React.FC = () => {
  const [theme, setTheme] = useState<boolean>(true)
  const chartData: chartDataType = useSelector((state: any) => state.chartData);

  const dispatch = useDispatch()

  const getData = () => {
    dispatch(initializeData())
  }
  const toogleTheme = () => {
    setTheme(!theme)
  }

  return (
    <ThemeProvider theme={theme ? light : dark}>
      <CssBaseline/>
      <SwitchButton labelLeft='Dark' labelRight="Light" action={()=>{toogleTheme()}}></SwitchButton>
      <Button variant='contained' color='primary' onClick={()=>{toogleTheme()}}>yes</Button>
      <Button variant='contained' color='secondary' onClick={()=>{console.log(theme)}}>no</Button>
      <Paper><h1>h1</h1></Paper>
      <div className="App">
            <MainWindow/>
            <QuickAccess/>
      </div>
    </ThemeProvider>
  );
};

export default App;
