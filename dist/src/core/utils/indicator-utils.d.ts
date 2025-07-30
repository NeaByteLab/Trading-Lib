import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Centralized validation for indicators requiring OHLC data
 * Eliminates duplication of the same validation pattern across indicators
 */
export declare function validateOHLCData(data: MarketData | number[], _config?: IndicatorConfig): MarketData;
/**
 * Centralized validation for indicators requiring volume data
 * Eliminates duplication of the same validation pattern across indicators
 */
export declare function validateVolumeDataForIndicators(data: MarketData): MarketData;
/**
 * Centralized result creation with consistent metadata
 * Eliminates duplication of the same result structure across indicators
 */
export declare function createIndicatorResult(values: number[], length: number, source?: string, additionalMetadata?: Record<string, unknown>): IndicatorResult;
/**
 * Centralized calculation wrapper for indicators with length parameter
 * Eliminates duplication of the same calculation pattern across indicators
 */
export declare function calculateWithLength<T extends BaseIndicator>(IndicatorClass: new () => T, data: MarketData | number[], length: number, source?: string, additionalConfig?: Partial<IndicatorConfig>): IndicatorResult;
/**
 * Unified indicator wrapper to eliminate duplication
 * All indicators can use this single pattern instead of duplicating the same structure
 */
export declare function createIndicatorWrapper<T extends BaseIndicator>(IndicatorClass: new () => T, data: MarketData | number[], length?: number, source?: string, additionalConfig?: Partial<IndicatorConfig>): number[];
/**
 * Unified indicator wrapper for multi-result indicators
 */
export declare function createMultiResultIndicatorWrapper<T extends BaseIndicator>(IndicatorClass: new () => T, data: MarketData | number[], length?: number, source?: string, additionalConfig?: Partial<IndicatorConfig>): IndicatorResult;
//# sourceMappingURL=indicator-utils.d.ts.map