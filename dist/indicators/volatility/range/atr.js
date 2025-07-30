import { BaseIndicator } from '@base/base-indicator';
import { averageTrueRange } from '@calculations/volatility/average-true-range';
import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength, pineSource } from '@utils/pine-script-utils';
export class ATR extends BaseIndicator {
    constructor() {
        super('ATR', 'Average True Range', 'volatility');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        // Validate source but don't use the result
        pineSource(data, config?.source);
        const length = pineLength(config?.length || DEFAULT_LENGTHS.ATR, DEFAULT_LENGTHS.ATR);
        const values = averageTrueRange(data, length);
        return {
            values,
            metadata: {
                length,
                source: config?.source || 'close'
            }
        };
    }
}
export function atr(data, length, source) {
    return createIndicatorWrapper(ATR, data, length, source);
}
//# sourceMappingURL=atr.js.map