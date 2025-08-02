import { BaseIndicator } from '@core/base/base-indicator';
import { validateMarketDataOnly } from '@core/utils/validation-utils';
/**
 * Fibonacci Expansion Indicator
 * Calculates Fibonacci expansion levels beyond swing high and low points
 */
export class FibonacciExpansionIndicator extends BaseIndicator {
    constructor() {
        super('FibonacciExpansion', 'Fibonacci Expansion', 'trend');
    }
    validateInput(data, _config) {
        validateMarketDataOnly(data);
    }
    /**
     * Calculate Fibonacci expansion levels
     * @param data - Market data with OHLC
     * @param config - Configuration with optional swing detection parameters
     * @returns Fibonacci expansion levels
     */
    calculate(data, config) {
        this.validateInput(data, config);
        const marketData = data;
        const swingPeriod = config?.swingPeriod || 10;
        const levels = config?.levels || [1.272, 1.618, 2.0, 2.618, 3.618];
        const { swingHighs, swingLows } = this.findSwingPoints(marketData, swingPeriod);
        const expansions = this.calculateExpansions(marketData, swingHighs, swingLows, levels);
        return {
            values: expansions.levels,
            metadata: {
                length: marketData.close.length,
                source: 'fibonacci-expansion',
                swingHighs: expansions.swingHighs,
                swingLows: expansions.swingLows,
                level1272: expansions.level1272,
                level1618: expansions.level1618,
                level200: expansions.level200,
                level2618: expansions.level2618,
                level3618: expansions.level3618
            }
        };
    }
    /**
     * Find swing high and low points
     */
    findSwingPoints(data, period) {
        const swingHighs = [];
        const swingLows = [];
        for (let i = period; i < data.high.length - period; i++) {
            if (this.isSwingHigh(data, i, period)) {
                swingHighs.push(i);
            }
            if (this.isSwingLow(data, i, period)) {
                swingLows.push(i);
            }
        }
        return { swingHighs, swingLows };
    }
    /**
     * Check if point is a swing high
     */
    isSwingHigh(data, index, period) {
        for (let j = index - period; j <= index + period; j++) {
            if (j === index) {
                continue;
            }
            if (data.high[j] && data.high[index] && data.high[j] >= data.high[index]) {
                return false;
            }
        }
        return true;
    }
    /**
     * Check if point is a swing low
     */
    isSwingLow(data, index, period) {
        for (let j = index - period; j <= index + period; j++) {
            if (j === index) {
                continue;
            }
            if (data.low[j] && data.low[index] && data.low[j] <= data.low[index]) {
                return false;
            }
        }
        return true;
    }
    /**
     * Calculate Fibonacci expansion levels
     */
    calculateExpansions(data, swingHighs, swingLows, _levels) {
        const expansions = [];
        const level1272 = [];
        const level1618 = [];
        const level200 = [];
        const level2618 = [];
        const level3618 = [];
        for (let i = 0; i < data.close.length; i++) {
            const result = this.calculateExpansionForIndex(data, swingHighs, swingLows, i);
            level1272.push(result.level1272);
            level1618.push(result.level1618);
            level200.push(result.level200);
            level2618.push(result.level2618);
            level3618.push(result.level3618);
            expansions.push(result.currentLevel);
        }
        return {
            levels: expansions,
            swingHighs,
            swingLows,
            level1272,
            level1618,
            level200,
            level2618,
            level3618
        };
    }
    /**
     * Calculate expansion levels for a specific index
     */
    calculateExpansionForIndex(data, swingHighs, swingLows, index) {
        const recentSwingHigh = this.findMostRecentSwing(swingHighs, index);
        const recentSwingLow = this.findMostRecentSwing(swingLows, index);
        if (recentSwingHigh === -1 || recentSwingLow === -1) {
            return this.getNaNLevels();
        }
        const highPrice = data.high[recentSwingHigh];
        const lowPrice = data.low[recentSwingLow];
        if (!highPrice || !lowPrice) {
            return this.getNaNLevels();
        }
        const range = highPrice - lowPrice;
        if (range <= 0) {
            return this.getNaNLevels();
        }
        const currentPrice = data.close[index];
        if (currentPrice === undefined) {
            return this.getNaNLevels();
        }
        return this.calculateExpansionLevels(highPrice, range, currentPrice);
    }
    /**
     * Calculate expansion levels from swing high
     */
    calculateExpansionLevels(highPrice, range, currentPrice) {
        const level1272Val = highPrice + (range * 0.272);
        const level1618Val = highPrice + (range * 0.618);
        const level200Val = highPrice + range;
        const level2618Val = highPrice + (range * 1.618);
        const level3618Val = highPrice + (range * 2.618);
        const currentLevel = this.determineCurrentLevel(currentPrice, highPrice, level1272Val, level1618Val, level200Val, level2618Val);
        return {
            level1272: level1272Val,
            level1618: level1618Val,
            level200: level200Val,
            level2618: level2618Val,
            level3618: level3618Val,
            currentLevel
        };
    }
    /**
     * Determine current expansion level based on price position
     */
    determineCurrentLevel(currentPrice, highPrice, level1272, level1618, level200, level2618) {
        if (currentPrice <= highPrice) {
            return 1;
        }
        if (currentPrice <= level1272) {
            return 1.272;
        }
        if (currentPrice <= level1618) {
            return 1.618;
        }
        if (currentPrice <= level200) {
            return 2.0;
        }
        if (currentPrice <= level2618) {
            return 2.618;
        }
        return 3.618;
    }
    /**
     * Return NaN levels for invalid cases
     */
    getNaNLevels() {
        return {
            level1272: NaN,
            level1618: NaN,
            level200: NaN,
            level2618: NaN,
            level3618: NaN,
            currentLevel: NaN
        };
    }
    /**
     * Find the most recent swing point before the current index
     */
    findMostRecentSwing(swingPoints, currentIndex) {
        for (let i = swingPoints.length - 1; i >= 0; i--) {
            const point = swingPoints[i];
            if (point !== undefined && point <= currentIndex) {
                return point;
            }
        }
        return -1;
    }
}
/**
 * Calculate Fibonacci expansion levels
 * @param data - Market data with OHLC
 * @param swingPeriod - Period for swing detection (default: 10)
 * @param levels - Fibonacci expansion levels to calculate (default: [1.272, 1.618, 2.0, 2.618, 3.618])
 * @returns Fibonacci expansion levels and metadata
 */
export function fibonacciExpansion(data, swingPeriod, levels) {
    const indicator = new FibonacciExpansionIndicator();
    const result = indicator.calculate(data, {
        swingPeriod: swingPeriod || 10,
        levels: levels || [1.272, 1.618, 2.0, 2.618, 3.618]
    });
    return {
        levels: result.values,
        swingHighs: result.metadata['swingHighs'],
        swingLows: result.metadata['swingLows'],
        level1272: result.metadata['level1272'],
        level1618: result.metadata['level1618'],
        level200: result.metadata['level200'],
        level2618: result.metadata['level2618'],
        level3618: result.metadata['level3618']
    };
}
