import { BaseIndicator } from '@base/base-indicator';
import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { createMultiResultIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength, pineSource } from '@utils/pine-script-utils';
export class DonchianChannel extends BaseIndicator {
    constructor() {
        super('DonchianChannel', 'Donchian Channel', 'volatility');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        // Validate source but don't use the result
        pineSource(data, config?.source);
        const length = pineLength(config?.length || DEFAULT_LENGTHS.DONCHIAN, DEFAULT_LENGTHS.DONCHIAN);
        const { upper, middle, lower } = this.calculateDonchianChannel(data, length);
        return {
            values: middle,
            metadata: {
                length,
                source: config?.source || 'close',
                upper,
                lower
            }
        };
    }
    calculateDonchianChannel(data, length) {
        const upper = [];
        const middle = [];
        const lower = [];
        for (let i = 0; i < data.close.length; i++) {
            if (i < length - 1) {
                upper.push(NaN);
                middle.push(NaN);
                lower.push(NaN);
                continue;
            }
            const highSlice = data.high.slice(i - length + 1, i + 1);
            const lowSlice = data.low.slice(i - length + 1, i + 1);
            const highestHigh = Math.max(...highSlice);
            const lowestLow = Math.min(...lowSlice);
            const midPoint = (highestHigh + lowestLow) / 2;
            upper.push(highestHigh);
            middle.push(midPoint);
            lower.push(lowestLow);
        }
        return { upper, middle, lower };
    }
}
export function donchianChannel(data, length, source) {
    const result = createMultiResultIndicatorWrapper(DonchianChannel, data, length, source);
    return {
        upper: result.metadata['upper'],
        middle: result.values,
        lower: result.metadata['lower']
    };
}
//# sourceMappingURL=donchian-channel.js.map