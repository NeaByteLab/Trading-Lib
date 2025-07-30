import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
export declare class Stochastic extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateStochastic;
}
export declare function stochastic(data: MarketData | number[], kLength?: number, dLength?: number, source?: string): {
    k: number[];
    d: number[];
};
//# sourceMappingURL=stochastic.d.ts.map