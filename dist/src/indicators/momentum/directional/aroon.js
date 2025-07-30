import { BaseIndicator } from '@base/base-indicator';
import { ArrayUtils } from '@utils/array-utils';
import { createMultiResultIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength } from '@utils/pine-script-utils';
/**
 * Aroon indicator
 *
 * Measures the time between highs and lows over a time period.
 * Formula: Aroon Up = ((Period - Days Since High) / Period) × 100
 *          Aroon Down = ((Period - Days Since Low) / Period) × 100
 *
 * @example
 * ```typescript
 * const aroon = new Aroon()
 * const result = aroon.calculate(marketData, { length: 25 })
 * console.log(result.values) // Aroon Up values
 * console.log(result.metadata.down) // Aroon Down values
 * ```
 */
export class Aroon extends BaseIndicator {
    constructor() {
        super('Aroon', 'Aroon', 'momentum');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        if (Array.isArray(data)) {
            throw new Error('Aroon requires OHLC market data');
        }
        const length = pineLength(config?.length || 14, 14);
        const { up, down } = this.calculateAroon(data, length);
        return {
            values: up,
            metadata: {
                length,
                source: 'hlc3',
                down
            }
        };
    }
    calculateAroon(data, length) {
        const results = ArrayUtils.processArray(data.close, (_, i) => {
            const { daysSinceHigh, daysSinceLow } = this.findExtremes(data, i, length);
            const up = ((length - daysSinceHigh) / length) * 100;
            const down = ((length - daysSinceLow) / length) * 100;
            return { up, down };
        });
        return {
            up: results.map(r => r.up),
            down: results.map(r => r.down)
        };
    }
    findExtremes(data, currentIndex, length) {
        // Use centralized window slicing utility
        const highSlice = ArrayUtils.getWindowSlice(data.high, currentIndex, length);
        const lowSlice = ArrayUtils.getWindowSlice(data.low, currentIndex, length);
        const highestHigh = data.high[currentIndex];
        const lowestLow = data.low[currentIndex];
        let daysSinceHigh = 0;
        let daysSinceLow = 0;
        ArrayUtils.processArray(highSlice, (high, j) => {
            const low = lowSlice[j];
            const actualIndex = currentIndex - length + 1 + j;
            if (high === highestHigh) {
                daysSinceHigh = currentIndex - actualIndex;
            }
            if (low === lowestLow) {
                daysSinceLow = currentIndex - actualIndex;
            }
            return { high, low };
        });
        return { daysSinceHigh, daysSinceLow };
    }
}
/**
 * Calculate Aroon values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 25)
 * @param source - Price source (default: 'hlc3')
 * @returns Aroon Up and Down values
 */
export function aroon(data, length, source) {
    const result = createMultiResultIndicatorWrapper(Aroon, data, length, source);
    return {
        up: result.values,
        down: result.metadata['down']
    };
}
