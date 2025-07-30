import { BaseIndicator } from '@base/base-indicator';
import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength, pineSource } from '@utils/pine-script-utils';
export class WilliamsR extends BaseIndicator {
    constructor() {
        super('WilliamsR', 'Williams %R', 'momentum');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        // Validate source but don't use the result
        pineSource(data, config?.source);
        const length = pineLength(config?.length || DEFAULT_LENGTHS.WILLIAMS_R, DEFAULT_LENGTHS.WILLIAMS_R);
        const values = this.calculateWilliamsR(data, length);
        return {
            values,
            metadata: {
                length,
                source: config?.source || 'close'
            }
        };
    }
    calculateWilliamsR(data, length) {
        const result = [];
        for (let i = 0; i < data.close.length; i++) {
            if (i < length - 1) {
                result.push(NaN);
                continue;
            }
            const highSlice = data.high.slice(i - length + 1, i + 1);
            const lowSlice = data.low.slice(i - length + 1, i + 1);
            const highestHigh = Math.max(...highSlice);
            const lowestLow = Math.min(...lowSlice);
            const currentClose = data.close[i];
            const williamsR = ((highestHigh - currentClose) / (highestHigh - lowestLow)) * -100;
            result.push(williamsR);
        }
        return result;
    }
}
export function williamsR(data, length, source) {
    return createIndicatorWrapper(WilliamsR, data, length, source);
}
//# sourceMappingURL=williams-r.js.map