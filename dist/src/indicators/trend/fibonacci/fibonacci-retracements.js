import { BaseIndicator } from '@core/base/base-indicator';
import { validateMarketDataOnly } from '@core/utils/validation-utils';
/**
 * Fibonacci Retracements Indicator
 * Calculates Fibonacci retracement levels based on swing high and low points
 */
export class FibonacciRetracementsIndicator extends BaseIndicator {
    constructor() {
        super('FibonacciRetracements', 'Fibonacci Retracements', 'trend');
    }
    validateInput(data, _config) {
        validateMarketDataOnly(data);
    }
    /**
     * Calculate Fibonacci retracement levels
     * @param data - Market data with OHLC
     * @param config - Configuration with optional swing detection parameters
     * @returns Fibonacci retracement levels
     */
    calculate(data, config) {
        this.validateInput(data, config);
        const marketData = data;
        const swingPeriod = config?.swingPeriod || 10;
        const levels = config?.levels || [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
        const { swingHighs, swingLows } = this.findSwingPoints(marketData, swingPeriod);
        const retracements = this.calculateRetracements(marketData, swingHighs, swingLows, levels);
        return {
            values: retracements.levels,
            metadata: {
                length: marketData.close.length,
                source: 'fibonacci-retracements',
                swingHighs: retracements.swingHighs,
                swingLows: retracements.swingLows,
                level0: retracements.level0,
                level236: retracements.level236,
                level382: retracements.level382,
                level500: retracements.level500,
                level618: retracements.level618,
                level786: retracements.level786,
                level100: retracements.level100
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
            const highJ = data.high[j];
            const highIndex = data.high[index];
            if (highJ !== undefined && highIndex !== undefined && highJ >= highIndex) {
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
            const lowJ = data.low[j];
            const lowIndex = data.low[index];
            if (lowJ !== undefined && lowIndex !== undefined && lowJ <= lowIndex) {
                return false;
            }
        }
        return true;
    }
    /**
     * Calculate Fibonacci retracement levels
     */
    calculateRetracements(data, swingHighs, swingLows, _levels) {
        const retracements = [];
        const level0 = [];
        const level236 = [];
        const level382 = [];
        const level500 = [];
        const level618 = [];
        const level786 = [];
        const level100 = [];
        for (let i = 0; i < data.close.length; i++) {
            const result = this.calculateRetracementForIndex(data, swingHighs, swingLows, i);
            level0.push(result.level0);
            level236.push(result.level236);
            level382.push(result.level382);
            level500.push(result.level500);
            level618.push(result.level618);
            level786.push(result.level786);
            level100.push(result.level100);
            retracements.push(result.currentLevel);
        }
        return {
            levels: retracements,
            swingHighs,
            swingLows,
            level0,
            level236,
            level382,
            level500,
            level618,
            level786,
            level100
        };
    }
    /**
     * Calculate retracement levels for a specific index
     */
    calculateRetracementForIndex(data, swingHighs, swingLows, index) {
        const recentSwingHigh = this.findMostRecentSwing(swingHighs, index);
        const recentSwingLow = this.findMostRecentSwing(swingLows, index);
        if (recentSwingHigh === -1 || recentSwingLow === -1) {
            return this.getNaNRetracementLevels();
        }
        const highPrice = data.high[recentSwingHigh];
        const lowPrice = data.low[recentSwingLow];
        const currentPrice = data.close[index];
        if (highPrice === undefined || lowPrice === undefined || currentPrice === undefined) {
            return this.getNaNRetracementLevels();
        }
        const range = highPrice - lowPrice;
        if (range <= 0) {
            return this.getNaNRetracementLevels();
        }
        return this.calculateRetracementLevels(highPrice, lowPrice, range, currentPrice);
    }
    /**
     * Calculate retracement levels from swing points
     */
    calculateRetracementLevels(highPrice, lowPrice, range, currentPrice) {
        const level0Val = highPrice;
        const level236Val = highPrice - (range * 0.236);
        const level382Val = highPrice - (range * 0.382);
        const level500Val = highPrice - (range * 0.5);
        const level618Val = highPrice - (range * 0.618);
        const level786Val = highPrice - (range * 0.786);
        const level100Val = lowPrice;
        const currentLevel = this.determineRetracementLevel(currentPrice, level0Val, level236Val, level382Val, level500Val, level618Val, level786Val);
        return {
            level0: level0Val,
            level236: level236Val,
            level382: level382Val,
            level500: level500Val,
            level618: level618Val,
            level786: level786Val,
            level100: level100Val,
            currentLevel
        };
    }
    /**
     * Determine current retracement level based on price position
     */
    determineRetracementLevel(currentPrice, level0, level236, level382, level500, level618, level786) {
        if (currentPrice >= level0) {
            return 0;
        }
        if (currentPrice >= level236) {
            return 0.236;
        }
        if (currentPrice >= level382) {
            return 0.382;
        }
        if (currentPrice >= level500) {
            return 0.5;
        }
        if (currentPrice >= level618) {
            return 0.618;
        }
        if (currentPrice >= level786) {
            return 0.786;
        }
        return 1;
    }
    /**
     * Return NaN retracement levels for invalid cases
     */
    getNaNRetracementLevels() {
        return {
            level0: NaN,
            level236: NaN,
            level382: NaN,
            level500: NaN,
            level618: NaN,
            level786: NaN,
            level100: NaN,
            currentLevel: NaN
        };
    }
    /**
     * Find the most recent swing point before the current index
     */
    findMostRecentSwing(swingPoints, currentIndex) {
        for (let i = swingPoints.length - 1; i >= 0; i--) {
            const swingPoint = swingPoints[i];
            if (swingPoint !== undefined && swingPoint <= currentIndex) {
                return swingPoint;
            }
        }
        return -1;
    }
}
/**
 * Calculate Fibonacci retracement levels
 * @param data - Market data with OHLC
 * @param swingPeriod - Period for swing detection (default: 10)
 * @param levels - Fibonacci levels to calculate (default: [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1])
 * @returns Fibonacci retracement levels and metadata
 */
export function fibonacciRetracements(data, swingPeriod, levels) {
    const indicator = new FibonacciRetracementsIndicator();
    const config = {};
    if (swingPeriod !== undefined) {
        config.swingPeriod = swingPeriod;
    }
    if (levels !== undefined) {
        config.levels = levels;
    }
    const result = indicator.calculate(data, config);
    return {
        levels: result.values,
        swingHighs: result.metadata['swingHighs'],
        swingLows: result.metadata['swingLows'],
        level0: result.metadata['level0'],
        level236: result.metadata['level236'],
        level382: result.metadata['level382'],
        level500: result.metadata['level500'],
        level618: result.metadata['level618'],
        level786: result.metadata['level786'],
        level100: result.metadata['level100']
    };
}
