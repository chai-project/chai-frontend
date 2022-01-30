import axios from 'axios';


const baseUrl = 'http://94.237.58.28:8080';


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

export default {getPriceData, getConsumptionData, getBatteryData}