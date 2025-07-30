import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
export declare class VWAP extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateVWAP;
}
export declare function vwap(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=vwap.d.ts.map