import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Volume Profile Indicator
 *
 * Creates a volume distribution across price levels
 * Groups volume by price ranges to show volume concentration
 */
export declare class VolumeProfile extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], _config?: IndicatorConfig): void;
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Volume Profile values using wrapper function
 *
 * @param data - Market data
 * @param levels - Number of price levels (default: 10)
 * @param source - Price source (default: 'close')
 * @returns Object with price levels and volume distribution
 */
export declare function volumeProfile(data: MarketData | number[], levels?: number, source?: string): {
    priceLevels: number[];
    volumeDistribution: number[];
    poc: number;
};
//# sourceMappingURL=volume-profile.d.ts.map