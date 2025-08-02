import { VolatilityIndicator } from '@core/base/volatility-indicator';
import { validateMarketDataOnly } from '@core/utils/validation-utils';
/**
 * Garman-Klass Volatility Indicator
 *
 * Calculates volatility using the Garman-Klass formula, which uses OHLC data.
 * Formula: σ² = 0.5 × ln(H/L)² - (2×ln(2)-1) × ln(C/O)²
 * Provides more accurate volatility estimates than simple range-based methods.
 *
 * @example
 * ```typescript
 * const gk = garmanKlassVolatility(data, 20)
 * console.log(gk) // Garman-Klass volatility values
 * ```
 */
export class GarmanKlassVolatilityIndicator extends VolatilityIndicator {
    constructor() {
        super('GarmanKlassVolatility', 'Garman-Klass Volatility', 20, 1.0, 1);
    }
    validateInput(data, _config) {
        validateMarketDataOnly(data);
    }
    calculateVolatility(data, length, _multiplier) {
        const marketData = data;
        const volatilities = [];
        for (let i = length - 1; i < marketData.close.length; i++) {
            const window = {
                high: marketData.high.slice(i - length + 1, i + 1),
                low: marketData.low.slice(i - length + 1, i + 1),
                open: marketData.open.slice(i - length + 1, i + 1),
                close: marketData.close.slice(i - length + 1, i + 1)
            };
            const validData = this.filterValidData(window);
            if (validData.length < 2) {
                volatilities.push(NaN);
                continue;
            }
            const volatility = this.calculateGarmanKlassVolatility(validData);
            volatilities.push(volatility);
        }
        // Fill initial values with NaN
        const initialNaN = Array(length - 1).fill(NaN);
        volatilities.unshift(...initialNaN);
        return volatilities;
    }
    filterValidData(window) {
        const validData = [];
        for (let i = 0; i < window.high.length; i++) {
            const high = window.high[i];
            const low = window.low[i];
            const open = window.open[i];
            const close = window.close[i];
            if (!isNaN(high) && !isNaN(low) && !isNaN(open) && !isNaN(close) &&
                isFinite(high) && isFinite(low) && isFinite(open) && isFinite(close) &&
                high > 0 && low > 0 && open > 0 && close > 0) {
                validData.push({ high, low, open, close });
            }
        }
        return validData;
    }
    calculateGarmanKlassVolatility(data) {
        let sumSquaredReturns = 0;
        for (const bar of data) {
            const { high, low, open, close } = bar;
            // Calculate log returns
            const logHL = Math.log(high / low);
            const logCO = Math.log(close / open);
            // Garman-Klass formula
            const squaredReturn = 0.5 * Math.pow(logHL, 2) - (2 * Math.log(2) - 1) * Math.pow(logCO, 2);
            sumSquaredReturns += squaredReturn;
        }
        // Calculate average volatility
        const avgVolatility = Math.sqrt(sumSquaredReturns / data.length);
        return isFinite(avgVolatility) ? avgVolatility : NaN;
    }
}
/**
 * Calculate Garman-Klass Volatility using wrapper function
 *
 * @param data - Market data with OHLC
 * @param length - Calculation period (default: 20)
 * @returns Garman-Klass volatility values array
 */
export function garmanKlassVolatility(data, length) {
    const indicator = new GarmanKlassVolatilityIndicator();
    const config = {};
    if (length !== undefined) {
        config.length = length;
    }
    const result = indicator.calculate(data, config);
    return result.values;
}
