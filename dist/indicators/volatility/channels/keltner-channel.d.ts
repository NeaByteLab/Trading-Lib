import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
export declare class KeltnerChannel extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateKeltnerChannel;
}
export declare function keltnerChannel(data: MarketData | number[], length?: number, multiplier?: number, source?: string): {
    upper: number[];
    middle: number[];
    lower: number[];
};
//# sourceMappingURL=keltner-channel.d.ts.map