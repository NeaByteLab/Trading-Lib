import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Know Sure Thing (KST) oscillator indicator
 *
 * KST combines multiple rate of change calculations to identify long-term trends.
 * Uses four different ROC periods with different weights.
 */
export declare class KST extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate KST values using wrapper function
 *
 * @param data - Market data or price array
 * @param roc1 - First ROC period (default: 10)
 * @param roc2 - Second ROC period (default: 15)
 * @param roc3 - Third ROC period (default: 20)
 * @param roc4 - Fourth ROC period (default: 30)
 * @param sma1 - First SMA period (default: 10)
 * @param sma2 - Second SMA period (default: 10)
 * @param sma3 - Third SMA period (default: 10)
 * @param sma4 - Fourth SMA period (default: 15)
 * @param source - Price source (default: 'close')
 * @returns KST values array
 */
export declare function kst(data: MarketData | number[], roc1?: number, roc2?: number, roc3?: number, roc4?: number, sma1?: number, sma2?: number, sma3?: number, sma4?: number, source?: string): number[];
//# sourceMappingURL=kst.d.ts.map