import React, {useState} from 'react';

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
      height: '160px',
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
    label: '17°'
  },
  {
    value: 12,
    label: '17.5°'
  },
  {
    value: 13,
    label: '18°'
  },
  {
    value: 14,
    label: '18.5°'
  },
  {
    value: 15,
    label: '19°'
  },
  {
    value: 16,
    label: '19.5°'
  },
  {
    value: 17,
    label: '20°'
  },
  {
    value: 18,
    label: '20.5°'
  },
  {
    value: 19,
    label: '21°'
  },
  {
    value: 20,
    label: '21.5°'
  },
  {
    value: 21,
    label: '22°'
  },
  {
    value: 22,
    label: '22.5°'
  },
  {
    value: 23,
    label: '23°'
  },
  {
    value: 24,
    label: '23.5°'
  },
  {
    value: 25,
    label: '24°'
  },
  {
    value: 26,
    label: '24.5°'
  },
  {
    value: 27,
    label: '25°'
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

//   function ThumbComponent(props:any) {
//     const { children, className, ...other } = props;
//     const extraClassName =
//       other["data-index"] === 0 ? "first-thumb" : other["data-index"] === 1 ? "second-thumb" : other["data-index"] === 2 ? "third-thumb" : null;
//     return (
//       <SliderThumb {...other} className={clsx(className, extraClassName)} />
//     );
//   }
  
//   const PrettoSlider = styled(Slider)({
//     color: '#52af77',
//     height: 52,
//     '& .MuiSlider-track': {
//       border: 'none',
//     },
//     '& .MuiSlider-thumb': {
//       height: 58,
//       width: 25,
//       backgroundColor: '#57CBCC',
//       border: '2px solid #57CBCC',
//       '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
//         boxShadow: 'inherit',
//       },
//       '&:before': {
//         display: 'none',
//       },
//     },
//     '& .MuiSlider-valueLabel': {
//       lineHeight: 1.2,
//       fontSize: 12,
//       background: 'unset',
//       padding: 0,
//       width: 32,
//       height: 32,
//       borderRadius: '50% 50% 50% 0',
//       backgroundColor: '#52af77',
//       transformOrigin: 'bottom left',
//       transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
//       '&:before': { display: 'none' },
//       '&.MuiSlider-valueLabelOpen': {
//         transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
//       },
//       '& > *': {
//         transform: 'rotate(45deg)',
//       },
//       '& .MuiSlider-mark': {
//         backgroundColor: '#000000',
//         height: 8,
//         width: 1,
//         '&.MuiSlider-markActive': {
//           opacity: 1,
//           backgroundColor: 'currentColor',
//         },
//       },
//     },
//     "&.Mui-disabled": {
//         color: "red"
//       }
//   });

const TemperatureSlider: React.FC = () => {

//   const [value, setValue] = useState<number[]>([11, 20, 27]) 
  const [value, setValue] = useState<number | number[]>(20) //cia sutvarkyti kad nebutu to array is viso
  const minDistance = 10;
  const handleChange1 = (
    event: Event,
    newValue: number | number[], 
    activeThumb: number,
  ) => {
    console.log(activeThumb)
    const minValue = 11
    const maxValue = 27


    if(activeThumb === 0 ) { // prachekinti ar nera array
        if(newValue <= 11 ){
            setValue(minValue)
        }else if (newValue >= 28 ){
            setValue(maxValue)
        } else {
            setValue(newValue)
        }
    }
    // if (!Array.isArray(newValue)) {
    //   return;
    // }

    // if (activeThumb === 0) {
    //     setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    // } else {
    //     setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    // }
    console.log(value)
  };
//   const [value, setValue] = useState<number>(60) 
    const classes = useStyles();
    const dispatch = useDispatch()

//   const getData = () => {
//     dispatch(initializeData())
//   }
// const something = (e:any) => {
//     // if(e.target.value < 24 || e.target.value > 90){
//     //     // setValue(e.target.value)
//     //     console.log(e.target.value)
//     // }
// console.log(e.target.value)

// }
  return (
    <div>
        <IOSSlider
        aria-label="ios slider"
        // defaultValue={value}
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
        }} // cia reike isekstraktint label  o ne value arba paskaiciouti. find funkcija cia pukei tiks
        disabled={false}
        step={1}
        value={value}
        onChange={handleChange1}
        disableSwap
        // min={25}
        max={30}
        />
        {/* <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={20}
        disabled={true}
        /> */}
    </div>
  );
};

export default TemperatureSlider;


// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Slider from '@mui/material/Slider';

// function valuetext(value: number) {
//   return `${value}°C`;
// }

// const minDistance = 0;

// export default function TemperatureSlider() {
//   const [value1, setValue1] = React.useState<number[]>([20, 37, 90]);

//   const handleChange1 = (
//     event: Event,
//     newValue: number | number[],
//     activeThumb: number,
//   ) => {
//     if (!Array.isArray(newValue)) {
//       return;
//     }

//     if (activeThumb === 0) {
//       setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
//     } else {
//       setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
//     }
//   };

//   const [value2, setValue2] = React.useState<number[]>([20, 37]);

//   const handleChange2 = (
//     event: Event,
//     newValue: number | number[],
//     activeThumb: number,
//   ) => {
//     if (!Array.isArray(newValue)) {
//       return;
//     }

//     if (newValue[1] - newValue[0] < minDistance) {
//       if (activeThumb === 0) {
//         const clamped = Math.min(newValue[0], 100 - minDistance);
//         setValue2([clamped, clamped + minDistance]);
//       } else {
//         const clamped = Math.max(newValue[1], minDistance);
//         setValue2([clamped - minDistance, clamped]);
//       }
//     } else {
//       setValue2(newValue as number[]);
//     }
//   };

//   return (
//     <Box sx={{ width: 300 }}>
//       <Slider
//         getAriaLabel={() => 'Minimum distance'}
//         value={value1}
//         onChange={handleChange1}
//         valueLabelDisplay="auto"
//         getAriaValueText={valuetext}
//         disableSwap
//       />
//       <Slider
//         getAriaLabel={() => 'Minimum distance shift'}
//         value={value2}
//         onChange={handleChange2}
//         valueLabelDisplay="auto"
//         getAriaValueText={valuetext}
//         disableSwap
//       />
//     </Box>
//   );
// }
