import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { BaseIndicator } from '@core/base/base-indicator';
import { movingAverage } from '@core/calculations/moving-averages';
import { ArrayUtils } from '@utils/array-utils';
import { validateIndicatorData } from '@utils/validation-utils';
/**
 * Calculate Price Envelope
 *
 * Creates upper and lower envelopes around a moving average
 * based on a specified deviation percentage. Useful for
 * identifying overbought and oversold conditions.
 *
 * @param data - Market data or price array
 * @param length - Moving average period
 * @param deviation - Deviation percentage from moving average
 * @returns Object with upper, middle, and lower envelope values
 * @throws {Error} If data is invalid or parameters are out of range
 *
 * @example
 * ```typescript
 * const marketData = {
 *   close: [100, 102, 104, 103, 105]
 * }
 * const envelope = priceEnvelope(marketData, 20, 2.5)
 * console.log(envelope.upper) // Upper envelope values
 * console.log(envelope.middle) // Middle line (SMA) values
 * console.log(envelope.lower) // Lower envelope values
 * ```
 */
export function priceEnvelope(data, length = 20, deviation = 2.5) {
    validateIndicatorData(data);
    if (length <= 0) {
        throw new Error(ERROR_MESSAGES.INVALID_LENGTH);
    }
    if (deviation <= 0) {
        throw new Error(ERROR_MESSAGES.INVALID_MULTIPLIER);
    }
    const source = Array.isArray(data) ? data : data.close;
    const middle = movingAverage(source, length, 'sma');
    const deviationMultiplier = deviation / 100;
    const upper = ArrayUtils.processArray(middle, (val) => {
        if (isNaN(val)) {
            return NaN;
        }
        return val * (1 + deviationMultiplier);
    });
    const lower = ArrayUtils.processArray(middle, (val) => {
        if (isNaN(val)) {
            return NaN;
        }
        return val * (1 - deviationMultiplier);
    });
    return { upper, middle, lower };
}
/**
 * Price Envelope Indicator Class
 */
export class PriceEnvelopeIndicator extends BaseIndicator {
    constructor() {
        super('Price Envelope', 'Upper and lower envelopes around moving average', 'trend');
    }
    validateInput(data, config) {
        validateIndicatorData(data);
        const length = config?.length || 20;
        if (length <= 0) {
            throw new Error(ERROR_MESSAGES.INVALID_LENGTH);
        }
        const deviation = config?.['deviation'] || 2.5;
        if (deviation <= 0) {
            throw new Error(ERROR_MESSAGES.INVALID_MULTIPLIER);
        }
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const length = config?.length || 20;
        const deviation = config?.['deviation'] || 2.5;
        const result = priceEnvelope(data, length, deviation);
        return {
            values: result.middle,
            metadata: {
                length,
                deviation,
                upper: result.upper,
                lower: result.lower,
                source: config?.source || 'close'
            }
        };
    }
}
