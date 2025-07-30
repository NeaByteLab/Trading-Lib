import { BaseIndicator } from '@base/base-indicator';
import { movingAverage } from '@calculations/moving-averages';
import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength, pineSource } from '@utils/pine-script-utils';
export class WMA extends BaseIndicator {
    constructor() {
        super('WMA', 'Weighted Moving Average', 'trend');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const source = pineSource(data, config?.source);
        const length = pineLength(config?.length || DEFAULT_LENGTHS.WMA, DEFAULT_LENGTHS.WMA);
        const values = movingAverage(source, length, 'wma');
        return {
            values,
            metadata: {
                length,
                source: config?.source || 'close'
            }
        };
    }
}
export function wma(data, length, source) {
    return createIndicatorWrapper(WMA, data, length, source);
}
//# sourceMappingURL=wma.js.map