import { BaseIndicator } from '@base/base-indicator';
import { trueRange } from '@calculations/volatility/true-range';
import { DEFAULT_LENGTHS, ERROR_MESSAGES } from '@constants/indicator-constants';
import { ArrayUtils } from '@utils/array-utils';
import { createMultiResultIndicatorWrapper } from '@utils/indicator-utils';
import { PineCore } from '@utils/pine-core';
import { pineLength } from '@utils/pine-script-utils';
/**
 * Average Directional Index (ADX) indicator
 *
 * Measures the strength of a trend regardless of its direction.
 * Formula: ADX = Average of DX over period, where DX = 100 × |+DI - -DI| / (+DI + -DI)
 *
 * @example
 * ```typescript
 * const adx = new ADX()
 * const result = adx.calculate(marketData, { length: 14 })
 * console.log(result.values) // ADX values
 * console.log(result.metadata.plusDI) // +DI values
 * console.log(result.metadata.minusDI) // -DI values
 * ```
 */
export class ADX extends BaseIndicator {
    constructor() {
        super('ADX', 'Average Directional Index', 'momentum');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        if (Array.isArray(data)) {
            throw new Error(ERROR_MESSAGES.MISSING_OHLC);
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
    calculateADX(data, length) {
        const trValues = trueRange(data);
        const result = [];
        const plusDIValues = [];
        const minusDIValues = [];
        let prevHigh = data.high[0];
        let prevLow = data.low[0];
        const results = ArrayUtils.processArray(data.close, (_, i) => {
            if (i === 0) {
                result.push(NaN);
                plusDIValues.push(NaN);
                minusDIValues.push(NaN);
                return { adx: NaN, plusDI: NaN, minusDI: NaN };
            }
            const { plusDM, minusDM } = this.calculateDirectionalMovement(data, i, prevHigh, prevLow);
            const tr = trValues[i];
            const { smoothedTR, smoothedPlusDM, smoothedMinusDM } = this.calculateSmoothedValues(tr, plusDM, minusDM, i, length, plusDIValues, minusDIValues, trValues);
            const plusDI = smoothedTR > 0 ? (smoothedPlusDM / smoothedTR) * 100 : 0;
            const minusDI = smoothedTR > 0 ? (smoothedMinusDM / smoothedTR) * 100 : 0;
            plusDIValues.push(plusDI);
            minusDIValues.push(minusDI);
            const dx = plusDI + minusDI > 0 ? (PineCore.abs(plusDI - minusDI) / (plusDI + minusDI)) * 100 : 0;
            let adxValue;
            if (i < length) {
                adxValue = NaN;
            }
            else {
                adxValue = i === length ? dx : (dx + (i - length) * result[i - 1]) / (i - length + 1);
            }
            result.push(adxValue);
            prevHigh = data.high[i];
            prevLow = data.low[i];
            return { adx: adxValue, plusDI, minusDI };
        });
        return {
            adx: results.map(r => r.adx),
            plusDI: results.map(r => r.plusDI),
            minusDI: results.map(r => r.minusDI)
        };
    }
    calculateDirectionalMovement(data, i, prevHigh, prevLow) {
        const currentHigh = data.high[i];
        const currentLow = data.low[i];
        const plusDM = currentHigh - prevHigh > prevLow - currentLow && currentHigh - prevHigh > 0
            ? currentHigh - prevHigh
            : 0;
        const minusDM = prevLow - currentLow > currentHigh - prevHigh && prevLow - currentLow > 0
            ? prevLow - currentLow
            : 0;
        return { plusDM, minusDM };
    }
    calculateSmoothedValues(tr, plusDM, minusDM, i, length, plusDIValues, minusDIValues, trValues) {
        const smoothedTR = i < length ? tr : (tr + (i - 1) * trValues[i - 1]) / i;
        const smoothedPlusDM = i < length ? plusDM : (plusDM + (i - 1) * (plusDIValues[i - 1] || 0)) / i;
        const smoothedMinusDM = i < length ? minusDM : (minusDM + (i - 1) * (minusDIValues[i - 1] || 0)) / i;
        return { smoothedTR, smoothedPlusDM, smoothedMinusDM };
    }
}
/**
 * Calculate ADX values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 14)
 * @param source - Price source (default: 'hlc3')
 * @returns ADX, +DI, and -DI values
 */
export function adx(data, length, source) {
    const result = createMultiResultIndicatorWrapper(ADX, data, length, source);
    return {
        adx: result.values,
        plusDI: result.metadata['plusDI'],
        minusDI: result.metadata['minusDI']
    };
}
