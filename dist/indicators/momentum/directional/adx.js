import { BaseIndicator } from '@base/base-indicator';
import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { wildersSmoothing } from '@utils/calculation-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength } from '@utils/pine-script-utils';
/**
 * Average Directional Index (ADX) indicator
 *
 * ADX measures the strength of a trend regardless of direction.
 * Formula: ADX = 100 × (DX / (DX + DX))
 *
 * @example
 * ```typescript
 * const adx = new ADX()
 * const result = adx.calculate(marketData, { length: 14 })
 * console.log(result.values) // ADX values
 * ```
 */
export class ADX extends BaseIndicator {
    constructor() {
        super('ADX', 'Average Directional Index', 'momentum');
    }
    /**
     * Calculate ADX values
     *
     * @param data - Market data
     * @param config - Indicator configuration
     * @returns ADX calculation result
     */
    calculate(data, config) {
        this.validateInput(data, config);
        if (Array.isArray(data)) {
            throw new Error('ADX requires OHLC market data');
        }
        const length = pineLength(config?.length || DEFAULT_LENGTHS.ADX, DEFAULT_LENGTHS.ADX);
        const { adx, plusDI, minusDI } = this.calculateADX(data, length);
        return {
            values: adx,
            metadata: {
                length,
                source: 'hlc3',
                plusDI,
                minusDI
            }
        };
    }
    /**
     * Calculate ADX with +DI and -DI
     *
     * @param data - Market data
     * @param length - Calculation period
     * @returns ADX, +DI, and -DI values
     */
    calculateADX(data, length) {
        const result = [];
        const plusDI = [];
        const minusDI = [];
        for (let i = 0; i < data.close.length; i++) {
            if (i < 1) {
                result.push(NaN);
                plusDI.push(NaN);
                minusDI.push(NaN);
                continue;
            }
            if (i < length) {
                result.push(NaN);
                plusDI.push(NaN);
                minusDI.push(NaN);
                continue;
            }
            // Calculate smoothed values
            const periodPlusDM = this.calculateSmoothedDM(data, i, length, 'plus');
            const periodMinusDM = this.calculateSmoothedDM(data, i, length, 'minus');
            const periodTR = this.calculateSmoothedTR(data, i, length);
            const plusDIValue = (periodPlusDM / periodTR) * 100;
            const minusDIValue = (periodMinusDM / periodTR) * 100;
            plusDI.push(plusDIValue);
            minusDI.push(minusDIValue);
            const dx = Math.abs(plusDIValue - minusDIValue) / (plusDIValue + minusDIValue) * 100;
            result.push(dx);
        }
        // Apply Wilder's smoothing to ADX
        const adx = wildersSmoothing(result.filter(val => !isNaN(val)), length);
        return { adx, plusDI, minusDI };
    }
    /**
     * Calculate smoothed Directional Movement
     */
    calculateSmoothedDM(data, index, length, type) {
        let sum = 0;
        for (let i = index - length + 1; i <= index; i++) {
            if (i < 1) {
                continue;
            }
            const highDiff = data.high[i] - data.high[i - 1];
            const lowDiff = data.low[i - 1] - data.low[i];
            if (type === 'plus' && highDiff > lowDiff && highDiff > 0) {
                sum += highDiff;
            }
            else if (type === 'minus' && lowDiff > highDiff && lowDiff > 0) {
                sum += lowDiff;
            }
        }
        return sum;
    }
    /**
     * Calculate smoothed True Range
     */
    calculateSmoothedTR(data, index, length) {
        let sum = 0;
        for (let i = index - length + 1; i <= index; i++) {
            if (i < 1) {
                continue;
            }
            const tr = Math.max(data.high[i] - data.low[i], Math.abs(data.high[i] - data.close[i - 1]), Math.abs(data.low[i] - data.close[i - 1]));
            sum += tr;
        }
        return sum;
    }
}
/**
 * Calculate ADX values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 14)
 * @param source - Price source (default: 'hlc3')
 * @returns ADX values array
 */
export function adx(data, length, source) {
    return createIndicatorWrapper(ADX, data, length, source);
}
//# sourceMappingURL=adx.js.map