import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate Amihud Illiquidity Measure
 *
 * @param data - Market data with high, low, close, volume arrays
 * @param length - Calculation period (default: 20)
 * @returns Amihud Illiquidity values array
 */
export declare function amihudIlliquidity(data: MarketData, length?: number): number[];
//# sourceMappingURL=amihud.d.ts.map