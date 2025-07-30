import { BaseIndicator } from '@base/base-indicator';
import { movingAverage } from '@calculations/moving-averages';
import { pineSource } from '@utils/pine-script-utils';
/**
 * Multiple Moving Averages Indicator
 *
 * Calculates multiple moving averages simultaneously for trend analysis.
 * Returns an object with all MA values for easy comparison and analysis.
 *
 * @example
 * ```typescript
 * const mma = new MultipleMovingAverages()
 * const result = mma.calculate(marketData, { periods: [10, 20, 50], types: ['sma', 'ema'] })
 * console.log(result.values) // Primary MA values
 * console.log(result.metadata.movingAveragesKeys) // MA keys
 * ```
 */
export class MultipleMovingAverages extends BaseIndicator {
    constructor() {
        super('MultipleMovingAverages', 'Multiple Moving Averages', 'trend');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const source = pineSource(data, config?.source);
        const periods = config?.['periods'] || [10, 20, 50];
        const types = config?.['types'] || ['sma', 'ema'];
        if (!Array.isArray(periods) || periods.length === 0) {
            throw new Error('Periods must be a non-empty array');
        }
        if (!Array.isArray(types) || types.length === 0) {
            throw new Error('Types must be a non-empty array');
        }
        if (periods.some(p => p <= 0)) {
            throw new Error('All periods must be positive');
        }
        const validTypes = ['sma', 'ema', 'wma', 'hull'];
        if (types.some(t => !validTypes.includes(t))) {
            throw new Error('Invalid moving average type');
        }
        const { movingAverages, primary } = this.calculateMultipleMAs(source, periods, types);
        return {
            values: primary,
            metadata: {
                length: periods[0] || 10,
                periods: periods.join(','),
                types: types.join(','),
                source: config?.source || 'close',
                movingAveragesKeys: Object.keys(movingAverages).join(',')
            }
        };
    }
    calculateMultipleMAs(data, periods, types) {
        const movingAverages = {};
        for (const period of periods) {
            for (const type of types) {
                const key = `${type}_${period}`;
                movingAverages[key] = movingAverage(data, period, type);
            }
        }
        const primary = movingAverages[`${types[0]}_${periods[0]}`] || [];
        return { movingAverages, primary };
    }
}
/**
 * Multiple Moving Averages wrapper function
 *
 * @param data - Market data or price array
 * @param config - Configuration object with periods and types
 * @returns Moving averages result
 */
export function multipleMovingAverages(data, config) {
    const indicator = new MultipleMovingAverages();
    return indicator.calculate(data, config);
}
