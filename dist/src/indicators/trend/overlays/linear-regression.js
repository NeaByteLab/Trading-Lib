import { BaseIndicator } from '@core/base/base-indicator';
import { MathUtils } from '@core/utils/math-utils';
import { pineSource } from '@core/utils/pine-script-utils';
/**
 * Linear Regression Indicator
 *
 * Calculates linear regression line and related statistics.
 * Formula: y = mx + b where m is slope and b is intercept
 * Provides trend analysis, forecasting, and confidence bands.
 *
 * @example
 * ```typescript
 * const lr = linearRegression(data, 20)
 * console.log(lr.slope) // Trend slope
 * console.log(lr.forecast) // Forecasted values
 * ```
 */
export class LinearRegressionIndicator extends BaseIndicator {
    constructor() {
        super('LinearRegression', 'Linear Regression Analysis', 'trend');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const source = pineSource(data, config?.source);
        const length = config?.length || 20;
        if (length <= 0) {
            throw new Error('Length must be positive');
        }
        const slopes = [];
        const intercepts = [];
        const rSquared = [];
        const forecasts = [];
        const upperBands = [];
        const lowerBands = [];
        for (let i = length - 1; i < source.length; i++) {
            const window = source.slice(i - length + 1, i + 1);
            const validValues = window.filter(val => !isNaN(val) && isFinite(val));
            if (validValues.length < 2) {
                slopes.push(NaN);
                intercepts.push(NaN);
                rSquared.push(NaN);
                forecasts.push(NaN);
                upperBands.push(NaN);
                lowerBands.push(NaN);
                continue;
            }
            const regression = this.calculateLinearRegression(validValues);
            slopes.push(regression.slope);
            intercepts.push(regression.intercept);
            rSquared.push(regression.rSquared);
            forecasts.push(regression.forecast);
            upperBands.push(regression.upperBand);
            lowerBands.push(regression.lowerBand);
        }
        // Fill initial values with NaN
        const initialNaN = Array(length - 1).fill(NaN);
        slopes.unshift(...initialNaN);
        intercepts.unshift(...initialNaN);
        rSquared.unshift(...initialNaN);
        forecasts.unshift(...initialNaN);
        upperBands.unshift(...initialNaN);
        lowerBands.unshift(...initialNaN);
        return {
            // Use forecast as primary values
            values: forecasts,
            metadata: {
                length,
                source: config?.source || 'close',
                slope: slopes,
                intercept: intercepts,
                rSquared,
                upperBand: upperBands,
                lowerBand: lowerBands
            }
        };
    }
    calculateLinearRegression(values) {
        const n = values.length;
        // Time indices [1, 2, 3, ...]
        const x = Array.from({ length: n }, (_, i) => i + 1);
        // Calculate means
        const xMean = MathUtils.average(x);
        const yMean = MathUtils.average(values);
        // Calculate slope (m)
        let numerator = 0;
        let denominator = 0;
        for (let i = 0; i < n; i++) {
            const xDiff = x[i] - xMean;
            const yDiff = values[i] - yMean;
            numerator += xDiff * yDiff;
            denominator += xDiff * xDiff;
        }
        let slope = 0;
        let intercept = yMean;
        if (denominator !== 0) {
            slope = numerator / denominator;
            intercept = yMean - slope * xMean;
        }
        // Calculate R-squared
        const yPred = values.map((_, i) => intercept + slope * x[i]);
        const ssRes = values.reduce((sum, y, i) => sum + Math.pow(y - yPred[i], 2), 0);
        const ssTot = values.reduce((sum, y) => sum + Math.pow(y - yMean, 2), 0);
        const rSquared = ssTot !== 0 ? 1 - (ssRes / ssTot) : 0;
        // Calculate forecast (next value)
        const forecast = intercept + slope * (n + 1);
        // Calculate confidence bands (±2 standard errors)
        const stdError = Math.sqrt(ssRes / (n - 2));
        const upperBand = forecast + 2 * stdError;
        const lowerBand = forecast - 2 * stdError;
        return {
            slope: isFinite(slope) ? slope : NaN,
            intercept: isFinite(intercept) ? intercept : NaN,
            rSquared: isFinite(rSquared) ? rSquared : NaN,
            forecast: isFinite(forecast) ? forecast : NaN,
            upperBand: isFinite(upperBand) ? upperBand : NaN,
            lowerBand: isFinite(lowerBand) ? lowerBand : NaN
        };
    }
}
/**
 * Calculate Linear Regression using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'close')
 * @returns Linear regression results
 */
export function linearRegression(data, length, source) {
    const indicator = new LinearRegressionIndicator();
    const result = indicator.calculate(data, { length: length || 20, source: source || 'close' });
    return {
        forecast: result.values,
        slope: result.metadata['slope'],
        intercept: result.metadata['intercept'],
        rSquared: result.metadata['rSquared'],
        upperBand: result.metadata['upperBand'],
        lowerBand: result.metadata['lowerBand']
    };
}
