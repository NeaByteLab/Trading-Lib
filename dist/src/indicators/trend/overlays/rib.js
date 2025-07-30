import { BaseIndicator } from '@base/base-indicator';
import { movingAverage } from '@calculations/moving-averages';
import { pineSource } from '@utils/pine-script-utils';
/**
 * Moving Average Ribbon Indicator
 *
 * Displays multiple moving averages to show trend strength and direction.
 * Creates a ribbon effect with multiple MAs of different periods.
 *
 * @example
 * ```typescript
 * const ribbon = new MovingAverageRibbon()
 * const result = ribbon.calculate(marketData, { periods: [10, 20, 30, 40] })
 * console.log(result.values) // Primary MA values
 * console.log(result.metadata.ribbon) // All MA values
 * ```
 */
export class MovingAverageRibbon extends BaseIndicator {
    constructor() {
        super('MovingAverageRibbon', 'Moving Average Ribbon', 'trend');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const source = pineSource(data, config?.source);
        const periods = config?.['periods'] || [10, 20, 30, 40];
        const maType = config?.['maType'] || 'sma';
        if (!Array.isArray(periods) || periods.length === 0) {
            throw new Error('Periods must be a non-empty array');
        }
        if (periods.some(p => p <= 0)) {
            throw new Error('All periods must be positive');
        }
        const { ribbon, primary } = this.calculateRibbon(source, periods, maType);
        return {
            values: primary,
            metadata: {
                length: primary.length,
                periods,
                maType,
                source: config?.source || 'close',
                ribbon: ribbon
            }
        };
    }
    calculateRibbon(data, periods, maType) {
        const ribbon = [];
        for (const period of periods) {
            const ma = movingAverage(data, period, maType);
            ribbon.push(ma);
        }
        const primary = ribbon[0] || [];
        return { ribbon, primary };
    }
}
/**
 * Calculate Moving Average Ribbon values using wrapper function
 *
 * @param data - Market data or price array
 * @param periods - Array of MA periods (default: [10, 20, 30, 40])
 * @param maType - Moving average type (default: 'sma')
 * @param source - Price source (default: 'close')
 * @returns Object with primary MA and ribbon arrays
 */
export function movingAverageRibbon(data, periods, maType, source) {
    const indicator = new MovingAverageRibbon();
    const config = { ...source && { source }, periods: periods, maType };
    const result = indicator.calculate(data, config);
    return {
        ribbon: result.metadata['ribbon'],
        primary: result.values
    };
}
