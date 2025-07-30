import { BaseIndicator } from '@base/base-indicator';
import { movingAverage } from '@calculations/moving-averages';
import { ArrayUtils } from '@utils/array-utils';
import { pineLength, pineSource } from '@utils/pine-script-utils';
/**
 * Calculate Moving Average Envelopes
 *
 * Creates bands around a moving average by adding/subtracting a percentage.
 * Formula: Upper = MA + (MA * percentage), Lower = MA - (MA * percentage)
 *
 * @param data - Price data array
 * @param length - Calculation period (default: 20)
 * @param percentage - Envelope percentage (default: 0.025)
 * @param maType - Moving average type (default: 'sma')
 * @returns Object with upper, middle, and lower band arrays
 * @throws {Error} If data is empty or parameters are invalid
 */
function calculateEnvelopes(data, length = 20, percentage = 0.025, maType) {
    if (percentage < 0) {
        throw new Error('Percentage must be positive');
    }
    const middle = movingAverage(data, length, maType);
    const upper = ArrayUtils.processArray(middle, (ma) => {
        if (ma === undefined || isNaN(ma)) {
            return NaN;
        }
        return ma * (1 + percentage);
    });
    const lower = ArrayUtils.processArray(middle, (ma) => {
        if (ma === undefined || isNaN(ma)) {
            return NaN;
        }
        return ma * (1 - percentage);
    });
    return { upper, middle, lower };
}
/**
 * Moving Average Envelopes Indicator
 *
 * Creates bands around a moving average by adding/subtracting a percentage.
 * Formula: Upper = MA + (MA * percentage), Lower = MA - (MA * percentage)
 *
 * @example
 * ```typescript
 * const envelopes = new MovingAverageEnvelopes()
 * const result = envelopes.calculate(marketData, { length: 20, percentage: 0.025 })
 * console.log(result.values) // Middle line values
 * console.log(result.metadata.upper) // Upper band values
 * console.log(result.metadata.lower) // Lower band values
 * ```
 */
export class MovingAverageEnvelopes extends BaseIndicator {
    constructor() {
        super('MovingAverageEnvelopes', 'Moving Average Envelopes', 'trend');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const source = pineSource(data, config?.source);
        const length = pineLength(config?.length || 20, 20);
        const percentage = config?.['percentage'] || 0.025;
        const maType = config?.['maType'] || 'sma';
        if (percentage < 0) {
            throw new Error('Percentage must be positive');
        }
        const { upper, middle, lower } = calculateEnvelopes(source, length, percentage, maType);
        return {
            values: middle,
            metadata: {
                length,
                percentage,
                maType,
                source: config?.source || 'close',
                upper,
                lower
            }
        };
    }
}
/**
 * Calculate Moving Average Envelopes values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param percentage - Envelope percentage (default: 0.025)
 * @param maType - Moving average type (default: 'sma')
 * @param source - Price source (default: 'close')
 * @returns Object with upper, middle, and lower band arrays
 */
export function movingAverageEnvelopes(data, length, percentage, maType, source) {
    const indicator = new MovingAverageEnvelopes();
    const config = { ...length && { length }, ...source && { source }, percentage, maType };
    const result = indicator.calculate(data, config);
    return {
        upper: result.metadata['upper'],
        middle: result.values,
        lower: result.metadata['lower']
    };
}
