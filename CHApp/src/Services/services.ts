import axios, {AxiosInstance}  from 'axios';

//token interceptor
const setBearerToken = (token: any) => {
    axios.interceptors.request.use(function (config) {
        
            config.headers!.Authorization = "Bearer "+ token;
    
        return config;
    });
}

//Heating Comonent

const getHeatingComponentData = async () => {
    const request = await axios.get('http://94.237.63.158/heating/mode/?label=test_home').then((res)=>{
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
}


const baseUrl = 'http://94.237.58.28:8080';

//Chart Data
const getPriceData = async () => {
    const request = await axios.get(`${baseUrl}/price`);
     return request.data;
 };

const getConsumptionData = async () => {
    const request = await axios.get(`${baseUrl}/consumption`);
     return request.data;
 };

const getBatteryData = async () => {
    const request = await axios.get(`${baseUrl}/battery`);
     return request.data;
 };

export default {getPriceData, getConsumptionData, getBatteryData, setBearerToken, getHeatingComponentData}