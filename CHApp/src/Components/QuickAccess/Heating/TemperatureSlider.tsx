import React, {useState, useEffect} from 'react';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Box, Divider, Slider, AppBar, Toolbar, IconButton, Stack, Link} from '@mui/material/';
import { styled } from '@mui/material/styles';
import SliderThumb from "@material-ui/core/Slider";
import clsx from "clsx";




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
      height: '80px',
      // top:'10px',
      // position:'relative', 
      minWidth: '90%',
      borderRadius: '25px'
    },
  }),
);

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const marks = [
  {
    value: 11,
    realValue: 17,
    label: '17°'
  },
  {
    value: 12,
    realValue: 17.5,
    label: '17.5°'
  },
  {
    value: 13,
    realValue: 18,
    label: '18°'
  },
  {
    value: 14,
    realValue: 18.5,
    label: '18.5°'
  },
  {
    value: 15,
    realValue: 19,
    label: '19°'
  },
  {
    value: 16,
    realValue: 19.5,
    label: '19.5°'
  },
  {
    value: 17,
    realValue: 20,
    label: '20°'
  },
  {
    value: 18,
    realValue: 20.5,
    label: '20.5°'
  },
  {
    value: 19,
    realValue: 21,
    label: '21°'
  },
  {
    value: 20,
    realValue: 21.5,
    label: '21.5°'
  },
  {
    value: 21,
    realValue: 22,
    label: '22°'
  },
  {
    value: 22,
    realValue: 22.5,
    label: '22.5°'
  },
  {
    value: 23,
    realValue: 23,
    label: '23°'
  },
  {
    value: 24,
    realValue: 23.5,
    label: '23.5°'
  },
  {
    value: 25,
    realValue: 24,
    label: '24°'
  },
  {
    value: 26,
    realValue: 24.5,
    label: '24.5°'
  },
  {
    value: 27,
    realValue: 25,
    label: '25°',
  }
];


const IOSSlider = styled(Slider)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? '#3880ff' : '#3880ff',
    height: 52, // cia aukstis sliderio
    borderRadius: 25,
    padding: '15px 0',
    '& .MuiSlider-thumb': {
      height: 58,
      width: 28, // buvo 25
      borderRadius: 25,
      backgroundColor: '#57CBCC',
      boxShadow: iOSBoxShadow,
    //   zIndex: 10000,
      '&[data-index="0"]' : { // thumb pirmas
        // border: "2px dashed purple",
        // top:'0%'
        // display: 'none !important',
        // visibility: 'hidden'
        // opacity : 0
        // zIndex: 1,
      },
      '&[data-index="2"]' : { //thumb antras ir tt
        // border: "2px dashed green",
        display: 'none',
        // zIndex: 1,
      },
    //   "&.second-thumb": { //kaip ir veike betdabar atsirado extra on top
    //     border: "2px dashed purple"
    //   },
      '&:focus, &:hover, &.Mui-active': {
        boxShadow:
          '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          boxShadow: iOSBoxShadow,
        },
        
      },
    },
    '& .MuiSlider-valueLabel': { // value on the thumb.
      fontSize: 12,
      fontWeight: 'normal',
      top: 43, 
      backgroundColor: 'unset',
      color: theme.palette.text.primary,
      '&:before': {
        display: 'none',
      },
      '& *': {
        background: 'transparent',
        color: theme.palette.mode === 'dark' ? '#fff' : '#000',
      },
    },
    '& .MuiSlider-track': { // spalva pries thumb
      border: 'none',
      borderRadius: '25px 0px 0px 25px',
    //   background: 'linear-gradient(270deg, #57CBCC 0.91%, transparent 92.23%)',
      background: 'transparent'

    },
    '& .MuiSlider-rail': {
      opacity: 1, // buvo 0.5 
      background: 'linear-gradient(270deg, #57CBCC 0.91%, transparent 92.23%)', // cia buvo backgroundColor pakeiciau i backgorund.
    },
    '& .MuiSlider-markLabel':{ // temperature slider labels
        // color: 'red',
        top: '-9%',
        fontSize: 11,
        '&[data-index="1"]' : { //every label thats has .5 in it.
            display: 'none'
          },
          '&[data-index="3"]' : {
            display: 'none'
          },
          '&[data-index="5"]' : {
            display: 'none'
          },
          '&[data-index="7"]' : {
            display: 'none'
          },
          '&[data-index="9"]' : {
            display: 'none'
          },
          '&[data-index="11"]' : {
            display: 'none'
          },
          '&[data-index="13"]' : {
            display: 'none'
          },
          '&[data-index="15"]' : {
            display: 'none'
          },
      },
    '& .MuiSlider-mark': { // temperature  marks
      backgroundColor: '#57CBCC', //spalva po thumbo
      height: '10px',
      width: '2px',
      top: '15%',
      '&[data-index="1"]' : {
        height: '8px',
        top: '16%',
      },
      '&[data-index="3"]' : {
        height: '8px',
        top: '16%',
      },
      '&[data-index="5"]' : {
        height: '8px',
        top: '16%',
      },
      '&[data-index="7"]' : {
        height: '8px',
        top: '16%',
      },
      '&[data-index="9"]' : {
        height: '8px',
        top: '16%',
      },
      '&[data-index="11"]' : {
        height: '8px',
        top: '16%',
      },
      '&[data-index="13"]' : {
        height: '8px',
        top: '16%',
      },
      '&[data-index="15"]' : {
        height: '8px',
        top: '16%',
      },
      '&.MuiSlider-markActive': {
        opacity: 1,
        backgroundColor: '#57CBCC', // spalva pries thumba.
      },
    },
    "&.Mui-disabled": {
        color: "#D0D2D4",
        '& .MuiSlider-rail': { // disabled color
            opacity: 1, // buvo 0.5 
            background: 'linear-gradient(270deg, #D0D2D4 0.91%, transparent 92.23%)', // cia buvo backgroundColor pakeiciau i backgorund.
          },
          '& .MuiSlider-thumb': {
            height: 58,
            width: 25,
            borderRadius: 25,
            backgroundColor: '#D0D2D4',
            boxShadow: iOSBoxShadow,
            '&:focus, &:hover, &.Mui-active': {
              boxShadow:
                '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
              // Reset on touch devices, it doesn't add specificity
              '@media (hover: none)': {
                boxShadow: iOSBoxShadow,
              },
            },
          },
      },
  }));



const TemperatureSlider: React.FC<{targetTemperature: number, setTargetTemperature:any, isSetTargetTemperature: boolean , setIsSetTargetTemperature:any, setRequestTargetTemperature:any}> = (targetTemperature) => {

  const [value, setValue] = useState<number | number[] >(11)
  const classes = useStyles();
  const dispatch = useDispatch()

  useEffect(()=>{
    if(!targetTemperature.isSetTargetTemperature){
        const realValue = marks.find(mark => mark.realValue === targetTemperature.targetTemperature)
        if(realValue){
          setValue(realValue.value)
        }
    }
  },[targetTemperature])
  

  
  
  const minDistance = 10;
  const handleChange1 = (
    event: Event,
    newValue: number | number[], 
    activeThumb: number,
  ) => {
    const minValue = 11
    const maxValue = 27


    if(activeThumb === 0 ) { // prachekinti ar nera array
      let realValue
        if(newValue <= 11 ){
            realValue = marks.find(mark => mark.value === minValue)
            setValue(minValue)
        }else if (newValue >= 28 ){
            realValue = marks.find(mark => mark.value === maxValue)
            setValue(maxValue)
        } else {
            realValue = marks.find(mark => mark.value === newValue)
            setValue(newValue)
        }
        targetTemperature.setRequestTargetTemperature(realValue?.realValue)
        // karocia problema tame, kad uzupdeitina steita ir galu gale daugiau nebeupdeitina todel atnaujina temperatrua i esama po pirmo
        if(realValue?.realValue !== targetTemperature.targetTemperature){
          targetTemperature.setIsSetTargetTemperature(true)
        }else{
          targetTemperature.setIsSetTargetTemperature(false)
        }
        // console.log(realValue, targetTemperature.targetTemperature)
    }
  };

  return (
    <div className={classes.container}>
        <IOSSlider
        aria-label="ios slider"
        defaultValue={value}
        marks={marks}
        valueLabelDisplay="on"
        valueLabelFormat={(value)=> {
            let labelValue
            marks.forEach((mark)=>{
                if(mark.value === value){
                    labelValue = mark.label
                }
            })
            return(
                labelValue
            )
        }}
        disabled={false}
        step={1}
        value={value}
        onChange={handleChange1}
        disableSwap
        // min={25}
        max={30}
        />
    </div>
  );
};

export default TemperatureSlider;


