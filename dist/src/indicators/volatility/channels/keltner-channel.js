import { BaseIndicator } from '@base/base-indicator';
import { movingAverage } from '@calculations/moving-averages';
import { DEFAULT_LENGTHS, DEFAULT_MULTIPLIERS } from '@constants/indicator-constants';
import { atr } from '@indicators/volatility/range/atr';
import { ArrayUtils } from '@utils/array-utils';
import { createMultiResultIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength } from '@utils/pine-script-utils';
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
            throw new Error('Keltner Channel requires OHLC market data');
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
        const middle = movingAverage(data.close, length, 'ema');
        const atrValues = atr(data, length);
        const atrMultiplied = ArrayUtils.processArray(atrValues, atr => atr * multiplier);
        const upper = ArrayUtils.processArray(middle, (mid, i) => {
            const atrVal = atrMultiplied[i];
            return mid !== undefined && atrVal !== undefined && !isNaN(mid) && !isNaN(atrVal)
                ? mid + atrVal
                : NaN;
        });
        const lower = ArrayUtils.processArray(middle, (mid, i) => {
            const atrVal = atrMultiplied[i];
            return mid !== undefined && atrVal !== undefined && !isNaN(mid) && !isNaN(atrVal)
                ? mid - atrVal
                : NaN;
        });
        return { upper, middle, lower };
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
