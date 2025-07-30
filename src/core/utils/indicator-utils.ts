import { BaseIndicator } from '@base/base-indicator'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'

/**
 * Unified indicator wrapper to eliminate duplication
 * All indicators can use this single pattern instead of duplicating the same structure
 */
export function createIndicatorWrapper<T extends BaseIndicator>(
  IndicatorClass: new () => T,
  data: MarketData | number[],
  length?: number,
  source?: string,
  additionalConfig?: Partial<IndicatorConfig>
): number[] {
  const indicator = new IndicatorClass()
  const config: IndicatorConfig = { ...additionalConfig }
  if (length !== undefined) {config.length = length}
  if (source !== undefined) {config.source = source}
  const result = indicator.calculate(data, config)
  return result.values
}

/**
 * Unified indicator wrapper for multi-result indicators
 */
export function createMultiResultIndicatorWrapper<T extends BaseIndicator>(
  IndicatorClass: new () => T,
  data: MarketData | number[],
  length?: number,
  source?: string,
  additionalConfig?: Partial<IndicatorConfig>
): IndicatorResult {
  const indicator = new IndicatorClass()
  const config: IndicatorConfig = { ...additionalConfig }
  if (length !== undefined) {config.length = length}
  if (source !== undefined) {config.source = source}
  return indicator.calculate(data, config)
}
