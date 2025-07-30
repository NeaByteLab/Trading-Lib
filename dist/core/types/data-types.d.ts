export interface OHLCV {
    open: number;
    high: number;
    low: number;
    close: number;
    volume?: number;
    timestamp?: number;
}
export interface OHLCVArray {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
    volume?: number[];
    timestamp?: number[];
}
export interface PriceLevel {
    typical: number;
    median: number;
    weighted: number;
    hl2: number;
    hlc3: number;
    ohlc4: number;
}
export interface MovingAverageResult {
    values: number[];
    length: number;
    type: 'sma' | 'ema' | 'wma' | 'dema' | 'tema' | 'hull';
}
export interface VolatilityResult {
    atr: number[];
    tr: number[];
    length: number;
}
export interface MomentumResult {
    roc: number[];
    momentum: number[];
    length: number;
}
//# sourceMappingURL=data-types.d.ts.map