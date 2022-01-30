import React, {useState} from 'react';
import './App.css';

// redux
import {useSelector, useDispatch} from 'react-redux'
import { initializeData } from './Redux-reducers/dataReducer';


//types

import chartDataType from './Types/types'

const App: React.FC = () => {
  const chartData: chartDataType = useSelector((state: any) => state.chartData);

  const dispatch = useDispatch()

  const getData = () => {
    dispatch(initializeData())
  }

  return (
    <div className="App">
          <h1>CHAI</h1>
          <button onClick={()=>{getData()}}>Get data</button>
          <button onClick={()=>{console.log(chartData)}}>check state</button>
    </div>
  );
};

export default App;
