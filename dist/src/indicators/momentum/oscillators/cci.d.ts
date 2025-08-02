import type { MarketData } from '@core/types/indicator-types';
/**
 * Commodity Channel Index - measures cyclical trends and overbought/oversold conditions
 * Formula: CCI = (Typical Price - SMA) / (0.015 × Mean Deviation)
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'hlc3')
 * @returns CCI values array
 *
 * @example
 * ```typescript
 * const cci = ta.cci(data, 20)
 * // Returns: [NaN, NaN, ..., 125.6, -89.3, ...]
 * ```
 */
export declare function cci(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=cci.d.ts.map