import { BaseIndicator } from '@base/base-indicator';
import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { ArrayUtils } from '@utils/array-utils';
import { extractResultProperties, findDaysSinceExtremes } from '@utils/calculation-utils';
import { createMultiResultIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength } from '@utils/pine-script-utils';
/**
 * Aroon Indicator
 *
 * A momentum indicator that measures the time between highs and lows.
 * Values range from 0 to 100, with higher values indicating stronger trends.
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
            throw new Error(ERROR_MESSAGES.MISSING_OHLC);
        }
        const length = pineLength(config?.length || 25, 25);
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
            if (i < length - 1) {
                return { up: NaN, down: NaN };
            }
            const { daysSinceHigh, daysSinceLow } = findDaysSinceExtremes(data.high, data.low, i, length);
            const up = ((length - daysSinceHigh) / length) * 100;
            const down = ((length - daysSinceLow) / length) * 100;
            return { up, down };
        });
        const extracted = extractResultProperties(results, ['up', 'down']);
        return {
            up: extracted['up'],
            down: extracted['down']
        };
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
