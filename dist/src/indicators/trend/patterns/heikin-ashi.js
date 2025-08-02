import { BaseIndicator } from '@core/base/base-indicator';
import { validateMarketDataOnly } from '@core/utils/validation-utils';
/**
 * Heikin-Ashi Indicator
 *
 * Calculates Heikin-Ashi candlestick values from OHLC data.
 * Formula:
 * - HA_Close = (O + H + L + C) / 4
 * - HA_Open = (Previous HA_Open + Previous HA_Close) / 2
 * - HA_High = max(H, HA_Open, HA_Close)
 * - HA_Low = min(L, HA_Open, HA_Close)
 *
 * @example
 * ```typescript
 * const ha = heikinAshi(data)
 * console.log(ha.open) // Heikin-Ashi open values
 * console.log(ha.high) // Heikin-Ashi high values
 * ```
 */
export class HeikinAshiIndicator extends BaseIndicator {
    constructor() {
        super('HeikinAshi', 'Heikin-Ashi Candlesticks', 'trend');
    }
    validateInput(data, _config) {
        validateMarketDataOnly(data);
    }
    calculate(data, _config) {
        this.validateInput(data);
        const marketData = data;
        const haOpen = [];
        const haHigh = [];
        const haLow = [];
        const haClose = [];
        for (let i = 0; i < marketData.close.length; i++) {
            const open = marketData.open[i];
            const high = marketData.high[i];
            const low = marketData.low[i];
            const close = marketData.close[i];
            if (isNaN(open) || isNaN(high) || isNaN(low) || isNaN(close)) {
                haOpen.push(NaN);
                haHigh.push(NaN);
                haLow.push(NaN);
                haClose.push(NaN);
                continue;
            }
            // Calculate Heikin-Ashi close
            const haCloseValue = (open + high + low + close) / 4;
            haClose.push(haCloseValue);
            // Calculate Heikin-Ashi open
            let haOpenValue;
            if (i === 0) {
                haOpenValue = (open + close) / 2;
            }
            else {
                haOpenValue = (haOpen[i - 1] + haClose[i - 1]) / 2;
            }
            haOpen.push(haOpenValue);
            // Calculate Heikin-Ashi high and low
            const haHighValue = Math.max(high, haOpenValue, haCloseValue);
            const haLowValue = Math.min(low, haOpenValue, haCloseValue);
            haHigh.push(haHighValue);
            haLow.push(haLowValue);
        }
        return {
            // Use close as primary values
            values: haClose,
            metadata: {
                length: marketData.close.length,
                source: 'heikin-ashi',
                open: haOpen,
                high: haHigh,
                low: haLow,
                close: haClose
            }
        };
    }
}
/**
 * Calculate Heikin-Ashi values using wrapper function
 *
 * @param data - Market data with OHLC
 * @returns Heikin-Ashi OHLC values
 */
export function heikinAshi(data) {
    const indicator = new HeikinAshiIndicator();
    const result = indicator.calculate(data);
    return {
        open: result.metadata['open'],
        high: result.metadata['high'],
        low: result.metadata['low'],
        close: result.metadata['close']
    };
}
