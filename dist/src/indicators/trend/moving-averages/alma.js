import { BaseIndicator } from '@base/base-indicator';
import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { ArrayUtils } from '@utils/array-utils';
import { filterFiniteValues } from '@utils/calculation-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { MathUtils } from '@utils/math-utils';
import { pineLength, pineSource } from '@utils/pine-script-utils';
import { validateIndicatorData } from '@utils/validation-utils';
/**
 * Calculate Adaptive Linear Moving Average (ALMA)
 *
 * ALMA = Σ(Price[i] * Weight[i]) / Σ(Weight[i])
 * Weight[i] = exp(-(i - m)² / (2 * s²))
 * Where m = (length - 1) * sigma, s = length / 6
 *
 * @param data - Price data array
 * @param length - ALMA period (default: 9)
 * @param sigma - Sigma parameter for Gaussian filter (default: 6)
 * @returns ALMA values array
 * @throws {Error} If data is empty or parameters are invalid
 */
function calculateALMA(data, length = 9, sigma = 6) {
    if (!data || data.length === 0) {
        throw new Error(ERROR_MESSAGES.EMPTY_DATA);
    }
    if (length <= 0) {
        throw new Error(ERROR_MESSAGES.INVALID_LENGTH);
    }
    if (sigma <= 0) {
        throw new Error(ERROR_MESSAGES.INVALID_SIGMA);
    }
    const m = (length - 1) * (sigma / 6);
    const s = length / 6;
    const weights = ArrayUtils.processArray(Array.from({ length }, (_, i) => i), (_, i) => {
        return MathUtils.exp(-MathUtils.pow(i - m, 2) / (2 * MathUtils.pow(s, 2)));
    });
    return ArrayUtils.processWindow(data, length, (window) => {
        const validValues = filterFiniteValues(window);
        if (validValues.length === 0) {
            return NaN;
        }
        const weightedValues = ArrayUtils.processArray(validValues, (val, i) => val * weights[i]);
        const weightedSum = MathUtils.sum(weightedValues);
        const weightSum = MathUtils.sum(weights.slice(0, validValues.length));
        return weightSum > 0 ? weightedSum / weightSum : NaN;
    });
}
/**
 * ALMA (Adaptive Linear Moving Average) indicator
 *
 * A moving average that uses Gaussian filtering to reduce lag.
 * Formula: ALMA = Σ(Price[i] * Weight[i]) / Σ(Weight[i])
 *
 * @example
 * ```typescript
 * const alma = new ALMA()
 * const result = alma.calculate(marketData, { length: 9, sigma: 6 })
 * console.log(result.values) // ALMA values
 * ```
 */
export class ALMA extends BaseIndicator {
    constructor() {
        super('ALMA', 'Adaptive Linear Moving Average', 'trend');
    }
    validateInput(data, config) {
        validateIndicatorData(data);
        if (config?.length && config.length <= 0) {
            throw new Error(ERROR_MESSAGES.INVALID_LENGTH);
        }
        if (config?.['sigma'] && config['sigma'] <= 0) {
            throw new Error(ERROR_MESSAGES.INVALID_SIGMA);
        }
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const source = pineSource(data, config?.source);
        const length = pineLength(config?.length || 9, 9);
        const sigma = config?.['sigma'] || 6;
        const values = calculateALMA(source, length, sigma);
        return {
            values,
            metadata: {
                length,
                sigma,
                source: config?.source || 'close'
            }
        };
    }
}
/**
 * Calculate Adaptive Linear Moving Average (ALMA)
 *
 * @param data - Market data or price array
 * @param length - ALMA period (default: 9)
 * @param sigma - Sigma parameter for Gaussian filter (default: 6)
 * @param source - Price source (default: 'close')
 * @returns ALMA values array
 */
export function alma(data, length, sigma, source) {
    return createIndicatorWrapper(ALMA, data, length, source, { sigma });
}
