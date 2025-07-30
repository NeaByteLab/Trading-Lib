import { BaseIndicator } from '@base/base-indicator';
import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength, pineSource } from '@utils/pine-script-utils';
export class VWAP extends BaseIndicator {
    constructor() {
        super('VWAP', 'Volume Weighted Average Price', 'volume');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        // Validate source but don't use the result
        pineSource(data, config?.source);
        const length = pineLength(config?.length || DEFAULT_LENGTHS.VWAP, DEFAULT_LENGTHS.VWAP);
        const values = this.calculateVWAP(data);
        return {
            values,
            metadata: {
                length,
                source: config?.source || 'close'
            }
        };
    }
    calculateVWAP(data) {
        if (!data.volume) {
            throw new Error('Volume data is required for VWAP calculation');
        }
        const result = [];
        let cumulativeTPV = 0; // Total Price * Volume
        let cumulativeVolume = 0;
        for (let i = 0; i < data.close.length; i++) {
            const typicalPrice = (data.high[i] + data.low[i] + data.close[i]) / 3;
            const volume = data.volume[i];
            cumulativeTPV += typicalPrice * volume;
            cumulativeVolume += volume;
            const vwap = cumulativeTPV / cumulativeVolume;
            result.push(vwap);
        }
        return result;
    }
}
export function vwap(data, length, source) {
    return createIndicatorWrapper(VWAP, data, length, source);
}
//# sourceMappingURL=vwap.js.map