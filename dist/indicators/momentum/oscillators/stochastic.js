import { BaseIndicator } from '@base/base-indicator';
import { movingAverage } from '@calculations/moving-averages';
import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { createMultiResultIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength, pineSource } from '@utils/pine-script-utils';
export class Stochastic extends BaseIndicator {
    constructor() {
        super('Stochastic', 'Stochastic Oscillator', 'momentum');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        // Validate source but don't use the result
        pineSource(data, config?.source);
        const kLength = pineLength(config?.['kLength'] || DEFAULT_LENGTHS.STOCHASTIC, DEFAULT_LENGTHS.STOCHASTIC);
        const dLength = pineLength(config?.['dLength'] || DEFAULT_LENGTHS.STOCHASTIC_D, DEFAULT_LENGTHS.STOCHASTIC_D);
        if (Array.isArray(data)) {
            throw new Error('Stochastic requires OHLC market data');
        }
        const { k, d } = this.calculateStochastic(data, kLength, dLength);
        return {
            values: k,
            metadata: {
                length: kLength,
                kLength,
                dLength,
                source: config?.source || 'close',
                d
            }
        };
    }
    calculateStochastic(data, kLength, dLength) {
        const result = [];
        for (let i = 0; i < data.close.length; i++) {
            if (i < kLength - 1) {
                result.push(NaN);
                continue;
            }
            const highSlice = data.high.slice(i - kLength + 1, i + 1);
            const lowSlice = data.low.slice(i - kLength + 1, i + 1);
            const highestHigh = Math.max(...highSlice);
            const lowestLow = Math.min(...lowSlice);
            const currentClose = data.close[i];
            const k = ((currentClose - lowestLow) / (highestHigh - lowestLow)) * 100;
            result.push(k);
        }
        const k = result;
        const d = movingAverage(k, dLength, 'sma');
        return { k, d };
    }
}
export function stochastic(data, kLength, dLength, source) {
    const result = createMultiResultIndicatorWrapper(Stochastic, data, undefined, source, { kLength, dLength });
    return {
        k: result.values,
        d: result.metadata['d']
    };
}
//# sourceMappingURL=stochastic.js.map