import { BaseIndicator } from '@base/base-indicator';
import { DEFAULT_MULTIPLIERS } from '@constants/indicator-constants';
import { createIndicatorWrapper } from '@utils/indicator-utils';
/**
 * Parabolic SAR (Stop and Reverse) indicator
 *
 * Parabolic SAR is a trend-following indicator that provides stop-loss levels.
 * Formula: SAR = SAR[i-1] + AF × (EP - SAR[i-1])
 *
 * @example
 * ```typescript
 * const parabolic = new ParabolicSAR()
 * const result = parabolic.calculate(marketData, { acceleration: 0.02 })
 * console.log(result.values) // SAR values
 * ```
 */
export class ParabolicSAR extends BaseIndicator {
    constructor() {
        super('ParabolicSAR', 'Parabolic Stop and Reverse', 'trend');
    }
    /**
     * Calculate Parabolic SAR values
     *
     * @param data - Market data
     * @param config - Indicator configuration
     * @returns Parabolic SAR calculation result
     */
    calculate(data, config) {
        this.validateInput(data, config);
        if (Array.isArray(data)) {
            throw new Error('Parabolic SAR requires OHLC market data');
        }
        const acceleration = config?.['acceleration'] || DEFAULT_MULTIPLIERS.PARABOLIC;
        const maximum = config?.['maximum'] || 0.2;
        const values = this.calculateParabolicSAR(data, acceleration, maximum);
        return {
            values,
            metadata: {
                length: 1,
                acceleration,
                maximum,
                source: 'hlc3'
            }
        };
    }
    /**
     * Calculate Parabolic SAR values
     *
     * @param data - Market data
     * @param acceleration - Acceleration factor
     * @param maximum - Maximum acceleration
     * @returns Parabolic SAR values array
     */
    calculateParabolicSAR(data, acceleration, maximum) {
        const result = [];
        let isLong = true;
        let af = acceleration;
        let ep = data.low[0];
        let sar = data.high[0];
        for (let i = 0; i < data.close.length; i++) {
            if (i === 0) {
                result.push(sar);
                continue;
            }
            const high = data.high[i];
            const low = data.low[i];
            // Check for trend reversal
            if (isLong) {
                if (low < sar) {
                    isLong = false;
                    sar = ep;
                    ep = low;
                    af = acceleration;
                }
                else {
                    if (high > ep) {
                        ep = high;
                        af = Math.min(af + acceleration, maximum);
                    }
                    sar = sar + af * (ep - sar);
                }
            }
            else {
                if (high > sar) {
                    isLong = true;
                    sar = ep;
                    ep = high;
                    af = acceleration;
                }
                else {
                    if (low < ep) {
                        ep = low;
                        af = Math.min(af + acceleration, maximum);
                    }
                    sar = sar + af * (ep - sar);
                }
            }
            // Ensure SAR doesn't penetrate price
            if (isLong) {
                sar = Math.min(sar, data.low[i - 1], data.low[i - 2] || data.low[i - 1]);
            }
            else {
                sar = Math.max(sar, data.high[i - 1], data.high[i - 2] || data.high[i - 1]);
            }
            result.push(sar);
        }
        return result;
    }
}
/**
 * Calculate Parabolic SAR values using wrapper function
 *
 * @param data - Market data
 * @param acceleration - Acceleration factor (default: 0.02)
 * @param maximum - Maximum acceleration (default: 0.2)
 * @param source - Price source (default: 'hlc3')
 * @returns Parabolic SAR values array
 */
export function parabolicSAR(data, acceleration, maximum, source) {
    return createIndicatorWrapper(ParabolicSAR, data, undefined, source, { acceleration, maximum });
}
//# sourceMappingURL=parabolic-sar.js.map