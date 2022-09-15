import axios, {AxiosInstance}  from 'axios';
const baseURL = 'https://api.project-chai.org'

//token interceptor
const setBearerToken = (token: any) => {
    axios.interceptors.request.use(function (config) {
        
            config.headers!.Authorization = "Bearer "+ token;
    
        return config;
    });
}

//Heating Component

const getHeatingComponentData = async () => {
    const request = await axios.get(`${baseURL}/heating/mode/?label=test_home_kim`).then((res)=>{
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
//Heating schedule

const getHeatingScheduleData = async () => {
    const request = await axios.get(`${baseURL}/schedule/?label=test_home_kim&daymask=127`).then((res)=>{
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

//Heating profiles

const getHeatingProfiles = async () => {
    const request = await axios.get(`${baseURL}/heating/profile/?label=test_home_kim&schema=5`).then((res)=>{
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

export default {getPriceData, getConsumptionData, getBatteryData, setBearerToken, getHeatingComponentData, getHeatingScheduleData, getHeatingProfiles}