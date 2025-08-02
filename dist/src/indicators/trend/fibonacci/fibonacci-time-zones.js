import { BaseIndicator } from '@core/base/base-indicator';
import { validateMarketDataOnly } from '@core/utils/validation-utils';
/**
 * Fibonacci Time Zones Indicator
 * Calculates Fibonacci time zones based on a starting point
 */
export class FibonacciTimeZonesIndicator extends BaseIndicator {
    constructor() {
        super('FibonacciTimeZones', 'Fibonacci Time Zones', 'trend');
    }
    validateInput(data, _config) {
        validateMarketDataOnly(data);
    }
    /**
     * Calculate Fibonacci time zones
     * @param data - Market data with OHLC
     * @param config - Configuration with time zone parameters
     * @returns Fibonacci time zones
     */
    calculate(data, config) {
        this.validateInput(data, config);
        const marketData = data;
        const startIndex = config?.startIndex || 0;
        const levels = config?.levels || [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
        const timeZones = this.calculateTimeZones(marketData, startIndex, levels);
        return {
            values: timeZones.values,
            metadata: {
                length: marketData.close.length,
                source: 'fibonacci-time-zones',
                startIndex,
                levels,
                timeZonePoints: timeZones.timeZonePoints,
                currentZone: timeZones.currentZone
            }
        };
    }
    /**
     * Calculate Fibonacci time zones
     */
    calculateTimeZones(data, startIndex, levels) {
        const timeZonePoints = this.calculateTimeZonePoints(data, startIndex, levels);
        const { currentZone, values } = this.calculateCurrentZones(data, timeZonePoints, levels);
        return {
            values,
            timeZonePoints,
            currentZone
        };
    }
    /**
     * Calculate time zone points based on Fibonacci levels
     */
    calculateTimeZonePoints(data, startIndex, levels) {
        const timeZonePoints = [];
        for (const level of levels) {
            const timeZoneIndex = startIndex + level;
            if (timeZoneIndex < data.close.length) {
                timeZonePoints.push(timeZoneIndex);
            }
        }
        return timeZonePoints;
    }
    /**
     * Calculate current zone for each data point
     */
    calculateCurrentZones(data, timeZonePoints, levels) {
        const currentZone = [];
        const values = [];
        for (let i = 0; i < data.close.length; i++) {
            const zoneValue = this.findZoneForIndex(i, timeZonePoints, levels);
            currentZone.push(zoneValue);
            values.push(zoneValue);
        }
        return { currentZone, values };
    }
    /**
     * Find which time zone the current index belongs to
     */
    findZoneForIndex(index, timeZonePoints, levels) {
        // Find which time zone the current index belongs to
        for (let j = 0; j < timeZonePoints.length; j++) {
            const timeZonePoint = timeZonePoints[j];
            if (timeZonePoint !== undefined && index <= timeZonePoint) {
                const level = levels[j];
                if (level !== undefined) {
                    return level;
                }
            }
        }
        // If beyond all time zones, use the last one
        if (timeZonePoints.length > 0) {
            const lastLevel = levels[levels.length - 1];
            if (lastLevel !== undefined) {
                return lastLevel;
            }
        }
        return NaN;
    }
}
/**
 * Calculate Fibonacci time zones
 * @param data - Market data with OHLC
 * @param startIndex - Starting index for time zones (default: 0)
 * @param levels - Fibonacci time zone levels (default: [1, 2, 3, 5, 8, 13, 21, 34, 55, 89])
 * @returns Fibonacci time zones and metadata
 */
export function fibonacciTimeZones(data, startIndex, levels) {
    const indicator = new FibonacciTimeZonesIndicator();
    const config = {};
    if (startIndex !== undefined) {
        config.startIndex = startIndex;
    }
    if (levels !== undefined) {
        config.levels = levels;
    }
    const result = indicator.calculate(data, config);
    return {
        values: result.values,
        timeZonePoints: result.metadata['timeZonePoints'],
        currentZone: result.metadata['currentZone']
    };
}
