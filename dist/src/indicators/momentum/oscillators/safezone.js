import { VolatilityIndicator } from '@base/volatility-indicator';
import { calculateBands } from '@utils/calculation-utils';
import { createMultiResultIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength, pineSource } from '@utils/pine-script-utils';
/**
 * Calculate Safezone Indicator using centralized utilities
 *
 * @param data - Source data array
 * @param length - Calculation period
 * @param multiplier - Standard deviation multiplier
 * @returns Safezone values object
 */
function calculateSafezone(data, length, multiplier) {
    return calculateBands(data, length, multiplier);
}
/**
 * Safezone Indicator
 *
 * Creates safezone levels based on standard deviation of price from moving average.
 * The safezone helps identify overbought and oversold conditions with reduced false signals.
 * Formula: Upper = MA + (StdDev × Multiplier), Lower = MA - (StdDev × Multiplier)
 *
 * @example
 * ```typescript
 * const safezone = new SafezoneIndicator()
 * const result = safezone.calculate(marketData, { length: 20, multiplier: 2 })
 * console.log(result.values) // Middle band (MA)
 * console.log(result.metadata.upper) // Upper safezone
 * console.log(result.metadata.lower) // Lower safezone
 * ```
 */
export class SafezoneIndicator extends VolatilityIndicator {
    constructor() {
        super('SafezoneIndicator', 'Safezone Indicator', 20, 2.0, 1);
    }
    calculateVolatility(data, length, multiplier) {
        const { middle } = calculateSafezone(data, length, multiplier);
        return middle;
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const source = pineSource(data, config?.source);
        const length = pineLength(config?.length || 20, 20);
        const multiplier = config?.['multiplier'] || 2.0;
        const { upper, middle, lower } = calculateSafezone(source, length, multiplier);
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
}
/**
 * Calculate Safezone Indicator using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param multiplier - Standard deviation multiplier (default: 2.0)
 * @param source - Price source (default: 'close')
 * @returns Safezone indicator with upper, middle, and lower bands
 */
export function safezone(data, length, multiplier, source) {
    const result = createMultiResultIndicatorWrapper(SafezoneIndicator, data, length, source, { multiplier });
    return {
        upper: result.metadata['upper'],
        middle: result.values,
        lower: result.metadata['lower']
    };
}
