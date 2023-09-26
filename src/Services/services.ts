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

const response = await axios.put(
    `${baseURL}/heating/mode/?label=${label}`,
    {
        'mode': `${mode === "override" || mode === "auto" ? 'auto' : mode}`,
        'target': target
    },
    {
        headers: {
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
        return res.status
    }).catch((e)=>{
        console.error(e.errorMessage)
    });
    return response

};

const getHeatingComponentData = async (label:String) => {
    const request = await axios.get(`${baseURL}/heating/mode/?label=${label}`).then((res)=>{
        // console.log('data: ',res.data)
        // console.log('request: ',res.request)
        // console.log('status: ',res.status)
        // console.log('status text: ',res.statusText)
        return res.data
}).catch((error) => {
    console.log('error',error);
    return {error: 'Server error, failed to load heating component data'}
})
    return request
};

// Heating price 

const getAverageHeatingPricePeriod = async (period:any) => {

    const encodedStart = encodeURIComponent(period.start);
    const encodedEnd = encodeURIComponent(period.end);
    const request = await axios.get(`${baseURL}/electricity/prices/?start=${encodedStart}&end=${encodedEnd}`).then((res)=>{
        // console.log('config: ',res.config)
        // console.log('data: ',res.data)
        // console.log('request: ',res.request)
        // console.log('status: ',res.status)
        // console.log('status text: ',res.statusText)
        return res.data
    }).catch((error) => {
        // console.log(error)
        return {error: 'Server error, failed to load heating price data'}
    })
    
    return request

};

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
    return {error: 'Server error, failed to load heating schedule'}

})
    return request
};

const setHeatingSchedule = async (homeLabel:any, mask:any, schedule:any) => { //define types later // need labe over here!!
    
    const response = await axios.put(
        `https://api.project-chai.org/schedule/?label=${homeLabel}&daymask=${mask}`, schedule,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then((res)=>{
            return res.status
    }).catch((e)=>{
            console.error(e.errorMessage)
    });
    //200
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
        // return {error: 'Server error, failed to load profiles data'}
        return res.data
}).catch((error) => {
    return {error: 'Server error, failed to load profiles data'}

})
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

const getLogs = async (label:String, skip:any, limit:any, start:any, end:any, categoryFilter:any) => {
    const system_categories = "VALVE_SET,PROFILE_UPDATE,WELCOME"
    const user_categories = "SETPOINT_MODE,PROFILE_RESET,SCHEDULE_EDIT" 
    const all_categories = categoryFilter.System ? system_categories + (categoryFilter.User ? ',' + user_categories : '') : categoryFilter.User ? user_categories : '';
    const request = await axios.get(`${baseURL}/logs/?label=${label}&category=${all_categories}&skip=${skip}&limit=${limit}&start=${start.toISOString()}&end=${end.toISOString()}`).then((res)=>{ //&start=${start.toISOString()}&end=${end.toISOString()}
        // console.log('config: ',res.config)
        // console.log('data: ',res.data)
        // console.log('request: ',res.request)
        // console.log('status: ',res.status)
        // console.log('status text: ',res.statusText)
        return res.data
    }).catch((error) => {
        return {error: 'Server error, failed to load logs, please try to reload the page.'}

    })
    return request
};

// Log entry for user interation

const addLogEntry = async (homeLabel:string, timestamp:string, category:string, parameters:String[]) => { //define types later // need labe over here!!

    const response = await axios.put(
        `https://api.project-chai.org/logs/?label=${homeLabel}&timestamp=${encodeURIComponent(timestamp)}&category=${category}`, {parameters: parameters},
        {
            headers: {
                'Content-Type': 'application/json'
            }
            }
    ).then((res)=>{
            return res.status
    }).catch((e)=>{
    });
    return response 
};




//XAI features
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
    return {error: "Server error, failed to load data for Chart 1"}
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
    return {error: "Server error, failed to load data for Chart 2 and Chart 4"}
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
    return {error: "Server error, failed to load data for Chart 3"}
})
    return request
};

export default { setBearerToken, getHeatingComponentData, getHeatingScheduleData, getHeatingProfiles, setTemperature, setHeatingDeviceMode, getCurrentHeatingPriceLimit, getAverageHeatingPricePeriod, setHeatingSchedule, getLogs, resetProfile,resetAllprofiles, addLogEntry, getXaiScatterData, getXaiRegionData, getXaiBandData}


