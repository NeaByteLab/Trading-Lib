import { BaseIndicator } from '@base/base-indicator';
import { movingAverage } from '@calculations/moving-averages';
import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { ArrayUtils } from '@utils/array-utils';
import { createMultiResultIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength } from '@utils/pine-script-utils';
/**
 * Calculate Elder Ray Index
 *
 * Elder Ray Index consists of two components: Bull Power and Bear Power.
 * Bull Power = High - EMA(Close)
 * Bear Power = Low - EMA(Close)
 *
 * @param data - Market data with high, low, close arrays
 * @param length - EMA period (default: 13)
 * @returns Elder Ray Index values
 */
function calculateElderRayIndex(data, length = 13) {
    // Validate input data
    if (!data.close || data.close.length === 0 || !data.high || data.high.length === 0 || !data.low || data.low.length === 0) {
        throw new Error(ERROR_MESSAGES.EMPTY_DATA);
    }
    // Use EMA instead of window average for better accuracy
    const ema = movingAverage(data.close, length, 'ema');
    const bullPower = ArrayUtils.processArray(data.high, (high, i) => {
        const emaVal = ema[i];
        if (emaVal === undefined || isNaN(emaVal) || !isFinite(emaVal)) {
            return NaN;
        }
        const result = high - emaVal;
        return isFinite(result) ? result : NaN;
    });
    const bearPower = ArrayUtils.processArray(data.low, (low, i) => {
        const emaVal = ema[i];
        if (emaVal === undefined || isNaN(emaVal) || !isFinite(emaVal)) {
            return NaN;
        }
        const result = low - emaVal;
        return isFinite(result) ? result : NaN;
    });
    return { bullPower, bearPower };
}
/**
 * Elder Ray Index Indicator
 *
 * Consists of Bull Power and Bear Power components that measure buying and selling pressure.
 * Bull Power = High - EMA(Close), Bear Power = Low - EMA(Close)
 * Positive Bull Power indicates buying pressure, negative Bear Power indicates selling pressure.
 *
 * @example
 * ```typescript
 * const elderRay = new ElderRayIndex()
 * const result = elderRay.calculate(marketData, { length: 13 })
 * console.log(result.values) // Bull Power values
 * console.log(result.metadata.bearPower) // Bear Power values
 * ```
 */
export class ElderRayIndex extends BaseIndicator {
    constructor() {
        super('ElderRayIndex', 'Elder Ray Index', 'momentum');
    }
    validateInput(data, _config) {
        if (Array.isArray(data)) {
            throw new Error(ERROR_MESSAGES.MISSING_OHLC);
        }
        if (!data.high || !data.low || !data.close) {
            throw new Error(ERROR_MESSAGES.MISSING_OHLC);
        }
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const length = pineLength(config?.length || 13, 13);
        const { bullPower, bearPower } = calculateElderRayIndex(data, length);
        return {
            values: bullPower,
            metadata: {
                length,
                bearPower,
                source: config?.source || 'close'
            }
        };
    }
}
/**
 * Calculate Elder Ray Index using wrapper function
 *
 * @param data - Market data with high, low, close arrays
 * @param length - EMA period (default: 13)
 * @returns Elder Ray Index values
 */
export function elderRayIndex(data, length = 13) {
    const result = createMultiResultIndicatorWrapper(ElderRayIndex, data, length);
    return {
        bullPower: result.values,
        bearPower: result.metadata['bearPower']
    };
}
