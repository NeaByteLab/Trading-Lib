import { BaseIndicator } from '@base/base-indicator';
import { calculateKylesLambda } from '@utils/calculations/volume';
import { createIndicatorWrapper } from '@utils/indicator-utils';
/**
 * Kyle's Lambda indicator
 *
 * Kyle's Lambda measures the price impact of trades and market liquidity.
 * Higher values indicate lower liquidity and higher price impact.
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
 * Calculate Kyle's Lambda values using wrapper function
 *
 * @param data - Market data
 * @returns Kyle's Lambda values array
 */
export function kylesLambda(data) {
    return createIndicatorWrapper(KylesLambda, data);
}
