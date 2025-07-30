// ===== PRICE CALCULATIONS =====
/**
 * Centralized price calculation functions
 * Pine Script equivalents: hl2, hlc3, ohlc4
 */
export const PriceCalculations = {
    /**
     * Calculate typical price (HLC3)
     */
    typical: (data) => {
        return data.high.map((high, i) => (high + data.low[i] + data.close[i]) / 3);
    },
    /**
     * Calculate HL2 (High + Low) / 2
     */
    hl2: (data) => {
        return data.high.map((high, i) => (high + data.low[i]) / 2);
    },
    /**
     * Calculate OHLC4 (Open + High + Low + Close) / 4
     */
    ohlc4: (data) => {
        return data.high.map((high, i) => (data.open[i] + high + data.low[i] + data.close[i]) / 4);
    }
};
// Legacy exports for backward compatibility
export const calculateTypicalPrice = PriceCalculations.typical;
export const calculateHL2 = PriceCalculations.hl2;
export const calculateOHLC4 = PriceCalculations.ohlc4;
// ===== ARRAY OPERATIONS =====
export function combineArrays(arr1, arr2, operation) {
    const result = [];
    const maxLength = Math.max(arr1.length, arr2.length);
    for (let i = 0; i < maxLength; i++) {
        const val1 = arr1[i] || 0;
        const val2 = arr2[i] || 0;
        let value;
        switch (operation) {
            case 'add':
                value = val1 + val2;
                break;
            case 'subtract':
                value = val1 - val2;
                break;
            case 'multiply':
                value = val1 * val2;
                break;
            case 'divide':
                value = val1 / val2;
                break;
            case 'safe-add':
                value = isNaN(val1) || isNaN(val2) ? NaN : val1 + val2;
                break;
            case 'safe-subtract':
                value = isNaN(val1) || isNaN(val2) ? NaN : val1 - val2;
                break;
            default:
                value = NaN;
        }
        result.push(value);
    }
    return result;
}
// ===== PRICE CHANGE CALCULATIONS =====
export function calculatePriceChanges(data) {
    if (data.length < 2) {
        return [];
    }
    const result = [];
    for (let i = 1; i < data.length; i++) {
        result.push(data[i] - data[i - 1]);
    }
    return result;
}
export function calculateGainsAndLosses(changes) {
    const gains = [];
    const losses = [];
    for (const change of changes) {
        if (change > 0) {
            gains.push(change);
            losses.push(0);
        }
        else {
            gains.push(0);
            losses.push(Math.abs(change));
        }
    }
    return { gains, losses };
}
// ===== STATISTICAL CALCULATIONS =====
export function calculateMean(data) {
    return data.reduce((sum, val) => sum + val, 0) / data.length;
}
export function calculateVariance(data, mean, useSampleVariance = true) {
    const divisor = useSampleVariance ? data.length - 1 : data.length;
    return data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / divisor;
}
export function calculateStandardDeviation(data, useSampleVariance = true) {
    const mean = calculateMean(data);
    const variance = calculateVariance(data, mean, useSampleVariance);
    return Math.sqrt(variance);
}
/**
 * Calculate mean deviation from average
 *
 * @param values - Array of values
 * @param average - Average value (if not provided, calculates from values)
 * @returns Mean deviation value
 */
export function calculateMeanDeviation(values, average) {
    if (values.length === 0) {
        return 0;
    }
    const avg = average ?? calculateMean(values);
    const deviations = values.map(val => Math.abs(val - avg));
    return deviations.reduce((sum, dev) => sum + dev, 0) / values.length;
}
// ===== ROLLING WINDOW CALCULATIONS =====
export function rollingWindow(data, windowSize, callback) {
    const result = [];
    for (let i = 0; i < data.length; i++) {
        if (i < windowSize - 1) {
            result.push(NaN);
            continue;
        }
        const window = data.slice(i - windowSize + 1, i + 1);
        result.push(callback(window));
    }
    return result;
}
// Unified rolling statistics function to eliminate duplication
export function calculateRollingStatistic(data, length, statistic) {
    if (length <= 0 || data.length === 0) {
        return [];
    }
    const result = [];
    for (let i = 0; i < data.length; i++) {
        if (i < length - 1) {
            result.push(NaN);
            continue;
        }
        const slice = data.slice(i - length + 1, i + 1);
        const validSlice = slice.filter(val => !isNaN(val) && isFinite(val));
        if (validSlice.length === 0) {
            result.push(NaN);
            continue;
        }
        let value;
        switch (statistic) {
            case 'min':
                value = Math.min(...validSlice);
                break;
            case 'max':
                value = Math.max(...validSlice);
                break;
            case 'sum':
                value = validSlice.reduce((sum, val) => sum + val, 0);
                break;
            case 'mean':
                value = validSlice.reduce((sum, val) => sum + val, 0) / validSlice.length;
                break;
            case 'variance': {
                const mean = validSlice.reduce((sum, val) => sum + val, 0) / validSlice.length;
                value = validSlice.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / validSlice.length;
                break;
            }
            default:
                value = NaN;
        }
        result.push(value);
    }
    return result;
}
// ===== INDICATOR CALCULATIONS =====
export function calculateIndicatorWithPadding(data, length, calculator) {
    const padding = new Array(length - 1).fill(NaN);
    const calculated = calculator(data, length);
    return [...padding, ...calculated];
}
// ===== SMOOTHING FUNCTIONS =====
export function exponentialSmoothing(data, alpha) {
    if (data.length === 0) {
        return [];
    }
    const result = [data[0]];
    for (let i = 1; i < data.length; i++) {
        const smoothed = alpha * data[i] + (1 - alpha) * result[i - 1];
        result.push(smoothed);
    }
    return result;
}
export function wildersSmoothing(data, length) {
    if (data.length === 0) {
        return [];
    }
    const alpha = 1 / length;
    const result = [data[0]];
    for (let i = 1; i < data.length; i++) {
        const smoothed = alpha * data[i] + (1 - alpha) * result[i - 1];
        result.push(smoothed);
    }
    return result;
}
// ===== UTILITY FUNCTIONS =====
export function safeDivision(numerator, denominator, defaultValue = 0) {
    if (denominator === 0 || isNaN(denominator) || !isFinite(denominator)) {
        return defaultValue;
    }
    return numerator / denominator;
}
export function fillNaN(length, offset = 0) {
    return new Array(offset).fill(NaN).concat(new Array(length - offset).fill(0));
}
export function shiftArray(arr, shift) {
    return new Array(shift).fill(NaN).concat(arr.slice(0, -shift));
}
// ===== RSI CALCULATION =====
export function calculateRSI(data, length) {
    if (data.length < length + 1) {
        return new Array(data.length).fill(NaN);
    }
    const changes = calculatePriceChanges(data);
    const { gains, losses } = calculateGainsAndLosses(changes);
    const avgGains = wildersSmoothing(gains, length);
    const avgLosses = wildersSmoothing(losses, length);
    const result = [];
    for (let i = 0; i < data.length; i++) {
        if (i < length) {
            result.push(NaN);
            continue;
        }
        const avgGain = avgGains[i - 1];
        const avgLoss = avgLosses[i - 1];
        if (avgLoss === 0) {
            result.push(100);
        }
        else {
            const rs = avgGain / avgLoss;
            const rsi = 100 - (100 / (1 + rs));
            result.push(rsi);
        }
    }
    return result;
}
// ===== CCI CALCULATION =====
export function calculateCCI(data, length) {
    if (data.length < length) {
        return new Array(data.length).fill(NaN);
    }
    const result = [];
    for (let i = 0; i < data.length; i++) {
        if (i < length - 1) {
            result.push(NaN);
            continue;
        }
        const periodData = data.slice(i - length + 1, i + 1);
        const sma = calculateMean(periodData);
        const meanDev = calculateMeanDeviation(periodData, sma);
        const cci = safeDivision(data[i] - sma, 0.015 * meanDev);
        result.push(cci);
    }
    return result;
}
//# sourceMappingURL=calculation-utils.js.map