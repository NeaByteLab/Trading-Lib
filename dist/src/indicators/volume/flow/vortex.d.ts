import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Vortex Indicator
 *
 * VI+ = |Current High - Prior Low| / True Range
 * VI- = |Current Low - Prior High| / True Range
 * Uses centralized calculation utilities for consistency.
 */
export declare class Vortex extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], _config?: IndicatorConfig): void;
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Vortex values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 14)
 * @param source - Price source (default: 'close')
 * @returns Object with VI+ and VI- arrays
 */
export declare function vortex(data: MarketData | number[], length?: number, source?: string): {
    viPlus: number[];
    viMinus: number[];
};
//# sourceMappingURL=vortex.d.ts.map