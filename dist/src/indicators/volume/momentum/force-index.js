import { BaseIndicator } from '@core/base/base-indicator';
import { validateMarketDataOnly } from '@core/utils/validation-utils';
/**
 * Force Index Indicator
 * Measures the force behind price movements using volume
 */
export class ForceIndexIndicator extends BaseIndicator {
    constructor() {
        super('ForceIndex', 'Force Index', 'volume');
    }
    validateInput(data, _config) {
        validateMarketDataOnly(data);
    }
    /**
     * Calculate Force Index
     * @param data - Market data with OHLC and volume
     * @param config - Configuration with optional smoothing period
     * @returns Force Index values
     */
    calculate(data, config) {
        this.validateInput(data, config);
        const marketData = data;
        const smoothingPeriod = config?.smoothingPeriod || 13;
        const forceIndex = this.calculateForceIndex(marketData, smoothingPeriod);
        return {
            values: forceIndex.values,
            metadata: {
                length: marketData.close.length,
                source: 'force-index',
                smoothingPeriod,
                rawForceIndex: forceIndex.rawForceIndex,
                smoothedForceIndex: forceIndex.smoothedForceIndex
            }
        };
    }
    /**
     * Calculate Force Index
     */
    calculateForceIndex(data, smoothingPeriod) {
        const rawForceIndex = [];
        const smoothedForceIndex = [];
        const values = [];
        // Calculate raw Force Index: Volume * (Current Close - Previous Close)
        for (let i = 0; i < data.close.length; i++) {
            if (i === 0) {
                rawForceIndex.push(0);
                continue;
            }
            const currentClose = data.close[i];
            const previousClose = data.close[i - 1];
            const volume = data.volume?.[i] || 0;
            if (currentClose !== undefined && previousClose !== undefined) {
                const forceValue = volume * (currentClose - previousClose);
                rawForceIndex.push(forceValue);
            }
            else {
                rawForceIndex.push(NaN);
            }
        }
        // Apply smoothing (EMA) to the raw Force Index
        let ema = 0;
        const alpha = 2 / (smoothingPeriod + 1);
        for (let i = 0; i < rawForceIndex.length; i++) {
            const rawValue = rawForceIndex[i];
            if (i === 0) {
                ema = rawValue || 0;
            }
            else if (rawValue !== undefined) {
                ema = (alpha * rawValue) + ((1 - alpha) * ema);
            }
            smoothedForceIndex.push(ema);
            values.push(ema);
        }
        return {
            values,
            rawForceIndex,
            smoothedForceIndex
        };
    }
}
/**
 * Calculate Force Index
 * @param data - Market data with OHLC and volume
 * @param smoothingPeriod - Period for smoothing (default: 13)
 * @returns Force Index values and metadata
 */
export function forceIndex(data, smoothingPeriod) {
    const indicator = new ForceIndexIndicator();
    const config = {};
    if (smoothingPeriod !== undefined) {
        config.smoothingPeriod = smoothingPeriod;
    }
    const result = indicator.calculate(data, config);
    return {
        values: result.values,
        rawForceIndex: result.metadata['rawForceIndex'],
        smoothedForceIndex: result.metadata['smoothedForceIndex']
    };
}
