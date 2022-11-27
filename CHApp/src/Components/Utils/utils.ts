const getSegment = (slope:any, bias:any) => {
    const priceSensivityBoundaries = (bias:any ) => {
        const finiteIntervals = 4;
        const minSetpoint = 7;
        const maxPrice = 35;
        const upperBound = (bias - minSetpoint) / maxPrice;
        const intervalWidth = upperBound / finiteIntervals;
        let boundaries:any[] = []
  
        for(let i:number = 0; i<finiteIntervals+1; i++  ){
          boundaries.push(intervalWidth*i)
        }
        return boundaries
      };
      let segment = 0
      const boundaries = priceSensivityBoundaries(bias);
      for(let i:number = 0; i<boundaries.length; i++){
        if(-slope >= boundaries[i]){
          segment = i+1
        }
      };

      return segment
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



export default {getSegment, areEqualArray}