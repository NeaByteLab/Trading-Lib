import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
export declare class MACD extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateMACD;
}
export declare function macd(data: MarketData | number[], fastLength?: number, slowLength?: number, signalLength?: number, source?: string): {
    macd: number[];
    signal: number[];
    histogram: number[];
};
//# sourceMappingURL=macd.d.ts.map