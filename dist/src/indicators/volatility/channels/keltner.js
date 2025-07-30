import { BaseIndicator } from '@core/base/base-indicator';
import { movingAverage } from '@core/calculations/moving-averages';
import { DEFAULT_LENGTHS, DEFAULT_MULTIPLIERS, ERROR_MESSAGES } from '@core/constants/indicator-constants';
import { calculateKeltnerChannel } from '@core/utils/calculation-utils';
import { createMultiResultIndicatorWrapper } from '@core/utils/indicator-utils';
import { pineLength } from '@core/utils/pine-script-utils';
import { atr } from '@indicators/volatility/range/atr';
/**
 * Keltner Channel indicator
 *
 * A volatility-based indicator that uses ATR to create dynamic support and resistance levels.
 * Formula: Middle = EMA, Upper = Middle + (Multiplier × ATR), Lower = Middle - (Multiplier × ATR)
 *
 * @example
 * ```typescript
 * const keltner = new KeltnerChannel()
 * const result = keltner.calculate(marketData, { length: 20, multiplier: 2 })
 * console.log(result.values) // Middle band (EMA)
 * console.log(result.metadata.upper) // Upper band
 * console.log(result.metadata.lower) // Lower band
 * ```
 */
export class KeltnerChannel extends BaseIndicator {
    constructor() {
        super('KeltnerChannel', 'Keltner Channel', 'volatility');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        if (Array.isArray(data)) {
            throw new Error(ERROR_MESSAGES.MISSING_OHLC);
        }
        const length = pineLength(config?.length || DEFAULT_LENGTHS.KELTNER, DEFAULT_LENGTHS.KELTNER);
        const multiplier = config?.['multiplier'] || DEFAULT_MULTIPLIERS.KELTNER;
        const { upper, middle, lower } = this.calculateKeltnerChannel(data, length, multiplier);
        return {
            values: middle,
            metadata: {
                length,
                multiplier,
                source: config?.source || 'close',
                upper,
                lower
            }
        };
    }
    calculateKeltnerChannel(data, length, multiplier) {
        const middle = movingAverage(data.close, length, 'sma');
        const atrValues = atr(data, length);
        const result = calculateKeltnerChannel(data.close, atrValues, multiplier);
        return { ...result, middle };
    }
}
/**
 * Calculate Keltner Channel values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 20)
 * @param multiplier - ATR multiplier (default: 2)
 * @param source - Price source (default: 'close')
 * @returns Upper, middle, and lower bands
 */
export function keltnerChannel(data, length, multiplier, source) {
    const result = createMultiResultIndicatorWrapper(KeltnerChannel, data, length, source, { multiplier });
    return {
        upper: result.metadata['upper'],
        middle: result.values,
        lower: result.metadata['lower']
    };
}
