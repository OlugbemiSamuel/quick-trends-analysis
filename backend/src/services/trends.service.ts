import { calculateTrend } from "../engine/trend.engine.js";


export const analyzeTrendsSerivce = () => {
    const result = calculateTrend();

    return result;

};