import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
export declare class DonchianChannel extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateDonchianChannel;
}
export declare function donchianChannel(data: MarketData | number[], length?: number, source?: string): {
    upper: number[];
    middle: number[];
    lower: number[];
};
//# sourceMappingURL=donchian-channel.d.ts.map