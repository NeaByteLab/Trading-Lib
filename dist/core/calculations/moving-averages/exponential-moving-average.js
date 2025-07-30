import { movingAverage } from './index';
export function exponentialMovingAverage(data, length) {
    return movingAverage(data, length, 'ema');
}
//# sourceMappingURL=exponential-moving-average.js.map