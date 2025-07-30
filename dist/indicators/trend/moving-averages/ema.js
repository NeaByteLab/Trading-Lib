import { BaseIndicator } from '@base/base-indicator';
import { movingAverage } from '@calculations/moving-averages';
import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength, pineSource } from '@utils/pine-script-utils';
export class EMA extends BaseIndicator {
    constructor() {
        super('EMA', 'Exponential Moving Average', 'trend');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const source = pineSource(data, config?.source);
        const length = pineLength(config?.length || DEFAULT_LENGTHS.EMA, DEFAULT_LENGTHS.EMA);
        const values = movingAverage(source, length, 'ema');
        return {
            values,
            metadata: {
                length,
                source: config?.source || 'close'
            }
        };
    }
}
export function ema(data, length, source) {
    return createIndicatorWrapper(EMA, data, length, source);
}
//# sourceMappingURL=ema.js.map