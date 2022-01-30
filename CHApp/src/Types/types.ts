
interface priceData {
    export_price: { value: number, type: string},
    import_price: { value: number, type: string},
    interval: { start: string, end: string}
};

interface electricityConsumtpion {
    consumption: { type: string, value: number},
    interval: { start: string, end: string},
};

interface batteryData {
    action: number,
    battery_level: {start: number, end: number},
    cost: { optimised: number, standard: number},
    interval: {start: string, end: string},
    type: string,
}


export default interface chartDataType {
    priceData: priceData[],
    electricityConsumption: electricityConsumtpion[],
    batteryData: batteryData[],
};