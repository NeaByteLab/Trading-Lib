import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
export declare class WMA extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
export declare function wma(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=wma.d.ts.map