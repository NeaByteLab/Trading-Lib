import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
export declare class OBV extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateOBV;
}
export declare function obv(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=obv.d.ts.map