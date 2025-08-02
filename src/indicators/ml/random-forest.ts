import { BaseIndicator } from '@core/base/base-indicator'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'

/**
 * Random Forest Classifier (stub)
 *
 * Placeholder for a random forest classifier. Not implemented (no external dependencies allowed).
 * Throws an error if called.
 *
 * @param data - MarketData or feature matrix
 * @param config - Configuration object
 * @throws Error always (not implemented)
 */
export class RandomForestClassifier extends BaseIndicator {
  constructor() {
    super('RandomForest', 'Random Forest Classifier', 'ml')
  }

  calculate(_data: MarketData | number[], _config?: IndicatorConfig): IndicatorResult {
    throw new Error('Random Forest Classifier is not implemented (no external dependencies allowed)')
  }
}

export function randomForest(_data: MarketData | number[], _config?: IndicatorConfig): never {
  throw new Error('Random Forest Classifier is not implemented (no external dependencies allowed)')
}
