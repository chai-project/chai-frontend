import React, {useState, useEffect} from 'react';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Slider} from '@mui/material/';
import { styled } from '@mui/material/styles';


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
      minWidth: '90%',
      borderRadius: '25px'
    },
  }),
);

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const marks = [
  {
    value: 21,
    realValue: 7,
    label: '7'
  },
  {
    value: 22,
    realValue: 7.5,
    label: '7.5'
  },
  {
    value: 23,
    realValue: 8,
    label: '8'
  },
  {
    value: 24,
    realValue: 8.5,
    label: '8.5'
  },
  {
    value: 25,
    realValue: 9,
    label: '9'
  },
  {
    value: 26,
    realValue: 9.5,
    label: '9.5'
  },
  {
    value: 27,
    realValue: 10,
    label: '10'
  },
  {
    value: 28,
    realValue: 10.5,
    label: '10.5'
  },
  {
    value: 29,
    realValue: 11,
    label: '11'
  },
  {
    value: 30,
    realValue: 11.5,
    label: '11.5'
  },
  {
    value: 31,
    realValue: 12,
    label: '12'
  },
  {
    value: 32,
    realValue: 12.5,
    label: '12.5'
  },
  {
    value: 33,
    realValue: 13,
    label: '13'
  },
  {
    value: 34,
    realValue: 13.5,
    label: '13.5'
  },
  {
    value: 35,
    realValue: 14,
    label: '14'
  },
  {
    value: 36,
    realValue: 14.5,
    label: '14.5'
  },
  {
    value: 37,
    realValue: 15,
    label: '15'
  },
  {
    value: 38,
    realValue: 15.5,
    label: '15.5'
  },
  {
    value: 39,
    realValue: 16,
    label: '16'
  },
  {
    value: 40,
    realValue: 16.5,
    label: '16.5',
  },
  {
    value: 41,
    realValue: 17,
    label: '17'
  },
  {
    value: 42,
    realValue: 17.5,
    label: '17.5'
  },
  {
    value: 43,
    realValue: 18,
    label: '18'
  },
  {
    value: 44,
    realValue: 18.5,
    label: '18.5'
  },
  {
    value: 45,
    realValue: 19,
    label: '19'
  },
  {
    value: 46,
    realValue: 19.5,
    label: '19.5'
  },
  {
    value: 47,
    realValue: 20,
    label: '20'
  },
  {
    value: 48,
    realValue: 20.5,
    label: '20.5'
  },
  {
    value: 49,
    realValue: 21,
    label: '21'
  },
  {
    value: 50,
    realValue: 21.5,
    label: '21.5'
  },
  {
    value: 51,
    realValue: 22,
    label: '22'
  },
  {
    value: 52,
    realValue: 22.5,
    label: '22.5'
  },
  {
    value: 53,
    realValue: 23,
    label: '23'
  },
  {
    value: 54,
    realValue: 23.5,
    label: '23.5'
  },
  {
    value: 55,
    realValue: 24,
    label: '24'
  },
  {
    value: 56,
    realValue: 24.5,
    label: '24.5'
  },
  {
    value: 57,
    realValue: 25,
    label: '25',
  },
  {
    value: 58,
    realValue: 25.5,
    label: '25.5'
  },
  {
    value: 59,
    realValue: 26,
    label: '26'
  },
  {
    value: 60,
    realValue: 26.5,
    label: '26.5'
  },
  {
    value: 61,
    realValue: 27,
    label: '27'
  },
  {
    value: 62,
    realValue: 27.5,
    label: '27.5'
  },
  {
    value: 63,
    realValue: 28,
    label: '28'
  },
  {
    value: 64,
    realValue: 28.5,
    label: '28.5'
  },
  {
    value: 65,
    realValue: 29,
    label: '29'
  },
  {
    value: 66,
    realValue: 29.5,
    label: '29.5'
  },
  {
    value: 67,
    realValue: 30,
    label: '30'
  },
];


const IOSSlider = styled(Slider)<{mode:any}>(({ theme, mode }) => ({
    color: theme.palette.mode === 'dark' ? '#3880ff' : '#3880ff',
    height: 52,
    borderRadius: 25,
    padding: '15px 0',
    '& .MuiSlider-thumb': {
      height: 58,
      width: 28,
      borderRadius: 25,
      backgroundColor: mode.heatingAutoMode === "override" ? '#F6946B' : '#57CBCC',
      boxShadow: iOSBoxShadow,
      '&[data-index="0"]' : { // first thumb
        // border: "2px dashed purple",
        // top:'0%'
        // display: 'none !important',
        // visibility: 'hidden'
        // opacity : 0
        // zIndex: 1,
      },
      '&[data-index="2"]' : { 
        display: 'none',
      },
    //   "&.second-thumb": {
    //     border: "2px dashed purple"
    //   },
      '&:focus, &:hover, &.Mui-active': {
        boxShadow:
          '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
        '@media (hover: none)': {
          boxShadow: iOSBoxShadow,
        },
        
      },
    },
    '& .MuiSlider-valueLabel': { 
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
    '& .MuiSlider-track': { 
      border: 'none',
      borderRadius: '25px 0px 0px 25px',
      background: 'transparent'

    },
    '& .MuiSlider-rail': {
      opacity: 1, // buvo 0.5 
      background: mode.heatingAutoMode === "override" ? 'linear-gradient(270deg, #F6946B 0.91%, transparent 92.23%)' :'linear-gradient(270deg, #57CBCC 0.91%, transparent 92.23%)', // cia buvo backgroundColor pakeiciau i backgorund.
    },
    '& .MuiSlider-markLabel':{ // temperature slider labels
        top: '-9%',
        fontSize: 11,
        '&[data-index="1"]' : { //every label thats has .5 in it.
            display: 'none'
          },
          '&[data-index="2"]' : { //every label thats has .5 in it.
            display: 'none'
          },
          '&[data-index="3"]' : {
            display: 'none'
          },
          // '&[data-index="4"]' : {
          //   display: 'none'
          // },
          '&[data-index="5"]' : {
            display: 'none'
          },
          '&[data-index="6"]' : {
            display: 'none'
          },
          '&[data-index="7"]' : {
            display: 'none'
          },
          '&[data-index="8"]' : {
            display: 'none'
          },
          '&[data-index="9"]' : {
            display: 'none'
          },
          // '&[data-index="10"]' : {
          //   display: 'none'
          // },
          '&[data-index="11"]' : {
            display: 'none'
          },
          '&[data-index="12"]' : {
            display: 'none'
          },
          '&[data-index="13"]' : {
            display: 'none'
          },
          '&[data-index="14"]' : {
            display: 'none'
          },
          '&[data-index="15"]' : {
            display: 'none'
          },
          '&[data-index="17"]' : {
            display: 'none'
          },
          '&[data-index="18"]' : {
            display: 'none'
          },
          '&[data-index="19"]' : {
            display: 'none'
          },
          '&[data-index="20"]' : {
            display: 'none'
          },
          '&[data-index="21"]' : {
            display: 'none'
          },
          // '&[data-index="22"]' : {
          //   display: 'none'
          // },
          '&[data-index="23"]' : {
            display: 'none'
          },
          '&[data-index="24"]' : {
            display: 'none'
          },
          '&[data-index="25"]' : {
            display: 'none'
          },
          '&[data-index="26"]' : {
            display: 'none'
          },
          '&[data-index="27"]' : {
            display: 'none'
          },
          // '&[data-index="28"]' : {
          //   display: 'none'
          // },
          '&[data-index="29"]' : {
            display: 'none'
          },
          '&[data-index="30"]' : {
            display: 'none'
          },
          '&[data-index="31"]' : {
            display: 'none'
          },
          '&[data-index="32"]' : {
            display: 'none'
          },
          '&[data-index="33"]' : {
            display: 'none'
          },
          '&[data-index="35"]' : {
            display: 'none'
          },
          '&[data-index="36"]' : {
            display: 'none'
          },
          '&[data-index="37"]' : {
            display: 'none'
          },
          '&[data-index="38"]' : {
            display: 'none'
          },
          '&[data-index="39"]' : {
            display: 'none'
          },
          '&[data-index="41"]' : {
            display: 'none'
          },
          '&[data-index="42"]' : {
            display: 'none'
          },
          '&[data-index="43"]' : {
            display: 'none'
          },
          '&[data-index="44"]' : {
            display: 'none'
          },
          '&[data-index="45"]' : {
            display: 'none'
          },
          '&[data-index="47"]' : {
            display: 'none'
          },
      },
    '& .MuiSlider-mark': { // temperature  marks
      backgroundColor: mode.heatingAutoMode === "override" ? '#F6946B' :'#57CBCC',
      height: '10px',
      width: '1px',
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
      '&[data-index="17"]' : {
        height: '8px',
        top: '16%',
      },
      '&[data-index="19"]' : {
        height: '8px',
        top: '16%',
      },
      '&[data-index="21"]' : {
        height: '8px',
        top: '16%',
      },
      '&[data-index="23"]' : {
        height: '8px',
        top: '16%',
      },
      '&[data-index="25"]' : {
        height: '8px',
        top: '16%',
      },
      '&[data-index="27"]' : {
        height: '8px',
        top: '16%',
      },
      '&[data-index="29"]' : {
        height: '8px',
        top: '16%',
      },
      '&[data-index="31"]' : {
        height: '8px',
        top: '16%',
      },
      '&[data-index="33"]' : {
        height: '8px',
        top: '16%',
      },
      '&[data-index="35"]' : {
        height: '8px',
        top: '16%',
      },
      '&[data-index="37"]' : {
        height: '8px',
        top: '16%',
      },
      '&[data-index="39"]' : {
        height: '8px',
        top: '16%',
      },
      '&[data-index="41"]' : {
        height: '8px',
        top: '16%',
      },
      '&[data-index="43"]' : {
        height: '8px',
        top: '16%',
      },
      '&[data-index="45"]' : {
        height: '8px',
        top: '16%',
      },
      '&.MuiSlider-markActive': {
        opacity: 1,
        backgroundColor: mode.heatingAutoMode === "override" ? '#F6946B' :'#57CBCC', 
      },
    },
    "&.Mui-disabled": {
        color: "#D0D2D4",
        '& .MuiSlider-rail': { // disabled color
            opacity: 1, // buvo 0.5 
            background: 'linear-gradient(270deg, #D0D2D4 0.91%, transparent 92.23%)', 
          },
          '& .MuiSlider-thumb': {
            display: 'none',
            height: 58,
            width: 25,
            borderRadius: 25,
            backgroundColor: '#D0D2D4',
            boxShadow: iOSBoxShadow,
            '&:focus, &:hover, &.Mui-active': {
              boxShadow:
                '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
              '@media (hover: none)': {
                boxShadow: iOSBoxShadow,
              },
            },
          },
          '& .MuiSlider-mark': { // temperature  marks
            backgroundColor: '#D0D2D4',
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
              backgroundColor: '#D0D2D4',
            },
          },
      },
  }));



const TemperatureSlider: React.FC<{ heatingAutoMode:boolean|string, targetTemperature: number, setTargetTemperature:any, isSetTargetTemperature: boolean , setIsSetTargetTemperature:any, setRequestTargetTemperature:any}> = (targetTemperature) => {

  const [value, setValue] = useState<number | number[] >(11) // buvo 11 
  const classes = useStyles();

  useEffect(()=>{
    if(!targetTemperature.isSetTargetTemperature){
        const roundedTemperatureValue = Math.round(targetTemperature.targetTemperature * 2) / 2
        const realValue = marks.find(mark => mark.realValue === roundedTemperatureValue)
        if(realValue){
          setValue(realValue.value)
        }else{
          setValue(11)
        }
    }
  },[targetTemperature])
  

  const handleChange = (
    event: Event,
    newValue: number | number[], 
    activeThumb: number,
  ) => {
    const minValue = 21
    const maxValue = 67


    if(activeThumb === 0 ) {
      let realValue
        if(newValue <= 23){
            realValue = marks.find(mark => mark.value === minValue)
            setValue(minValue)
        }else if (newValue >= 68 ){
            realValue = marks.find(mark => mark.value === maxValue)
            setValue(maxValue)
        } else {
            realValue = marks.find(mark => mark.value === newValue)
            setValue(newValue)
        }
        targetTemperature.setRequestTargetTemperature(realValue?.realValue)
        if(realValue?.realValue !== targetTemperature.targetTemperature){
          targetTemperature.setIsSetTargetTemperature(true)
        }else{
          targetTemperature.setIsSetTargetTemperature(false)
        }
    }
  };

  return (
    <div className={classes.container}>
      <IOSSlider 
        mode={targetTemperature}
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
        disabled={targetTemperature.heatingAutoMode === "auto"  || targetTemperature.heatingAutoMode === "override"  ? false : true}
        step={1}
        value={value}
        onChange={handleChange}
        disableSwap
        // min={25}
        max={70} // 80
      />
    </div>
  );
};

export default TemperatureSlider;

