import { VolatilityIndicator } from '@core/base/volatility-indicator';
import { calculateBands } from '@core/utils/calculation-utils';
import { createMultiResultIndicatorWrapper } from '@core/utils/indicator-utils';
import { pineSource } from '@core/utils/pine-script-utils';
/**
 * Bollinger Bands Indicator
 *
 * Creates volatility bands around a moving average using standard deviation.
 * Upper band = MA + (StdDev × Multiplier), Lower band = MA - (StdDev × Multiplier)
 * Helps identify overbought/oversold conditions and volatility expansion/contraction.
 *
 * @example
 * ```typescript
 * const bollinger = new BollingerBandsIndicator()
 * const result = bollinger.calculate(marketData, { length: 20, multiplier: 2 })
 * console.log(result.values) // Middle band (SMA)
 * console.log(result.metadata.upper) // Upper band
 * console.log(result.metadata.lower) // Lower band
 * ```
 */
export class BollingerBandsIndicator extends VolatilityIndicator {
    constructor() {
        super('BollingerBandsIndicator', 'Bollinger Bands', 20, 2.0, 1);
    }
    calculateVolatility(data, length, multiplier) {
        const { middle } = calculateBands(data, length, multiplier);
        return middle;
    }
    calculate(data, config) {
        const result = super.calculate(data, config);
        const source = pineSource(data, config?.source);
        const length = config?.length || 20;
        const multiplier = config?.['multiplier'] || 2.0;
        const { upper, lower } = calculateBands(source, length, multiplier);
        return {
            values: result.values,
            metadata: {
                ...result.metadata,
                upper,
                lower
            }
        };
    }
}
/**
 * Calculate Bollinger Bands using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param multiplier - Standard deviation multiplier (default: 2.0)
 * @param source - Price source (default: 'close')
 * @param maType - Moving average type ('sma' or 'ema', default: 'sma')
 * @returns Bollinger Bands with upper, middle, and lower bands
 */
export function bollinger(data, length, multiplier, source, maType = 'sma') {
    const result = createMultiResultIndicatorWrapper(BollingerBandsIndicator, data, length, source, { multiplier, maType });
    return {
        upper: result.metadata['upper'],
        middle: result.values,
        lower: result.metadata['lower']
    };
}
export const bollingerBands = bollinger;
