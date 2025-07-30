import { VolatilityIndicator } from '@core/base/volatility-indicator';
import { calculateBollingerBandWidth } from '@core/utils/calculation-utils';
import { validateIndicatorData } from '@core/utils/validation-utils';
/**
 * Bollinger Band Width Indicator
 *
 * Measures the width of Bollinger Bands as a percentage of the middle band.
 * Wider bands indicate higher volatility, narrower bands indicate lower volatility.
 *
 * @param data - Price data array
 * @param length - Period for moving average (default: 20)
 * @param multiplier - Standard deviation multiplier (default: 2)
 * @returns Array of band width values
 * @throws {Error} If data is invalid or missing required fields
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * const bbWidth = ta.bbwidth(data.close, 20, 2)
 * ```
 */
export function bollingerBandWidth(data, length = 20, multiplier = 2) {
    validateIndicatorData(data);
    return calculateBollingerBandWidth(data, length, multiplier);
}
/**
 * Bollinger Band Width Class Implementation
 */
export class BollingerBandWidthIndicator extends VolatilityIndicator {
    calculateVolatility(data, length, multiplier) {
        return calculateBollingerBandWidth(data, length, multiplier);
    }
}
