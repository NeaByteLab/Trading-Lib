import { BaseIndicator } from '@base/base-indicator';
import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength } from '@utils/pine-script-utils';
/**
 * Directional Movement Index (DMI) indicator
 *
 * DMI consists of +DI and -DI lines that measure directional movement.
 * Formula: +DI = 100 × (+DM / TR), -DI = 100 × (-DM / TR)
 *
 * @example
 * ```typescript
 * const dmi = new DMI()
 * const result = dmi.calculate(marketData, { length: 14 })
 * console.log(result.values) // +DI values
 * ```
 */
export class DMI extends BaseIndicator {
    constructor() {
        super('DMI', 'Directional Movement Index', 'momentum');
    }
    /**
     * Calculate DMI values
     *
     * @param data - Market data
     * @param config - Indicator configuration
     * @returns DMI calculation result
     */
    calculate(data, config) {
        this.validateInput(data, config);
        if (Array.isArray(data)) {
            throw new Error('DMI requires OHLC market data');
        }
        const length = pineLength(config?.length || DEFAULT_LENGTHS.DMI, DEFAULT_LENGTHS.DMI);
        const { plusDI, minusDI } = this.calculateDMI(data, length);
        return {
            values: plusDI,
            metadata: {
                length,
                source: 'hlc3',
                plusDI,
                minusDI
            }
        };
    }
    /**
     * Calculate DMI with +DI and -DI
     *
     * @param data - Market data
     * @param length - Calculation period
     * @returns +DI and -DI values
     */
    calculateDMI(data, length) {
        const plusDI = [];
        const minusDI = [];
        for (let i = 0; i < data.close.length; i++) {
            if (i < 1) {
                plusDI.push(NaN);
                minusDI.push(NaN);
                continue;
            }
            if (i < length) {
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
        }
        return { plusDI, minusDI };
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
 * Calculate DMI values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 14)
 * @param source - Price source (default: 'hlc3')
 * @returns DMI values array
 */
export function dmi(data, length, source) {
    return createIndicatorWrapper(DMI, data, length, source);
}
//# sourceMappingURL=dmi.js.map