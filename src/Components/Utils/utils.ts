
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
      return segment
};




const  areEqualArray = (a:any[], b:any[]) => {

  return JSON.stringify(a) === JSON.stringify(b);
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
  console.log("success")
};


export default {getSegment, areEqualArray, getActiveProfile, refreshState}


