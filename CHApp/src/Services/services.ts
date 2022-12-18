import axios, {AxiosInstance}  from 'axios';
import { time } from 'console';
const baseURL = 'https://api.project-chai.org';

//token interceptor
const setBearerToken = (token: String, userAuthorizationHeader:String) => {
    axios.interceptors.request.use(function (config) {
        
            config.headers!.Authorization = `Bearer ${token},${userAuthorizationHeader}`;
    
        return config;
    });
};
//Heating Component

const setTemperature = async (label:String, mode: String, target:number) => {
    // console.log(label, mode, target, 'wtf???')
const response = await axios.put(
    `${baseURL}/heating/mode/?label=${label}`,
    // '{"mode": "auto", "target": 21.5}',
    {
        'mode': `${mode === "override" || mode === "auto" ? 'auto' : mode}`,
        'target': target
    },
    {
        headers: {
            // 'Authorization': 'Bearer 8dbb9774-970c-4f9d-8992-65f88e501d0e,b7b100ed0a9e8e54af91ece8',
            'Content-Type': 'application/json'
        }
    }
).then((res)=>{
    return res.status
});
return response
};

const setHeatingDeviceMode = async (label:String, mode:String) => {
    const response = await axios.put(
        `${baseURL}/heating/mode/?label=${label}`,
        {
            'mode': mode,
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then((res)=>{
        console.log(res);
        return res.status
    }).catch((e)=>{
        console.error(e.errorMessage)
    });
    return response

};

const getHeatingComponentData = async (label:String) => {
    const request = await axios.get(`${baseURL}/heating/mode/?label=${label}`).then((res)=>{
        // console.log('config: ',res.config)
        // console.log('data: ',res.data)
        // console.log('request: ',res.request)
        // console.log('status: ',res.status)
        // console.log('status text: ',res.statusText)
        return res.data
}).catch((error) => {
    // console.log('error',error);
    
})
    // console.log(request)
    return request
};

// Heating price 

const getAverageHeatingPricePeriod = async (period:any) => {
    const encodedStart = encodeURIComponent(period.start);
    const encodedEnd = encodeURIComponent(period.end);
    const response = await axios.get(`${baseURL}/electricity/prices/?start=${encodedStart}&end=${encodedEnd}`).then((res)=>{
        return res
    });
    return response.data

};
// getAverageHeatingPricePeriod('2022-10-24T00:00:00+01:00', '2022-10-25T00:00:00+01:00')
const getCurrentHeatingPriceLimit = async () => {

      const response = await axios.get('https://api.project-chai.org/electricity/prices/?limit=1').then((res)=>{
        return res.data
      });
      return response

};

//Heating schedule

const getHeatingScheduleData = async (label:String) => {
    const request = await axios.get(`${baseURL}/schedule/?label=${label}&daymask=127`).then((res)=>{
        // console.log('config: ',res.config)
        // console.log('data: ',res.data)
        // console.log('request: ',res.request)
        // console.log('status: ',res.status)
        // console.log('status text: ',res.statusText)
        // console.log(res.data,'viduje')
        return res.data
}).catch((error) => {
    console.error('error',error);
})
    // console.log(request)
    return request
};

const setHeatingSchedule = async (homeLabel:any, mask:any, schedule:any) => { //define types later // need labe over here!!
    
    const response = await axios.put(
        `https://api.project-chai.org/schedule/?label=${homeLabel}&daymask=${mask}`, schedule
    
                    // '0': 2,
                    // '28':3,
                    // '36':4,
                    // '72':1,
                    // day:1,
                    // [{0: '2'},{14: '1'},{ 26: '2'},{37: '3'},{42: '1'},{48:'2'},{58:'3'},{64:'1'},{72:'5'}]
                    // 0: '2', 28: '1', 36: '4', 72: '3'
        ,
        {
            headers: {
                'Content-Type': 'application/json'
            }
            }
    ).then((res)=>{
            // console.log(res.status);
            return res.status
    }).catch((e)=>{
            // console.error(e.errorMessage)
    });
    return response 
};

//Heating profiles

const getHeatingProfiles = async (label:String) => {
    const request = await axios.get(`${baseURL}/heating/profile/?label=${label}&schema=5`).then((res)=>{
        // console.log('config: ',res.config)
        // console.log('data: ',res.data)
        // console.log('request: ',res.request)
        // console.log('status: ',res.status)
        // console.log('status text: ',res.statusText)
        return res.data
}).catch((error) => {
    console.error('error',error);
})
    // console.log(request)
    return request
}

const resetProfile = async (label:any ,profile:any) => {
    const request = await axios.get(`${baseURL}/profile/reset/?label=${label}&profile=${profile}`).then((res)=>{
        // console.log('config: ',res.config)
        // console.log('data: ',res.data)
        // console.log('request: ',res.request)
        // console.log('status: ',res.status)
        // console.log('status text: ',res.statusText)
        return res.status
}).catch((error) => {
    console.error('error',error);
})
    return request
};

const resetAllprofiles = async (label:any) => {
    const request = await axios.get(`${baseURL}/profile/reset/?label=${label}`).then((res)=>{
        // console.log('config: ',res.config)
        // console.log('data: ',res.data)
        // console.log('request: ',res.request)
        // console.log('status: ',res.status)
        // console.log('status text: ',res.statusText)
        return res.status
}).catch((error) => {
    console.error('error',error);
})
    return request
};


//Logs

const getLogs = async (label:String, skip:any, limit:any, start:any, end:any) => {
    // console.log(start, end)
    const request = await axios.get(`${baseURL}/logs/?label=${label}&category=VALVE_SET%2CSETPOINT_MODE%2CPROFILE_UPDATE%2CPROFILE_RESET%2CSCHEDULE_EDIT&skip=${skip}&limit=${limit}&start=${start.toISOString()}&end=${end.toISOString()}`).then((res)=>{ //&start=${start.toISOString()}&end=${end.toISOString()}
        // console.log('config: ',res.config)
        // console.log('data: ',res.data)
        // console.log('request: ',res.request)
        // console.log('status: ',res.status)
        // console.log('status text: ',res.statusText)
        return res.data
}).catch((error) => {
    console.error('error',error);
})
    // console.log(request)
    return request
};

// Log entry for user interation

const addLogEntry = async (homeLabel:string, timestamp:string, category:string, parameters:String[]) => { //define types later // need labe over here!!
    // console.log(homeLabel, timestamp, category,parameters,'blbl')
    const response = await axios.put(
        `https://api.project-chai.org/logs/?label=${homeLabel}&timestamp=${encodeURIComponent(timestamp)}&category=${category}`, {parameters: parameters},
        {
            headers: {
                'Content-Type': 'application/json'
            }
            }
    ).then((res)=>{
            // console.log(res.status);
            return res.status
    }).catch((e)=>{
            // console.error(e.errorMessage)
    });
    return response 
};

// XAI features
//XAI scatter
const getXaiScatterData = async (label:any, profile:any) => {
    const request = await axios.get(`${baseURL}/xai/scatter/?label=${label}&profile=${profile}`).then((res)=>{
        // console.log('config: ',res.config)
        // console.log('data: ',res.data)
        // console.log('request: ',res.request)
        // console.log('status: ',res.status)
        // console.log('status text: ',res.statusText)
        return res.data
}).catch((error) => {
    console.error('error',error);
})
    return request
};

//XAI region
const getXaiRegionData = async (label:any, profile:any, skip:number) => {
    const request = await axios.get(`${baseURL}/xai/region/?label=${label}&profile=${profile}&skip=${skip}`).then((res)=>{
        // console.log('config: ',res.config)
        // console.log('data: ',res.data)
        // console.log('request: ',res.request)
        // console.log('status: ',res.status)
        // console.log('status text: ',res.statusText)
        return {status: res.status, data: res.data}
}).catch((error) => {
    console.error('error',error);
})
    return request
};

//XAI band
const getXaiBandData = async (label:any, profile:any, skip:number) => {
    const request = await axios.get(`${baseURL}/xai/band/?label=${label}&profile=${profile}&skip=${skip}`).then((res)=>{
        // console.log('config: ',res.config)
        // console.log('data: ',res.data)
        // console.log('request: ',res.request)
        // console.log('status: ',res.status)
        // console.log('status text: ',res.statusText)
        return {status: res.status, data: res.data}
}).catch((error) => {
    console.error('error',error);
})
    return request
};
// getSetpointScheduleChartData('test_home_kim', 2, 0);
// https://api.project-chai.org/xai/region/?label=[label]&profile=1&skip=1'

// https://api.project-chai.org/schedule/?label=test_home_kim&daymask=127


const baseUrlWAS = 'http://94.237.58.28:8080';

//Chart Data
const getPriceData = async () => {
    const request = await axios.get(`${baseUrlWAS}/price`);
     return request.data;
 };

const getConsumptionData = async () => {
    const request = await axios.get(`${baseUrlWAS}/consumption`);
     return request.data;
 };

const getBatteryData = async () => {
    const request = await axios.get(`${baseUrlWAS}/battery`);
     return request.data;
 };

export default {getPriceData, getConsumptionData, getBatteryData, setBearerToken, getHeatingComponentData, getHeatingScheduleData, getHeatingProfiles, setTemperature, setHeatingDeviceMode, getCurrentHeatingPriceLimit, getAverageHeatingPricePeriod, setHeatingSchedule, getLogs, resetProfile,resetAllprofiles, addLogEntry, getXaiScatterData, getXaiRegionData, getXaiBandData}