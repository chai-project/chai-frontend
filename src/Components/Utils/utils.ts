import {initializeEnergyPriceData} from '../../Redux-reducers/energyPriceDataReducer';
import store from '../../store'



const getSegment = (slope:any, bias:any) => {
    const priceSensivityBoundaries = (bias:any ) => {
        const finiteIntervals = 4;
        const minSetpoint = 12.2; // was 7
        const maxPrice = 35;
        const upperBound = (bias - minSetpoint) / maxPrice;
        const intervalWidth = upperBound / finiteIntervals;
        let boundaries:any[] = []
        if(bias > minSetpoint){
          for(let i:number = 0; i<finiteIntervals+1; i++  ){
            boundaries.push(intervalWidth*i)
          }
        return boundaries
        }else{
          return boundaries
        }
  
        // for(let i:number = 0; i<finiteIntervals+1; i++  ){
        //   boundaries.push(intervalWidth*i)
        // }
        // return boundaries
      };
      let segment:any = 0
      const boundaries = priceSensivityBoundaries(bias);
      if(boundaries.length > 0){
        for(let i:number = 0; i<boundaries.length; i++){
          if(-slope >= boundaries[i]){
            segment = i+1
          }
        };
      }else{
        segment = null
      }
      // for(let i:number = 0; i<boundaries.length; i++){
      //   if(-slope >= boundaries[i]){
      //     segment = i+1
      //   }
      // };
      // console.log(segment,'segment', boundaries.length > 0)
      return segment // segment
    //   0	Negative
    //     1	Very low
    //     2	Low
    //     3	Moderate
    //     4	High
    //     5	Very high
    //   let gaugeValue = segment === 0 ? 0.083333333 : segment === 1 ? 0.25 : segment === 2 ? 0.416666667 : segment === 3 ? 0.416666667 : segment === 4 ? 0.75 : segment === 5 ? 0.916666667 : 0 
    //   let priceSensitivity =  segment === 0 ? "Negative" : segment === 1 ? "Very low" : segment === 2 ? "Low" : segment === 3 ? "Moderate" : segment === 4 ? "High" :  "Very high" 
};




const  areEqualArray = (a:any[], b:any[]) => { //any[]

  return JSON.stringify(a) === JSON.stringify(b);
  // return Array.isArray(a) &&
  //     Array.isArray(b) &&
  //     a.length === b.length &&
  //     a.every((val, index) => val === b[index]);
}

const getActiveProfile = (scheduleListForToday:any )=> {

  if (!scheduleListForToday) {
    return undefined;
  }
  
  const now = new Date();

  const activeProfile = scheduleListForToday.schedule.find((profile:any) => {
    const [startHours, startMinutes] = profile.profileStart.split(':').map(Number);
    const [endHours, endMinutes] = profile.profileEnd.split(':').map(Number);

    const startTime = new Date(now);
    startTime.setHours(startHours, startMinutes, 0);
    const endTime = new Date(now);
    endTime.setHours(endHours, endMinutes, 0);
    
    if (startTime.getTime() <= now.getTime() && now.getTime() < endTime.getTime()) {
      return profile;
    }
  });

  return activeProfile;
};


const refreshState = (homeLabel:any) => {
  // store.dispatch(initializeEnergyPriceData())
  console.log("success")
  // return 'success'

};


export default {getSegment, areEqualArray, getActiveProfile, refreshState}


