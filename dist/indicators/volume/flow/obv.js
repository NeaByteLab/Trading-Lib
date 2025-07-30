import { BaseIndicator } from '@base/base-indicator';
import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength, pineSource } from '@utils/pine-script-utils';
export class OBV extends BaseIndicator {
    constructor() {
        super('OBV', 'On Balance Volume', 'volume');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        // Validate source but don't use the result
        pineSource(data, config?.source);
        const length = pineLength(config?.length || DEFAULT_LENGTHS.OBV, DEFAULT_LENGTHS.OBV);
        const values = this.calculateOBV(data);
        return {
            values,
            metadata: {
                length,
                source: config?.source || 'close'
            }
        };
    }
    calculateOBV(data) {
        if (!data.volume) {
            throw new Error('Volume data is required for OBV calculation');
        }
        const result = [];
        let obv = 0;
        for (let i = 0; i < data.close.length; i++) {
            if (i === 0) {
                obv = data.volume[i];
                result.push(obv);
                continue;
            }
            const currentClose = data.close[i];
            const previousClose = data.close[i - 1];
            const currentVolume = data.volume[i];
            if (currentClose > previousClose) {
                obv += currentVolume;
            }
            else if (currentClose < previousClose) {
                obv -= currentVolume;
            }
            // If close is equal, OBV remains unchanged
            result.push(obv);
        }
        return result;
    }
}
export function obv(data, length, source) {
    return createIndicatorWrapper(OBV, data, length, source);
}
//# sourceMappingURL=obv.js.map