import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Unified indicator wrapper to eliminate duplication
 * All indicators can use this single pattern instead of duplicating the same structure
 */
export declare function createIndicatorWrapper<T extends BaseIndicator>(IndicatorClass: new () => T, data: MarketData | number[], length?: number, source?: string, additionalConfig?: Partial<IndicatorConfig>): number[];
/**
 * Unified indicator wrapper for multi-result indicators
 */
export declare function createMultiResultIndicatorWrapper<T extends BaseIndicator>(IndicatorClass: new () => T, data: MarketData | number[], length?: number, source?: string, additionalConfig?: Partial<IndicatorConfig>): IndicatorResult;
/**
 * Unified validation for all indicators
 */
export declare function validateIndicatorInput(data: MarketData | number[], config?: IndicatorConfig): void;
/**
 * Unified source data extraction using centralized PriceCalculations
 */
export declare function extractSourceData(data: MarketData | number[], source?: string): number[];
//# sourceMappingURL=indicator-utils.d.ts.map