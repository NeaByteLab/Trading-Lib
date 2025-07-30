import { BaseIndicator } from '@base/base-indicator';
import { movingAverage } from '@calculations/moving-averages';
import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength, pineSource } from '@utils/pine-script-utils';
export class Hull extends BaseIndicator {
    constructor() {
        super('Hull', 'Hull Moving Average', 'trend');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const source = pineSource(data, config?.source);
        const length = pineLength(config?.length || DEFAULT_LENGTHS.HULL, DEFAULT_LENGTHS.HULL);
        const values = movingAverage(source, length, 'hull');
        return {
            values,
            metadata: {
                length,
                source: config?.source || 'close'
            }
        };
    }
}
export function hull(data, length, source) {
    return createIndicatorWrapper(Hull, data, length, source);
}
//# sourceMappingURL=hull.js.map