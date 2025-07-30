import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
export declare class WilliamsR extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateWilliamsR;
}
export declare function williamsR(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=williams-r.d.ts.map