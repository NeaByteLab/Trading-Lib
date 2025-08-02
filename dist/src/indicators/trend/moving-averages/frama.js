import { BaseIndicator } from '@core/base/base-indicator';
import { createIndicatorWrapper } from '@core/utils/indicator-utils';
import { MathUtils } from '@core/utils/math-utils';
import { pineSource } from '@core/utils/pine-script-utils';
/**
 * Fractal Adaptive Moving Average (FRAMA) Indicator
 * Uses fractal mathematics to adapt to market conditions
 */
export class FRAMAIndicator extends BaseIndicator {
    constructor() {
        super('FRAMA', 'Fractal Adaptive Moving Average', 'trend');
    }
    /**
     * Calculate FRAMA
     * @param data - Market data or price array
     * @param config - Configuration with FRAMA parameters
     * @returns FRAMA values
     */
    calculate(data, config) {
        this.validateInput(data, config);
        const source = pineSource(data, config?.source);
        const length = config?.length || 14;
        const fc = config?.fc || 4;
        const sc = config?.sc || 2;
        const frama = this.calculateFRAMA(source, length, fc, sc);
        return {
            values: frama,
            metadata: {
                length,
                source: config?.source || 'close',
                fc,
                sc
            }
        };
    }
    /**
     * Calculate FRAMA using fractal mathematics
     */
    calculateFRAMA(data, length, fc, sc) {
        const frama = [];
        for (let i = 0; i < data.length; i++) {
            if (i < length - 1) {
                frama.push(NaN);
                continue;
            }
            // Calculate fractal dimension
            const fractalDimension = this.calculateFractalDimension(data, i, length);
            // Calculate adaptive alpha
            const alpha = this.calculateAdaptiveAlpha(fractalDimension, fc, sc);
            // Calculate FRAMA
            if (i === length - 1) {
                // First value is SMA
                const sum = data.slice(i - length + 1, i + 1).reduce((acc, val) => acc + val, 0);
                frama.push(sum / length);
            }
            else {
                const previousFRAMA = frama[i - 1];
                const currentPrice = data[i];
                if (previousFRAMA !== undefined && currentPrice !== undefined) {
                    const newFRAMA = alpha * currentPrice + (1 - alpha) * previousFRAMA;
                    frama.push(newFRAMA);
                }
                else {
                    frama.push(NaN);
                }
            }
        }
        return frama;
    }
    /**
     * Calculate fractal dimension using box counting method
     */
    calculateFractalDimension(data, currentIndex, length) {
        const window = data.slice(currentIndex - length + 1, currentIndex + 1);
        const { low, range } = this.calculateWindowStats(window);
        if (range === 0) {
            return 1.0;
        }
        const boxCounts = this.calculateBoxCounts(window, low, range);
        return this.calculateFractalDimensionFromBoxCounts(boxCounts);
    }
    /**
     * Calculate window statistics
     */
    calculateWindowStats(window) {
        const high = MathUtils.max(window);
        const low = MathUtils.min(window);
        const range = high - low;
        return { low, range };
    }
    /**
     * Calculate box counts at different scales
     */
    calculateBoxCounts(window, low, range) {
        const scales = [1, 2, 4, 8];
        const boxCounts = [];
        for (const scale of scales) {
            const boxSize = range / scale;
            const boxCount = this.countBoxesForScale(window, low, boxSize);
            boxCounts.push(boxCount);
        }
        return boxCounts;
    }
    /**
     * Count boxes for a specific scale
     */
    countBoxesForScale(window, low, boxSize) {
        let boxCount = 0;
        for (let i = 0; i < window.length - 1; i++) {
            const current = window[i];
            const next = window[i + 1];
            if (current !== undefined && next !== undefined) {
                const boxIndex1 = Math.floor((current - low) / boxSize);
                const boxIndex2 = Math.floor((next - low) / boxSize);
                if (boxIndex1 !== boxIndex2) {
                    boxCount++;
                }
            }
        }
        return boxCount;
    }
    /**
     * Calculate fractal dimension from box counts using linear regression
     */
    calculateFractalDimensionFromBoxCounts(boxCounts) {
        const scales = [1, 2, 4, 8];
        const logScales = scales.map(s => Math.log(s));
        const logBoxCounts = boxCounts.map(c => Math.log(c));
        const { slope } = this.calculateLinearRegression(logScales, logBoxCounts);
        const fractalDimension = -slope;
        // Clamp to reasonable range
        return MathUtils.clamp(fractalDimension, 1.0, 2.0);
    }
    /**
     * Calculate linear regression slope
     */
    calculateLinearRegression(x, y) {
        const n = x.length;
        let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
        for (let i = 0; i < n; i++) {
            const logScale = x[i];
            const logBoxCount = y[i];
            if (logScale !== undefined && logBoxCount !== undefined) {
                sumX += logScale;
                sumY += logBoxCount;
                sumXY += logScale * logBoxCount;
                sumX2 += logScale * logScale;
            }
        }
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        return { slope };
    }
    /**
     * Calculate adaptive alpha based on fractal dimension
     */
    calculateAdaptiveAlpha(fractalDimension, fc, sc) {
        const alpha = Math.pow(fractalDimension - 1, 2) * (fc - sc) + sc;
        return MathUtils.clamp(alpha, 0.01, 0.99);
    }
}
/**
 * Calculate Fractal Adaptive Moving Average (FRAMA)
 * @param data - Market data or price array
 * @param length - Period for calculation (default: 14)
 * @param fc - Fast constant (default: 4)
 * @param sc - Slow constant (default: 2)
 * @param source - Price source (default: 'close')
 * @returns FRAMA values
 */
export function frama(data, length, fc, sc, source) {
    return createIndicatorWrapper(FRAMAIndicator, data, length, source, { fc, sc });
}
