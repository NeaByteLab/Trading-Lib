import { BaseIndicator } from '@base/base-indicator';
import { DEFAULT_LENGTHS, DEFAULT_MULTIPLIERS, ERROR_MESSAGES } from '@constants/indicator-constants';
import { atr } from '@indicators/volatility/range/atr';
import { ArrayUtils } from '@utils/array-utils';
import { PriceCalculations } from '@utils/calculation-utils';
import { createMultiResultIndicatorWrapper } from '@utils/indicator-utils';
import { PineCore } from '@utils/pine-core';
import { pineLength } from '@utils/pine-script-utils';
/**
 * Super Trend indicator
 *
 * A trend-following indicator that combines ATR with price action.
 * Formula: Super Trend = ATR-based dynamic support/resistance levels
 *
 * @example
 * ```typescript
 * const superTrend = new SuperTrend()
 * const result = superTrend.calculate(marketData, { length: 10, multiplier: 3 })
 * console.log(result.values) // Super Trend values
 * console.log(result.metadata.direction) // Trend direction
 * ```
 */
export class SuperTrend extends BaseIndicator {
    constructor() {
        super('SuperTrend', 'Super Trend', 'trend');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        if (Array.isArray(data)) {
            throw new Error(ERROR_MESSAGES.MISSING_OHLC);
        }
        const period = pineLength(config?.length || DEFAULT_LENGTHS.SUPER_TREND, DEFAULT_LENGTHS.SUPER_TREND);
        const multiplier = config?.['multiplier'] || DEFAULT_MULTIPLIERS.SUPER_TREND;
        const { superTrend, direction } = this.calculateSuperTrend(data, period, multiplier);
        return {
            values: superTrend,
            metadata: {
                length: period,
                multiplier,
                source: 'hlc3',
                direction
            }
        };
    }
    calculateSuperTrend(data, period, multiplier) {
        const atrValues = atr(data, period);
        const superTrend = [];
        const direction = [];
        let prevSuperTrend = 0;
        let prevDirection = 0;
        const results = ArrayUtils.processArray(data.close, (_, i) => {
            if (i < period) {
                superTrend.push(NaN);
                direction.push(NaN);
                return { superTrend: NaN, direction: NaN };
            }
            const high = data.high[i];
            const low = data.low[i];
            const close = data.close[i];
            const atrValue = atrValues[i];
            const { basicUpper, basicLower } = this.calculateBasicBands(high, low, atrValue, multiplier);
            const { finalUpper, finalLower } = this.calculateFinalBands(basicUpper, basicLower, prevSuperTrend, prevSuperTrend, i, period);
            const { superTrendValue, currentDirection } = this.calculateSuperTrendValue(prevSuperTrend, finalUpper, finalLower, close, prevDirection);
            prevSuperTrend = superTrendValue;
            prevDirection = currentDirection;
            superTrend.push(superTrendValue);
            direction.push(currentDirection);
            return { superTrend: superTrendValue, direction: currentDirection };
        });
        return {
            superTrend: ArrayUtils.processArray(results, r => r.superTrend),
            direction: ArrayUtils.processArray(results, r => r.direction)
        };
    }
    /**
     * Calculate basic upper and lower bands
     */
    calculateBasicBands(high, low, atrValue, multiplier) {
        const hl2 = PriceCalculations.hl2({ high: [high], low: [low] })[0];
        const basicUpper = hl2 + (multiplier * atrValue);
        const basicLower = hl2 - (multiplier * atrValue);
        return { basicUpper, basicLower };
    }
    /**
     * Calculate final upper and lower bands
     */
    calculateFinalBands(basicUpper, basicLower, prevFinalUpper, prevFinalLower, index, period) {
        if (index === period) {
            return { finalUpper: basicUpper, finalLower: basicLower };
        }
        const finalLower = PineCore.max([basicLower, prevFinalLower]);
        const finalUpper = PineCore.min([basicUpper, prevFinalUpper]);
        return { finalUpper, finalLower };
    }
    /**
     * Calculate Super Trend value based on current conditions
     */
    calculateSuperTrendValue(prevSuperTrend, finalUpper, finalLower, currentClose, prevDirection) {
        if (prevSuperTrend <= finalUpper && currentClose <= finalUpper) {
            return { superTrendValue: finalUpper, currentDirection: 1 };
        }
        if (prevSuperTrend >= finalLower && currentClose >= finalLower) {
            return { superTrendValue: finalLower, currentDirection: -1 };
        }
        if (currentClose > finalUpper) {
            return { superTrendValue: finalLower, currentDirection: -1 };
        }
        if (currentClose < finalLower) {
            return { superTrendValue: finalUpper, currentDirection: 1 };
        }
        return { superTrendValue: prevSuperTrend, currentDirection: prevDirection };
    }
}
/**
 * Calculate Super Trend values using wrapper function
 *
 * @param data - Market data
 * @param length - ATR period (default: 10)
 * @param multiplier - ATR multiplier (default: 3)
 * @returns Super Trend values and direction
 */
export function superTrend(data, length, multiplier) {
    const result = createMultiResultIndicatorWrapper(SuperTrend, data, length, undefined, { multiplier });
    return {
        superTrend: result.values,
        direction: result.metadata['direction']
    };
}
