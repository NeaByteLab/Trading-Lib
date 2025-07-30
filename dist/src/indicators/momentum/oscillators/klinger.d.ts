import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Klinger Oscillator indicator
 *
 * Klinger Oscillator combines price and volume to identify long-term trends.
 * Uses volume force and price force to determine trend direction.
 */
export declare class KlingerOscillator extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], _config?: IndicatorConfig): void;
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Klinger Oscillator values using wrapper function
 *
 * @param data - Market data
 * @param shortPeriod - Short period (default: 34)
 * @param longPeriod - Long period (default: 55)
 * @returns Klinger Oscillator values array
 */
export declare function klinger(data: MarketData, shortPeriod?: number, longPeriod?: number): number[];
//# sourceMappingURL=klinger.d.ts.map