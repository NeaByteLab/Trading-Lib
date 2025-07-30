import { BaseIndicator } from '@base/base-indicator';
import { movingAverage } from '@calculations/moving-averages';
import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength, pineSource } from '@utils/pine-script-utils';
export class SMA extends BaseIndicator {
    constructor() {
        super('SMA', 'Simple Moving Average', 'trend');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const source = pineSource(data, config?.source);
        const length = pineLength(config?.length || DEFAULT_LENGTHS.SMA, DEFAULT_LENGTHS.SMA);
        const values = movingAverage(source, length, 'sma');
        return {
            values,
            metadata: {
                length,
                source: config?.source || 'close'
            }
        };
    }
}
export function sma(data, length, source) {
    return createIndicatorWrapper(SMA, data, length, source);
}
//# sourceMappingURL=sma.js.map