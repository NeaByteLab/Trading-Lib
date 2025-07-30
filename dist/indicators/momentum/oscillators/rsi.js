import { BaseIndicator } from '@base/base-indicator';
import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { calculateRSI } from '@utils/calculation-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength, pineSource } from '@utils/pine-script-utils';
export class RSI extends BaseIndicator {
    constructor() {
        super('RSI', 'Relative Strength Index', 'momentum');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const source = pineSource(data, config?.source);
        const length = pineLength(config?.length || DEFAULT_LENGTHS.RSI, DEFAULT_LENGTHS.RSI);
        const values = calculateRSI(source, length);
        return {
            values,
            metadata: {
                length,
                source: config?.source || 'close'
            }
        };
    }
}
export function rsi(data, length, source) {
    return createIndicatorWrapper(RSI, data, length, source);
}
//# sourceMappingURL=rsi.js.map