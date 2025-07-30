import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
export declare class MFI extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
export declare function mfi(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=mfi.d.ts.map