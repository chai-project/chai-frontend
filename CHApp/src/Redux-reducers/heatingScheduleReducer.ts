import { time } from 'console';
import { weekdays } from 'moment';
import { Dispatch } from 'redux';
import services from '../Services/services';
import {useSelector, useDispatch} from 'react-redux'
import store from '../store';

const timeframes =  [
    {
        "timeframeRepresentation": "0",
        "timeframe": "00:00"
    },
    {
        "timeframeRepresentation": "1",
        "timeframe": "00:15"
    },
    {
        "timeframeRepresentation": "2",
        "timeframe": "00:30"
    },
    {
        "timeframeRepresentation": "3",
        "timeframe": "00:45"
    },
    {
        "timeframeRepresentation": "4",
        "timeframe": "01:00"
    },
    {
        "timeframeRepresentation": "5",
        "timeframe": "01:15"
    },
    {
        "timeframeRepresentation": "6",
        "timeframe": "01:30"
    },
    {
        "timeframeRepresentation": "7",
        "timeframe": "01:45"
    },
    {
        "timeframeRepresentation": "8",
        "timeframe": "02:00"
    },
    {
        "timeframeRepresentation": "9",
        "timeframe": "02:15"
    },
    {
        "timeframeRepresentation": "10",
        "timeframe": "02:30"
    },
    {
        "timeframeRepresentation": "11",
        "timeframe": "02:45"
    },
    {
        "timeframeRepresentation": "12",
        "timeframe": "03:00"
    },
    {
        "timeframeRepresentation": "13",
        "timeframe": "03:15"
    },
    {
        "timeframeRepresentation": "14",
        "timeframe": "03:30"
    },
    {
        "timeframeRepresentation": "15",
        "timeframe": "03:45"
    },
    {
        "timeframeRepresentation": "16",
        "timeframe": "04:00"
    },
    {
        "timeframeRepresentation": "17",
        "timeframe": "04:15"
    },
    {
        "timeframeRepresentation": "18",
        "timeframe": "04:30"
    },
    {
        "timeframeRepresentation": "19",
        "timeframe": "04:45"
    },
    {
        "timeframeRepresentation": "20",
        "timeframe": "05:00"
    },
    {
        "timeframeRepresentation": "21",
        "timeframe": "05:15"
    },
    {
        "timeframeRepresentation": "22",
        "timeframe": "05:30"
    },
    {
        "timeframeRepresentation": "23",
        "timeframe": "05:45"
    },
    {
        "timeframeRepresentation": "24",
        "timeframe": "06:00"
    },
    {
        "timeframeRepresentation": "25",
        "timeframe": "06:15"
    },
    {
        "timeframeRepresentation": "26",
        "timeframe": "06:30"
    },
    {
        "timeframeRepresentation": "27",
        "timeframe": "06:45"
    },
    {
        "timeframeRepresentation": "28",
        "timeframe": "07:00"
    },
    {
        "timeframeRepresentation": "29",
        "timeframe": "07:15"
    },
    {
        "timeframeRepresentation": "30",
        "timeframe": "07:30"
    },
    {
        "timeframeRepresentation": "31",
        "timeframe": "07:45"
    },
    {
        "timeframeRepresentation": "32",
        "timeframe": "08:00"
    },
    {
        "timeframeRepresentation": "33",
        "timeframe": "08:15"
    },
    {
        "timeframeRepresentation": "34",
        "timeframe": "08:30"
    },
    {
        "timeframeRepresentation": "35",
        "timeframe": "08:45"
    },
    {
        "timeframeRepresentation": "36",
        "timeframe": "09:00"
    },
    {
        "timeframeRepresentation": "37",
        "timeframe": "09:15"
    },
    {
        "timeframeRepresentation": "38",
        "timeframe": "09:30"
    },
    {
        "timeframeRepresentation": "39",
        "timeframe": "09:45"
    },
    {
        "timeframeRepresentation": "40",
        "timeframe": "10:00"
    },
    {
        "timeframeRepresentation": "41",
        "timeframe": "10:15"
    },
    {
        "timeframeRepresentation": "42",
        "timeframe": "10:30"
    },
    {
        "timeframeRepresentation": "43",
        "timeframe": "10:45"
    },
    {
        "timeframeRepresentation": "44",
        "timeframe": "11:00"
    },
    {
        "timeframeRepresentation": "45",
        "timeframe": "11:15"
    },
    {
        "timeframeRepresentation": "46",
        "timeframe": "11:30"
    },
    {
        "timeframeRepresentation": "47",
        "timeframe": "11:45"
    },
    {
        "timeframeRepresentation": "48",
        "timeframe": "12:00"
    },
    {
        "timeframeRepresentation": "49",
        "timeframe": "12:15"
    },
    {
        "timeframeRepresentation": "50",
        "timeframe": "12:30"
    },
    {
        "timeframeRepresentation": "51",
        "timeframe": "12:45"
    },
    {
        "timeframeRepresentation": "52",
        "timeframe": "13:00"
    },
    {
        "timeframeRepresentation": "53",
        "timeframe": "13:15"
    },
    {
        "timeframeRepresentation": "54",
        "timeframe": "13:30"
    },
    {
        "timeframeRepresentation": "55",
        "timeframe": "13:45"
    },
    {
        "timeframeRepresentation": "56",
        "timeframe": "14:00"
    },
    {
        "timeframeRepresentation": "57",
        "timeframe": "14:15"
    },
    {
        "timeframeRepresentation": "58",
        "timeframe": "14:30"
    },
    {
        "timeframeRepresentation": "59",
        "timeframe": "14:45"
    },
    {
        "timeframeRepresentation": "60",
        "timeframe": "15:00"
    },
    {
        "timeframeRepresentation": "61",
        "timeframe": "15:15"
    },
    {
        "timeframeRepresentation": "62",
        "timeframe": "15:30"
    },
    {
        "timeframeRepresentation": "63",
        "timeframe": "15:45"
    },
    {
        "timeframeRepresentation": "64",
        "timeframe": "16:00"
    },
    {
        "timeframeRepresentation": "65",
        "timeframe": "16:15"
    },
    {
        "timeframeRepresentation": "66",
        "timeframe": "16:30"
    },
    {
        "timeframeRepresentation": "67",
        "timeframe": "16:45"
    },
    {
        "timeframeRepresentation": "68",
        "timeframe": "17:00"
    },
    {
        "timeframeRepresentation": "69",
        "timeframe": "17:15"
    },
    {
        "timeframeRepresentation": "70",
        "timeframe": "17:30"
    },
    {
        "timeframeRepresentation": "71",
        "timeframe": "17:45"
    },
    {
        "timeframeRepresentation": "72",
        "timeframe": "18:00"
    },
    {
        "timeframeRepresentation": "73",
        "timeframe": "18:15"
    },
    {
        "timeframeRepresentation": "74",
        "timeframe": "18:30"
    },
    {
        "timeframeRepresentation": "75",
        "timeframe": "18:45"
    },
    {
        "timeframeRepresentation": "76",
        "timeframe": "19:00"
    },
    {
        "timeframeRepresentation": "77",
        "timeframe": "19:15"
    },
    {
        "timeframeRepresentation": "78",
        "timeframe": "19:30"
    },
    {
        "timeframeRepresentation": "79",
        "timeframe": "19:45"
    },
    {
        "timeframeRepresentation": "80",
        "timeframe": "20:00"
    },
    {
        "timeframeRepresentation": "81",
        "timeframe": "20:15"
    },
    {
        "timeframeRepresentation": "82",
        "timeframe": "20:30"
    },
    {
        "timeframeRepresentation": "83",
        "timeframe": "20:45"
    },
    {
        "timeframeRepresentation": "84",
        "timeframe": "21:00"
    },
    {
        "timeframeRepresentation": "85",
        "timeframe": "21:15"
    },
    {
        "timeframeRepresentation": "86",
        "timeframe": "21:30"
    },
    {
        "timeframeRepresentation": "87",
        "timeframe": "21:45"
    },
    {
        "timeframeRepresentation": "88",
        "timeframe": "22:00"
    },
    {
        "timeframeRepresentation": "89",
        "timeframe": "22:15"
    },
    {
        "timeframeRepresentation": "90",
        "timeframe": "22:30"
    },
    {
        "timeframeRepresentation": "91",
        "timeframe": "22:45"
    },
    {
        "timeframeRepresentation": "92",
        "timeframe": "23:00"
    },
    {
        "timeframeRepresentation": "93",
        "timeframe": "23:15"
    },
    {
        "timeframeRepresentation": "94",
        "timeframe": "23:30"
    },
    {
        "timeframeRepresentation": "95",
        "timeframe": "23:45"
    },
    {
        "timeframeRepresentation": "96",
        "timeframe": "24:00"
    }
]

const  maskForADay = [
    {
        day: "monday",
        mask: "0000001"
    },
    {
        day: "tuesday",
        mask: "0000010"
    },
    {
        day: "wednesday",
        mask: "0000100"
    },
    {
        day: "thursday",
        mask: "0001000"
    },
    {
        day: "friday",
        mask: "0010000"
    },
    {
        day: "saturday",
        mask: "0100000"
    },
    {
        day: "sunday",
        mask: "1000000"
    }
]




//Heating Component reducer
const heatingScheduleReducer = (state :any = null , action:any) => { //define types
    switch(action.type) {
        case "SET_HEATING_SCHEDULE_DATA":
            return state = action.data;
        case "SET_NEW_HEATING_SCHEDULE":
            return state = state.map((day:any)=>{
                return day.weekday === action.data.weekday ? action.data : day
            })
        default:
            return state
    }
}

export const initializeHeatingSchedule = (label:String) => {
    return async (dispatch : Dispatch, getState:any) => {
        const heatingScheduleData = await services.getHeatingScheduleData(label);
        // console.log(heatingScheduleData,'blblbbl')
        
        let schedule: any[] = [];
        // const timeframes =  [
        //         {
        //             "timeframeRepresentation": "0",
        //             "timeframe": "00:00"
        //         },
        //         {
        //             "timeframeRepresentation": "1",
        //             "timeframe": "00:15"
        //         },
        //         {
        //             "timeframeRepresentation": "2",
        //             "timeframe": "00:30"
        //         },
        //         {
        //             "timeframeRepresentation": "3",
        //             "timeframe": "00:45"
        //         },
        //         {
        //             "timeframeRepresentation": "4",
        //             "timeframe": "01:00"
        //         },
        //         {
        //             "timeframeRepresentation": "5",
        //             "timeframe": "01:15"
        //         },
        //         {
        //             "timeframeRepresentation": "6",
        //             "timeframe": "01:30"
        //         },
        //         {
        //             "timeframeRepresentation": "7",
        //             "timeframe": "01:45"
        //         },
        //         {
        //             "timeframeRepresentation": "8",
        //             "timeframe": "02:00"
        //         },
        //         {
        //             "timeframeRepresentation": "9",
        //             "timeframe": "02:15"
        //         },
        //         {
        //             "timeframeRepresentation": "10",
        //             "timeframe": "02:30"
        //         },
        //         {
        //             "timeframeRepresentation": "11",
        //             "timeframe": "02:45"
        //         },
        //         {
        //             "timeframeRepresentation": "12",
        //             "timeframe": "03:00"
        //         },
        //         {
        //             "timeframeRepresentation": "13",
        //             "timeframe": "03:15"
        //         },
        //         {
        //             "timeframeRepresentation": "14",
        //             "timeframe": "03:30"
        //         },
        //         {
        //             "timeframeRepresentation": "15",
        //             "timeframe": "03:45"
        //         },
        //         {
        //             "timeframeRepresentation": "16",
        //             "timeframe": "04:00"
        //         },
        //         {
        //             "timeframeRepresentation": "17",
        //             "timeframe": "04:15"
        //         },
        //         {
        //             "timeframeRepresentation": "18",
        //             "timeframe": "04:30"
        //         },
        //         {
        //             "timeframeRepresentation": "19",
        //             "timeframe": "04:45"
        //         },
        //         {
        //             "timeframeRepresentation": "20",
        //             "timeframe": "05:00"
        //         },
        //         {
        //             "timeframeRepresentation": "21",
        //             "timeframe": "05:15"
        //         },
        //         {
        //             "timeframeRepresentation": "22",
        //             "timeframe": "05:30"
        //         },
        //         {
        //             "timeframeRepresentation": "23",
        //             "timeframe": "05:45"
        //         },
        //         {
        //             "timeframeRepresentation": "24",
        //             "timeframe": "06:00"
        //         },
        //         {
        //             "timeframeRepresentation": "25",
        //             "timeframe": "06:15"
        //         },
        //         {
        //             "timeframeRepresentation": "26",
        //             "timeframe": "06:30"
        //         },
        //         {
        //             "timeframeRepresentation": "27",
        //             "timeframe": "06:45"
        //         },
        //         {
        //             "timeframeRepresentation": "28",
        //             "timeframe": "07:00"
        //         },
        //         {
        //             "timeframeRepresentation": "29",
        //             "timeframe": "07:15"
        //         },
        //         {
        //             "timeframeRepresentation": "30",
        //             "timeframe": "07:30"
        //         },
        //         {
        //             "timeframeRepresentation": "31",
        //             "timeframe": "07:45"
        //         },
        //         {
        //             "timeframeRepresentation": "32",
        //             "timeframe": "08:00"
        //         },
        //         {
        //             "timeframeRepresentation": "33",
        //             "timeframe": "08:15"
        //         },
        //         {
        //             "timeframeRepresentation": "34",
        //             "timeframe": "08:30"
        //         },
        //         {
        //             "timeframeRepresentation": "35",
        //             "timeframe": "08:45"
        //         },
        //         {
        //             "timeframeRepresentation": "36",
        //             "timeframe": "09:00"
        //         },
        //         {
        //             "timeframeRepresentation": "37",
        //             "timeframe": "09:15"
        //         },
        //         {
        //             "timeframeRepresentation": "38",
        //             "timeframe": "09:30"
        //         },
        //         {
        //             "timeframeRepresentation": "39",
        //             "timeframe": "09:45"
        //         },
        //         {
        //             "timeframeRepresentation": "40",
        //             "timeframe": "10:00"
        //         },
        //         {
        //             "timeframeRepresentation": "41",
        //             "timeframe": "10:15"
        //         },
        //         {
        //             "timeframeRepresentation": "42",
        //             "timeframe": "10:30"
        //         },
        //         {
        //             "timeframeRepresentation": "43",
        //             "timeframe": "10:45"
        //         },
        //         {
        //             "timeframeRepresentation": "44",
        //             "timeframe": "11:00"
        //         },
        //         {
        //             "timeframeRepresentation": "45",
        //             "timeframe": "11:15"
        //         },
        //         {
        //             "timeframeRepresentation": "46",
        //             "timeframe": "11:30"
        //         },
        //         {
        //             "timeframeRepresentation": "47",
        //             "timeframe": "11:45"
        //         },
        //         {
        //             "timeframeRepresentation": "48",
        //             "timeframe": "12:00"
        //         },
        //         {
        //             "timeframeRepresentation": "49",
        //             "timeframe": "12:15"
        //         },
        //         {
        //             "timeframeRepresentation": "50",
        //             "timeframe": "12:30"
        //         },
        //         {
        //             "timeframeRepresentation": "51",
        //             "timeframe": "12:45"
        //         },
        //         {
        //             "timeframeRepresentation": "52",
        //             "timeframe": "13:00"
        //         },
        //         {
        //             "timeframeRepresentation": "53",
        //             "timeframe": "13:15"
        //         },
        //         {
        //             "timeframeRepresentation": "54",
        //             "timeframe": "13:30"
        //         },
        //         {
        //             "timeframeRepresentation": "55",
        //             "timeframe": "13:45"
        //         },
        //         {
        //             "timeframeRepresentation": "56",
        //             "timeframe": "14:00"
        //         },
        //         {
        //             "timeframeRepresentation": "57",
        //             "timeframe": "14:15"
        //         },
        //         {
        //             "timeframeRepresentation": "58",
        //             "timeframe": "14:30"
        //         },
        //         {
        //             "timeframeRepresentation": "59",
        //             "timeframe": "14:45"
        //         },
        //         {
        //             "timeframeRepresentation": "60",
        //             "timeframe": "15:00"
        //         },
        //         {
        //             "timeframeRepresentation": "61",
        //             "timeframe": "15:15"
        //         },
        //         {
        //             "timeframeRepresentation": "62",
        //             "timeframe": "15:30"
        //         },
        //         {
        //             "timeframeRepresentation": "63",
        //             "timeframe": "15:45"
        //         },
        //         {
        //             "timeframeRepresentation": "64",
        //             "timeframe": "16:00"
        //         },
        //         {
        //             "timeframeRepresentation": "65",
        //             "timeframe": "16:15"
        //         },
        //         {
        //             "timeframeRepresentation": "66",
        //             "timeframe": "16:30"
        //         },
        //         {
        //             "timeframeRepresentation": "67",
        //             "timeframe": "16:45"
        //         },
        //         {
        //             "timeframeRepresentation": "68",
        //             "timeframe": "17:00"
        //         },
        //         {
        //             "timeframeRepresentation": "69",
        //             "timeframe": "17:15"
        //         },
        //         {
        //             "timeframeRepresentation": "70",
        //             "timeframe": "17:30"
        //         },
        //         {
        //             "timeframeRepresentation": "71",
        //             "timeframe": "17:45"
        //         },
        //         {
        //             "timeframeRepresentation": "72",
        //             "timeframe": "18:00"
        //         },
        //         {
        //             "timeframeRepresentation": "73",
        //             "timeframe": "18:15"
        //         },
        //         {
        //             "timeframeRepresentation": "74",
        //             "timeframe": "18:30"
        //         },
        //         {
        //             "timeframeRepresentation": "75",
        //             "timeframe": "18:45"
        //         },
        //         {
        //             "timeframeRepresentation": "76",
        //             "timeframe": "19:00"
        //         },
        //         {
        //             "timeframeRepresentation": "77",
        //             "timeframe": "19:15"
        //         },
        //         {
        //             "timeframeRepresentation": "78",
        //             "timeframe": "19:30"
        //         },
        //         {
        //             "timeframeRepresentation": "79",
        //             "timeframe": "19:45"
        //         },
        //         {
        //             "timeframeRepresentation": "80",
        //             "timeframe": "20:00"
        //         },
        //         {
        //             "timeframeRepresentation": "81",
        //             "timeframe": "20:15"
        //         },
        //         {
        //             "timeframeRepresentation": "82",
        //             "timeframe": "20:30"
        //         },
        //         {
        //             "timeframeRepresentation": "83",
        //             "timeframe": "20:45"
        //         },
        //         {
        //             "timeframeRepresentation": "84",
        //             "timeframe": "21:00"
        //         },
        //         {
        //             "timeframeRepresentation": "85",
        //             "timeframe": "21:15"
        //         },
        //         {
        //             "timeframeRepresentation": "86",
        //             "timeframe": "21:30"
        //         },
        //         {
        //             "timeframeRepresentation": "87",
        //             "timeframe": "21:45"
        //         },
        //         {
        //             "timeframeRepresentation": "88",
        //             "timeframe": "22:00"
        //         },
        //         {
        //             "timeframeRepresentation": "89",
        //             "timeframe": "22:15"
        //         },
        //         {
        //             "timeframeRepresentation": "90",
        //             "timeframe": "22:30"
        //         },
        //         {
        //             "timeframeRepresentation": "91",
        //             "timeframe": "22:45"
        //         },
        //         {
        //             "timeframeRepresentation": "92",
        //             "timeframe": "23:00"
        //         },
        //         {
        //             "timeframeRepresentation": "93",
        //             "timeframe": "23:15"
        //         },
        //         {
        //             "timeframeRepresentation": "94",
        //             "timeframe": "23:30"
        //         },
        //         {
        //             "timeframeRepresentation": "95",
        //             "timeframe": "23:45"
        //         },
        //         {
        //             "timeframeRepresentation": "96",
        //             "timeframe": "24:00"
        //         }
        //     ]
        // const profileLabels = ["Nights", "Mornings", "Weekdays", "Evenings", "Weekends"]
        const profileLabels =[
                                {
                                    id:1,
                                    name: "Nights",
                                    color: "#57A6F0"
                                },
                                {
                                    id:2,
                                    name: "Mornings",
                                    color: "#d1ca69"
                                },
                                {
                                    id:3,
                                    name: "Weekdays",
                                    color: "#F6946B" //E3E64E
                                },
                                {
                                    id:4,
                                    name: "Evenings",
                                    color: "#f03cdb"
                                },
                                {
                                    id:5,
                                    name: "Weekends",
                                    color: "#FE6262"
                                },
                            ]
        const findTimeFrame = (timeFrameRepresentation: String) => {
            const actualTimeFrame = timeframes.find((timeframe:any)=>{ //define type later
                if(timeFrameRepresentation === timeframe.timeframeRepresentation){
                    return timeframe
                }
            });
            return actualTimeFrame?.timeframe;
        }
        // console.log(heatingScheduleData)
        heatingScheduleData.forEach((day:any, index:any, self:any)=>{ //define types later
            interface weekdayScheduleType {
                weekday:String,
                id:number,
                schedule: any[],
                // originalScheduleFromBackend: any[]
            }
            let weekdaySchedule:weekdayScheduleType =  {
                weekday: day.day  === 1 ? "Monday" : day.day  === 2 ? "Tuesday" : day.day  === 4 ? "Wednesday" : day.day  === 8 ? "Thursday" : day.day  === 16 ? "Friday" : day.day  === 32 ? "Saturday" : day.day  === 64 ? "Sunday" : day.day ,
                id: index,
                schedule:[],
                // originalScheduleFromBackend: day.schedule
            }
            var i = 0;
            for (const key in day.schedule) {
                if(i === 0 && key !== "0"){ // probalby no need, need to discuss with Kevin and Kim!
                    const emptyTimeslot = {
                        id: i,
                        profileName: Object.values(self[index-1].schedule).pop() === "1" ? profileLabels[1-1].name : Object.values(self[index-1].schedule).pop() === "2" ? profileLabels[2-1].name :Object.values(self[index-1].schedule).pop() === "3" ? profileLabels[3-1].name : Object.values(self[index-1].schedule).pop() === "4" ? profileLabels[4-1].name : profileLabels[5-1].name, //buvo 'Off'
                        profileID: Object.values(self[index-1].schedule).pop() === "1" ? profileLabels[1-1].id : Object.values(self[index-1].schedule).pop() === "2" ? profileLabels[2-1].id :Object.values(self[index-1].schedule).pop() === "3" ? profileLabels[3-1].id : Object.values(self[index-1].schedule).pop() === "4" ? profileLabels[4-1].id : profileLabels[5-1].id,
                        color: Object.values(self[index-1].schedule).pop() === "1" ? profileLabels[1-1].color : Object.values(self[index-1].schedule).pop() === "2" ? profileLabels[2-1].color :Object.values(self[index-1].schedule).pop() === "3" ? profileLabels[3-1].color : Object.values(self[index-1].schedule).pop() === "4" ? profileLabels[4-1].color : profileLabels[5-1].color,
                        profileStart: "00:00",
                        profileEnd: "",
                        temperature: 0
                    };
                    weekdaySchedule.schedule.push(emptyTimeslot);
                    i++;
                };
                const timeslot = {
                    id: i,
                    profileName: profileLabels[day.schedule[key]-1].name,
                    profileID: profileLabels[day.schedule[key]-1].id,
                    color: profileLabels[day.schedule[key]-1].color,
                    profileStart: findTimeFrame(key),
                    profileEnd: "",
                    // temperature: ''
                    // temperature: Math.floor(Math.random() * 25) + 1

                };
                weekdaySchedule.schedule.push(timeslot)
                i++;
            }
            weekdaySchedule.schedule.forEach((timeslot:any, index:any)=>{
                index+1 === weekdaySchedule.schedule.length ? weekdaySchedule.schedule[index].profileEnd = "24:00" : weekdaySchedule.schedule[index].profileEnd = weekdaySchedule.schedule[index+1].profileStart //cia pakeisti kad butu 23:59
            });
            schedule.push(weekdaySchedule);
        });

        const dayOfTheWeek = new Date().getDay();
        const sortedScheduleByTheDay = schedule.slice(dayOfTheWeek-1).concat(schedule.slice(0,dayOfTheWeek-1))
        
        dispatch({
            type:"SET_HEATING_SCHEDULE_DATA",
            data: sortedScheduleByTheDay
        })
    };
};


export const setNewHeatingSchedule = (dayOrDaysToSet:any,newSchedule:any) => { //define type
    // console.log(dayOrDaysToSet,newSchedule,'reducer');
    let initialMAsk = "0000000"
    dayOrDaysToSet.forEach((day:any)=>{
        const maskForThisDay = maskForADay.find((mask:any)=>{return mask.day === day.toLowerCase()});
        if(maskForThisDay){
            for(let i = 0; i<maskForThisDay.mask.length ; i++){
                if(maskForThisDay.mask[i] === '1'){
                    const newMask = initialMAsk.split("");
                    newMask[i] = "1"
                    initialMAsk = newMask.join("")
                }
            }
        }

    });
    const maskToSend = parseInt(  initialMAsk.split('').join(''), 2 )
    const scheduleToSet = newSchedule.map((timeslot:any)=>{
        const timeframe:any = timeframes.find((timeframe:any)=>{return timeframe.timeframe === timeslot.profileStart})?.timeframeRepresentation
        let timeslotObject:any = {}
        timeslotObject[parseInt(timeframe)] = timeslot.profileID.toString()
        return timeslotObject
    })

    // const response = await services.setHeatingSchedule(maskToSend, scheduleToSet)

    // console.log(scheduleToSet,'zeuru!!!!')

    return async (dispatch : Dispatch) => {
        const response = await services.setHeatingSchedule(maskToSend, scheduleToSet)
        if(response === 200) {
            dayOrDaysToSet.forEach((day:any)=>{
                dispatch({
                    type:"SET_NEW_HEATING_SCHEDULE",
                    data: {weekday: day, schedule: newSchedule}
                })
            })
        }
        // else{
        //     // TODO !!!!! set otification that there was an errr
        // }
    };
};

// export const setTemperature = (requestedTemperature:number) => {
//     return async (dispatch : Dispatch) => {
//         dispatch({
//             type:"SET_TEMPERATURE",
//             data: requestedTemperature
//         })
//     };
// };








export default heatingScheduleReducer