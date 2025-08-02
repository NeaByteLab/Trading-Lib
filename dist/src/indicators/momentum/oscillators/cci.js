import { createVolatilityIndicator } from '@core/factories/indicator-factory';
import { calculateCCI, calculateCCIFromOHLC } from '@utils/calculation-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
/**
 * Commodity Channel Index - measures cyclical trends and overbought/oversold conditions
 * Formula: CCI = (Typical Price - SMA) / (0.015 × Mean Deviation)
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @returns CCI values array
 *
 * @example
 * ```typescript
 * const cci = ta.cci(data, 20)
 * // Returns: [NaN, NaN, ..., 125.6, -89.3, ...]
 * ```
 */
function calculateCCIIndicator(data, length = 20) {
    if (Array.isArray(data)) {
        return calculateCCI(data, length);
    }
    return calculateCCIFromOHLC(data, length);
}
const CCI = createVolatilityIndicator('CCI', 'Commodity Channel Index', calculateCCIIndicator, 20);
/**
 * Commodity Channel Index - measures cyclical trends and overbought/oversold conditions
 * Formula: CCI = (Typical Price - SMA) / (0.015 × Mean Deviation)
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'hlc3')
 * @returns CCI values array
 *
 * @example
 * ```typescript
 * const cci = ta.cci(data, 20)
 * // Returns: [NaN, NaN, ..., 125.6, -89.3, ...]
 * ```
 */
export function cci(data, length, source) {
    return createIndicatorWrapper(CCI, data, length, source);
}
