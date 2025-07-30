import { BaseIndicator } from '@base/base-indicator';
import { movingAverage } from '@calculations/moving-averages';
import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { ArrayUtils } from '@utils/array-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength, pineSource } from '@utils/pine-script-utils';
/**
 * Calculate Displaced Moving Average
 *
 * A moving average that is shifted forward or backward in time.
 * Uses numerically stable calculation to prevent error propagation.
 *
 * @param data - Price data array
 * @param length - Calculation period (default: 20)
 * @param displacement - Displacement amount (default: 0)
 * @param maType - Moving average type (default: 'sma')
 * @returns Displaced MA values array
 * @throws {Error} If data is empty or parameters are invalid
 */
function calculateDisplacedMA(data, length = 20, displacement = 0, maType) {
    if (data.length === 0) {
        return [];
    }
    if (!isFinite(displacement)) {
        return Array(data.length).fill(NaN);
    }
    // Based on web search best practices: validate inputs before calculation
    if (data.length < length) {
        return Array(data.length).fill(NaN);
    }
    const ma = movingAverage(data, length, maType);
    // Based on web search best practices: handle edge cases properly
    return ArrayUtils.processArray(data, (_, i) => {
        const sourceIndex = i - displacement;
        // Handle edge cases for displacement
        if (sourceIndex < 0) {
            // For negative displacement (future values), use the first available value
            return ma[0] || NaN;
        }
        else if (sourceIndex >= ma.length) {
            // For displacement beyond available data, use the last available value
            return ma[ma.length - 1] || NaN;
        }
        else {
            const value = ma[sourceIndex];
            if (value !== undefined && isFinite(value)) {
                return value;
            }
            else {
                return NaN;
            }
        }
    });
}
/**
 * Displaced Moving Average Indicator
 *
 * A moving average that is shifted forward or backward in time.
 * Uses numerically stable calculation to prevent error propagation.
 * Useful for trend analysis and signal generation.
 *
 * @example
 * ```typescript
 * const displaced = new DisplacedMovingAverage()
 * const result = displaced.calculate(marketData, { length: 20, displacement: 5 })
 * console.log(result.values) // Displaced MA values
 * ```
 */
export class DisplacedMovingAverage extends BaseIndicator {
    constructor() {
        super('DisplacedMovingAverage', 'Displaced Moving Average', 'trend');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const source = pineSource(data, config?.source);
        const length = pineLength(config?.length || DEFAULT_LENGTHS.SMA, DEFAULT_LENGTHS.SMA);
        const displacement = config?.['displacement'] || 0;
        const maType = config?.['maType'] || 'sma';
        const values = calculateDisplacedMA(source, length, displacement, maType);
        return {
            values,
            metadata: {
                length,
                displacement,
                maType,
                source: config?.source || 'close'
            }
        };
    }
}
/**
 * Calculate Displaced Moving Average values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param displacement - Displacement amount (default: 0)
 * @param maType - Moving average type (default: 'sma')
 * @param source - Price source (default: 'close')
 * @returns Displaced MA values array
 */
export function displaced(data, length, displacement, maType, source) {
    const config = {};
    if (displacement !== undefined) {
        config['displacement'] = displacement;
    }
    if (maType !== undefined) {
        config['maType'] = maType;
    }
    return createIndicatorWrapper(DisplacedMovingAverage, data, length, source, config);
}
