import { BaseIndicator } from '@base/base-indicator';
import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { ArrayUtils } from '@utils/array-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { MathUtils } from '@utils/math-utils';
/**
 * Candlestick Pattern Types
 * Defines common candlestick patterns for identification
 */
export var CandlestickPattern;
(function (CandlestickPattern) {
    CandlestickPattern[CandlestickPattern["DOJI"] = 1] = "DOJI";
    CandlestickPattern[CandlestickPattern["HAMMER"] = 2] = "HAMMER";
    CandlestickPattern[CandlestickPattern["SHOOTING_STAR"] = 3] = "SHOOTING_STAR";
    CandlestickPattern[CandlestickPattern["ENGULFING_BULLISH"] = 4] = "ENGULFING_BULLISH";
    CandlestickPattern[CandlestickPattern["ENGULFING_BEARISH"] = 5] = "ENGULFING_BEARISH";
    CandlestickPattern[CandlestickPattern["MORNING_STAR"] = 6] = "MORNING_STAR";
    CandlestickPattern[CandlestickPattern["EVENING_STAR"] = 7] = "EVENING_STAR";
    CandlestickPattern[CandlestickPattern["HANGING_MAN"] = 8] = "HANGING_MAN";
    CandlestickPattern[CandlestickPattern["INVERTED_HAMMER"] = 9] = "INVERTED_HAMMER";
    CandlestickPattern[CandlestickPattern["SPINNING_TOP"] = 10] = "SPINNING_TOP";
    CandlestickPattern[CandlestickPattern["MARUBOZU"] = 11] = "MARUBOZU";
    CandlestickPattern[CandlestickPattern["NONE"] = 0] = "NONE";
})(CandlestickPattern || (CandlestickPattern = {}));
/**
 * Detect Doji pattern
 */
function detectDoji(bodySize, totalRange, sensitivity) {
    return bodySize <= totalRange * sensitivity && totalRange > 0;
}
/**
 * Detect Hammer pattern
 */
function detectHammer(bodySize, totalRange, upperShadow, lowerShadow) {
    return bodySize <= totalRange * 0.3 &&
        lowerShadow >= totalRange * 0.6 &&
        upperShadow <= totalRange * 0.1;
}
/**
 * Detect Shooting Star pattern
 */
function detectShootingStar(bodySize, totalRange, upperShadow, lowerShadow) {
    return bodySize <= totalRange * 0.3 &&
        upperShadow >= totalRange * 0.6 &&
        lowerShadow <= totalRange * 0.1;
}
/**
 * Detect Spinning Top pattern
 */
function detectSpinningTop(bodySize, totalRange, upperShadow, lowerShadow) {
    return bodySize <= totalRange * 0.3 &&
        upperShadow >= totalRange * 0.3 &&
        lowerShadow >= totalRange * 0.3;
}
/**
 * Detect Marubozu pattern
 */
function detectMarubozu(bodySize, totalRange) {
    return bodySize >= totalRange * 0.9;
}
/**
 * Detect Engulfing patterns
 */
function detectEngulfingPatterns(open, close, prevOpen, prevClose) {
    // Bullish Engulfing
    if (prevClose < prevOpen && close > open &&
        open < prevClose && close > prevOpen) {
        return CandlestickPattern.ENGULFING_BULLISH;
    }
    // Bearish Engulfing
    if (prevClose > prevOpen && close < open &&
        open > prevClose && close < prevOpen) {
        return CandlestickPattern.ENGULFING_BEARISH;
    }
    return CandlestickPattern.NONE;
}
/**
 * Detect Morning/Evening Star patterns
 */
function detectStarPatterns(open, close, prevOpen, prevClose, prev2Open, prev2Close, bodySize, prevBodySize) {
    const prev2BodySize = MathUtils.abs(prev2Close - prev2Open);
    // Morning Star
    if (prev2BodySize > prevBodySize * 2 &&
        bodySize > prevBodySize * 2 &&
        prevClose < prevOpen && close > open) {
        return CandlestickPattern.MORNING_STAR;
    }
    // Evening Star
    if (prev2BodySize > prevBodySize * 2 &&
        bodySize > prevBodySize * 2 &&
        prevClose > prevOpen && close < open) {
        return CandlestickPattern.EVENING_STAR;
    }
    return CandlestickPattern.NONE;
}
/**
 * Calculate candlestick patterns using OHLC data
 * Identifies common candlestick patterns based on price relationships
 *
 * @param data - Market data with OHLC arrays
 * @param sensitivity - Pattern detection sensitivity (default: 0.1)
 * @returns Array of candlestick pattern values
 */
function calculateCandlestickPatterns(data, sensitivity = 0.1) {
    return ArrayUtils.processArray(data.close, (_, i) => {
        if (i < 2) {
            return CandlestickPattern.NONE;
        }
        const open = data.open[i];
        const high = data.high[i];
        const low = data.low[i];
        const close = data.close[i];
        const prevOpen = data.open[i - 1];
        const prevClose = data.close[i - 1];
        const bodySize = MathUtils.abs(close - open);
        const totalRange = high - low;
        const upperShadow = high - MathUtils.max([open, close]);
        const lowerShadow = MathUtils.min([open, close]) - low;
        const prevBodySize = MathUtils.abs(prevClose - prevOpen);
        // Check basic patterns
        if (detectDoji(bodySize, totalRange, sensitivity)) {
            return CandlestickPattern.DOJI;
        }
        if (detectHammer(bodySize, totalRange, upperShadow, lowerShadow)) {
            return CandlestickPattern.HAMMER;
        }
        if (detectShootingStar(bodySize, totalRange, upperShadow, lowerShadow)) {
            return CandlestickPattern.SHOOTING_STAR;
        }
        if (detectSpinningTop(bodySize, totalRange, upperShadow, lowerShadow)) {
            return CandlestickPattern.SPINNING_TOP;
        }
        if (detectMarubozu(bodySize, totalRange)) {
            return CandlestickPattern.MARUBOZU;
        }
        // Check engulfing patterns
        const engulfingPattern = detectEngulfingPatterns(open, close, prevOpen, prevClose);
        if (engulfingPattern !== CandlestickPattern.NONE) {
            return engulfingPattern;
        }
        // Check star patterns (3-candle patterns)
        if (i >= 2) {
            const prev2Open = data.open[i - 2];
            const prev2Close = data.close[i - 2];
            const starPattern = detectStarPatterns(open, close, prevOpen, prevClose, prev2Open, prev2Close, bodySize, prevBodySize);
            if (starPattern !== CandlestickPattern.NONE) {
                return starPattern;
            }
        }
        return CandlestickPattern.NONE;
    });
}
/**
 * Candlestick Patterns Indicator
 *
 * Identifies common candlestick patterns in price data.
 * Returns pattern type values based on OHLC relationships.
 * Higher values indicate stronger pattern signals.
 *
 * @example
 * ```typescript
 * const patterns = new CandlestickPatterns()
 * const result = patterns.calculate(marketData, { sensitivity: 0.1 })
 * console.log(result.values) // Pattern type values
 * ```
 */
export class CandlestickPatterns extends BaseIndicator {
    constructor() {
        super('CandlestickPatterns', 'Candlestick Pattern Recognition', 'trend');
    }
    validateInput(data, config) {
        if (Array.isArray(data)) {
            throw new Error(ERROR_MESSAGES.MISSING_OHLC);
        }
        const sensitivity = config?.['sensitivity'] || 0.1;
        if (sensitivity <= 0 || sensitivity > 1) {
            throw new Error('Sensitivity must be between 0 and 1');
        }
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const sensitivity = config?.['sensitivity'] || 0.1;
        const values = calculateCandlestickPatterns(data, sensitivity);
        return {
            values,
            metadata: {
                length: values.length,
                sensitivity,
                source: config?.source || 'close'
            }
        };
    }
}
/**
 * Calculate candlestick patterns using wrapper function
 *
 * @param data - Market data with OHLC arrays
 * @param sensitivity - Pattern detection sensitivity (default: 0.1)
 * @returns Array of candlestick pattern values
 */
export function candlestickPatterns(data, sensitivity = 0.1) {
    return createIndicatorWrapper(CandlestickPatterns, data, undefined, undefined, { sensitivity });
}
