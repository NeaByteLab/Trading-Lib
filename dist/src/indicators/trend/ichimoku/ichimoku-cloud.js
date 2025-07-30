import { BaseIndicator } from '@base/base-indicator';
import { DEFAULT_LENGTHS, ERROR_MESSAGES } from '@constants/indicator-constants';
import { ArrayUtils } from '@utils/array-utils';
import { createMultiResultIndicatorWrapper } from '@utils/indicator-utils';
import { PineCore } from '@utils/pine-core';
import { pineLength } from '@utils/pine-script-utils';
/**
 * Ichimoku Cloud indicator
 *
 * Provides multiple components of the Ichimoku Cloud system:
 * - Tenkan-sen (Conversion Line)
 * - Kijun-sen (Base Line)
 * - Senkou Span A (Leading Span A)
 * - Senkou Span B (Leading Span B)
 * - Chikou Span (Lagging Span)
 *
 * @example
 * ```typescript
 * const ichimoku = new IchimokuCloud()
 * const result = ichimoku.calculate(marketData)
 * console.log(result.values) // Tenkan-sen values
 * console.log(result.metadata.kijun) // Kijun-sen values
 * console.log(result.metadata.senkouA) // Senkou Span A values
 * console.log(result.metadata.senkouB) // Senkou Span B values
 * console.log(result.metadata.chikou) // Chikou Span values
 * ```
 */
export class IchimokuCloud extends BaseIndicator {
    constructor() {
        super('IchimokuCloud', 'Ichimoku Cloud', 'trend');
    }
    /**
     * Calculate Ichimoku Cloud values
     *
     * @param data - Market data
     * @param config - Indicator configuration
     * @returns Ichimoku Cloud calculation result
     */
    calculate(data, config) {
        this.validateInput(data, config);
        if (Array.isArray(data)) {
            throw new Error(ERROR_MESSAGES.MISSING_OHLC);
        }
        const tenkanPeriod = pineLength(config?.['tenkanPeriod'] || DEFAULT_LENGTHS.ICHIMOKU_TENKAN, DEFAULT_LENGTHS.ICHIMOKU_TENKAN);
        const kijunPeriod = pineLength(config?.['kijunPeriod'] || DEFAULT_LENGTHS.ICHIMOKU_KIJUN, DEFAULT_LENGTHS.ICHIMOKU_KIJUN);
        const senkouBPeriod = pineLength(config?.['senkouBPeriod'] || DEFAULT_LENGTHS.ICHIMOKU_SENKOU_B, DEFAULT_LENGTHS.ICHIMOKU_SENKOU_B);
        const displacement = pineLength(config?.['displacement'] || DEFAULT_LENGTHS.ICHIMOKU_DISPLACEMENT, DEFAULT_LENGTHS.ICHIMOKU_DISPLACEMENT);
        const { tenkan, kijun, senkouA, senkouB, chikou } = this.calculateIchimoku(data, tenkanPeriod, kijunPeriod, senkouBPeriod, displacement);
        return {
            values: tenkan,
            metadata: {
                length: tenkanPeriod,
                tenkanPeriod,
                kijunPeriod,
                senkouBPeriod,
                displacement,
                source: 'hlc3',
                kijun,
                senkouA,
                senkouB,
                chikou
            }
        };
    }
    /**
     * Calculate Ichimoku Cloud components using centralized utilities
     *
     * @param data - Market data
     * @param tenkanPeriod - Tenkan-sen period
     * @param kijunPeriod - Kijun-sen period
     * @param senkouBPeriod - Senkou Span B period
     * @param displacement - Displacement period
     * @returns All Ichimoku components
     */
    calculateIchimoku(data, tenkanPeriod, kijunPeriod, senkouBPeriod, displacement) {
        const { high } = data;
        const { low } = data;
        const { close } = data;
        // Calculate Tenkan-sen (Conversion Line)
        const tenkan = this.calculateMidpoint(high, low, tenkanPeriod);
        // Calculate Kijun-sen (Base Line)
        const kijun = this.calculateMidpoint(high, low, kijunPeriod);
        // Calculate Senkou Span A (Leading Span A)
        const senkouA = this.calculateSenkouA(tenkan, kijun, displacement);
        // Calculate Senkou Span B (Leading Span B)
        const senkouB = this.calculateMidpoint(high, low, senkouBPeriod);
        const senkouBShifted = this.shiftArray(senkouB, displacement);
        // Calculate Chikou Span (Lagging Span)
        const chikou = this.shiftArray(close, -displacement);
        return { tenkan, kijun, senkouA, senkouB: senkouBShifted, chikou };
    }
    /**
     * Calculate midpoint (highest high + lowest low) / 2
     *
     * @param high - High prices array
     * @param low - Low prices array
     * @param period - Calculation period
     * @returns Midpoint values array
     */
    calculateMidpoint(high, low, period) {
        return ArrayUtils.processWindow(high, period, (_, i) => {
            // Use centralized window slicing utility
            const highSlice = ArrayUtils.getWindowSlice(high, i, period);
            const lowSlice = ArrayUtils.getWindowSlice(low, i, period);
            const highestHigh = PineCore.max(highSlice);
            const lowestLow = PineCore.min(lowSlice);
            return (highestHigh + lowestLow) / 2;
        });
    }
    /**
     * Calculate Senkou Span A
     *
     * @param tenkan - Tenkan-sen values
     * @param kijun - Kijun-sen values
     * @param displacement - Displacement period
     * @returns Senkou Span A values
     */
    calculateSenkouA(tenkan, kijun, displacement) {
        const senkouA = ArrayUtils.processArray(tenkan, (tenkanValue, i) => {
            const kijunValue = kijun[i];
            if (tenkanValue === undefined || kijunValue === undefined ||
                isNaN(tenkanValue) || isNaN(kijunValue)) {
                return NaN;
            }
            return (tenkanValue + kijunValue) / 2;
        });
        return ArrayUtils.shift(senkouA, displacement);
    }
    /**
     * Shift array by specified amount
     *
     * @param array - Input array
     * @param shift - Shift amount (positive = forward, negative = backward)
     * @returns Shifted array
     */
    shiftArray(array, shift) {
        return ArrayUtils.shift(array, shift);
    }
}
/**
 * Calculate Ichimoku Cloud values using wrapper function
 *
 * @param data - Market data
 * @param tenkanPeriod - Tenkan-sen period (default: 9)
 * @param kijunPeriod - Kijun-sen period (default: 26)
 * @param senkouBPeriod - Senkou Span B period (default: 52)
 * @param displacement - Displacement period (default: 26)
 * @returns Ichimoku Cloud components
 */
export function ichimokuCloud(data, tenkanPeriod, kijunPeriod, senkouBPeriod, displacement) {
    const result = createMultiResultIndicatorWrapper(IchimokuCloud, data, undefined, undefined, { tenkanPeriod, kijunPeriod, senkouBPeriod, displacement });
    return {
        tenkan: result.values,
        kijun: result.metadata['kijun'],
        senkouA: result.metadata['senkouA'],
        senkouB: result.metadata['senkouB'],
        chikou: result.metadata['chikou']
    };
}
