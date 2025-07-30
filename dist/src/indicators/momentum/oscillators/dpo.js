import { BaseIndicator } from '@base/base-indicator';
import { movingAverage } from '@calculations/moving-averages';
import { DEFAULT_LENGTHS, ERROR_MESSAGES } from '@constants/indicator-constants';
import { ArrayUtils } from '@utils/array-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { MathUtils } from '@utils/math-utils';
import { pineLength } from '@utils/pine-script-utils';
/**
 * Detrended Price Oscillator (DPO) Indicator
 *
 * Removes trend from price data by subtracting a displaced moving average.
 * Helps identify cycles and overbought/oversold conditions.
 *
 * @example
 * ```typescript
 * const dpo = new DPO()
 * const result = dpo.calculate(marketData, { length: 20 })
 * console.log(result.values) // DPO values
 * ```
 */
export class DPO extends BaseIndicator {
    constructor() {
        super('DPO', 'Detrended Price Oscillator', 'momentum');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const length = pineLength(config?.length, DEFAULT_LENGTHS.DPO);
        return this.calculateDPO(data, length);
    }
    calculateDPO(data, length) {
        // Handle both MarketData and number[] inputs
        const priceData = Array.isArray(data) ? data : data.close;
        // Validate data before calculation
        if (!priceData || priceData.length === 0) {
            throw new Error(ERROR_MESSAGES.EMPTY_DATA);
        }
        const displacement = MathUtils.floor(length / 2) + 1;
        // Add validation for minimum data length
        if (priceData.length < length + displacement) {
            return {
                values: Array(priceData.length).fill(NaN),
                metadata: {
                    length,
                    source: 'close',
                    displacement
                }
            };
        }
        const sma = movingAverage(priceData, length, 'sma');
        // Calculate DPO with proper bounds checking and meaningful results
        const dpo = ArrayUtils.processArray(priceData, (price, i) => {
            // Calculate the index for the displaced SMA
            const smaIndex = i - displacement;
            // Check if we have valid price data
            if (price === undefined || isNaN(price) || !isFinite(price)) {
                return NaN;
            }
            // Check if SMA index is within bounds of the SMA array
            if (smaIndex < 0 || smaIndex >= sma.length) {
                // For the last few values where SMA index is out of bounds,
                // use the most recent available SMA value
                const lastValidSMAIndex = Math.max(0, sma.length - 1);
                const smaValue = sma[lastValidSMAIndex];
                if (smaValue === undefined || isNaN(smaValue) || !isFinite(smaValue)) {
                    return NaN;
                }
                const result = price - smaValue;
                return isFinite(result) ? result : NaN;
            }
            const smaValue = sma[smaIndex];
            if (smaValue === undefined || isNaN(smaValue) || !isFinite(smaValue)) {
                return NaN;
            }
            const result = price - smaValue;
            return isFinite(result) ? result : NaN;
        });
        // Filter out NaN values for metadata
        const validDPO = dpo.filter(val => !isNaN(val) && isFinite(val));
        return {
            values: dpo,
            metadata: {
                length,
                source: 'close',
                displacement,
                validValues: validDPO.length,
                totalValues: dpo.length
            }
        };
    }
}
/**
 * Calculate Detrended Price Oscillator (DPO)
 *
 * @param data - Market data or price array
 * @param length - DPO period (default: 20)
 * @param source - Price source (default: 'close')
 * @returns DPO values
 */
export function dpo(data, length, source) {
    return createIndicatorWrapper(DPO, data, length, source);
}
