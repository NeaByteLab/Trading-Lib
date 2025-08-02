import { BaseIndicator } from '@base/base-indicator';
import { calculateKylesLambda } from '@utils/calculations/volume';
import { createIndicatorWrapper } from '@utils/indicator-utils';
/**
 * Kyle's Lambda Indicator
 *
 * Kyle's Lambda measures the price impact of trades and market liquidity.
 * Higher values indicate lower liquidity and higher price impact.
 * Formula: λ = |Price Change| / Volume
 *
 * @example
 * ```typescript
 * const kyle = new KylesLambda()
 * const result = kyle.calculate(marketData)
 * console.log(result.values) // Kyle's Lambda values
 * ```
 */
export class KylesLambda extends BaseIndicator {
    constructor() {
        super('Kyle\'s Lambda', 'Kyle\'s Lambda', 'volume');
    }
    validateInput(data, _config) {
        if (Array.isArray(data)) {
            throw new Error('Kyle\'s Lambda requires OHLCV data');
        }
        if (!data.volume) {
            throw new Error('Volume data is required for Kyle\'s Lambda');
        }
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const marketData = data;
        if (!marketData.volume) {
            throw new Error('Volume data is required for Kyle\'s Lambda');
        }
        const values = calculateKylesLambda(marketData.close, marketData.volume);
        return {
            values,
            metadata: {
                source: 'close',
                volume: true,
                length: 1
            }
        };
    }
}
/**
 * Calculate Kyle's Lambda values
 *
 * Kyle's Lambda measures the price impact of trades and market liquidity.
 * Formula: λ = |Price Change| / Volume
 * Higher values indicate lower liquidity and higher price impact.
 *
 * @param data - Market data with OHLCV values
 * @returns Array of Kyle's Lambda values
 * @throws {Error} If market data is invalid or volume data is missing
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * const lambda = ta.kylesLambda(marketData)
 * // Returns: [0.001, 0.002, 0.0015, 0.003, ...]
 * ```
 */
export function kylesLambda(data) {
    return createIndicatorWrapper(KylesLambda, data);
}
