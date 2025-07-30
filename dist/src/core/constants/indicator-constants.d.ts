/**
 * Default lengths for technical indicators
 * Provides standardized default periods for all indicators
 */
export declare const DEFAULT_LENGTHS: {
    readonly SMA: 20;
    readonly EMA: 20;
    readonly WMA: 20;
    readonly HULL: 20;
    readonly RSI: 14;
    readonly MACD: 12;
    readonly MACD_SIGNAL: 26;
    readonly MACD_HISTOGRAM: 9;
    readonly STOCHASTIC: 14;
    readonly STOCHASTIC_K: 3;
    readonly STOCHASTIC_D: 3;
    readonly WILLIAMS_R: 14;
    readonly CCI: 20;
    readonly ATR: 14;
    readonly BOLLINGER: 20;
    readonly BOLLINGER_STD: 2;
    readonly KELTNER: 20;
    readonly KELTNER_MULT: 2;
    readonly DONCHIAN: 20;
    readonly OBV: 1;
    readonly VWAP: 1;
    readonly MFI: 14;
    readonly CMF: 20;
    readonly ADX: 14;
    readonly DMI: 14;
    readonly PARABOLIC: 0.02;
    readonly ICHIMOKU_TENKAN: 9;
    readonly ICHIMOKU_KIJUN: 26;
    readonly ICHIMOKU_SENKOU_B: 52;
    readonly ICHIMOKU_DISPLACEMENT: 26;
    readonly SUPER_TREND: 10;
    readonly SUPER_TREND_MULT: 3;
    readonly ROC: 14;
    readonly MOMENTUM: 10;
    readonly WILDERS: 14;
    readonly STD: 20;
    readonly SHANNON: 20;
    readonly SHANNON_BINS: 8;
    readonly SAFEZONE: 20;
    readonly SAFEZONE_MULT: 2;
};
/**
 * Default multipliers for technical indicators
 * Provides standardized default multipliers for volatility indicators
 */
export declare const DEFAULT_MULTIPLIERS: {
    readonly BOLLINGER: 2;
    readonly KELTNER: 2;
    readonly ATR: 1;
    readonly SUPER_TREND: 3;
    readonly PARABOLIC: 0.02;
};
/**
 * Overbought and oversold levels for oscillators
 * Defines standard threshold values for momentum indicators
 */
export declare const OVERBOUGHT_OVERSOLD: {
    readonly RSI_OVERBOUGHT: 70;
    readonly RSI_OVERSOLD: 30;
    readonly STOCHASTIC_OVERBOUGHT: 80;
    readonly STOCHASTIC_OVERSOLD: 20;
    readonly WILLIAMS_R_OVERBOUGHT: -20;
    readonly WILLIAMS_R_OVERSOLD: -80;
    readonly CCI_OVERBOUGHT: 100;
    readonly CCI_OVERSOLD: -100;
};
/**
 * Valid price source options for indicators
 * Defines all supported price sources following Pine Script conventions
 */
export declare const PINE_SOURCE_OPTIONS: readonly ["open", "high", "low", "close", "hl2", "hlc3", "ohlc4", "volume"];
/**
 * Type for Pine Script price sources
 * Ensures type safety for price source parameters
 */
export type PineSource = typeof PINE_SOURCE_OPTIONS[number];
/**
 * Centralized error messages to eliminate duplication
 * Provides consistent error handling across the entire codebase
 */
export declare const ERROR_MESSAGES: {
    readonly ARRAY_LENGTH_MISMATCH: "All data arrays must have the same length";
    readonly ARRAY_REQUIRED: "Data must be an array";
    readonly EMPTY_DATA: "Data array cannot be empty";
    readonly FAST_LENGTH_GREATER: "Fast length must be less than slow length";
    readonly INDICATORS_REQUIRED: "At least one indicator is required";
    readonly INVALID_ALPHA: "Alpha must be between 0 and 1";
    readonly INVALID_DATA_FORMAT: "Invalid market data format";
    readonly INVALID_LENGTH: "Length must be positive";
    readonly INVALID_MOVING_AVERAGE_TYPE: "Invalid moving average type";
    readonly INVALID_MULTIPLIER: "Multiplier must be positive";
    readonly INVALID_PARAMETERS: "Invalid parameters for calculation";
    readonly INVALID_SIGMA: "Sigma must be positive";
    readonly INVALID_SOURCE: "Invalid source parameter";
    readonly INVALID_WINDOW_SIZE: "Window size must be positive";
    readonly LENGTH_MAX_EXCEEDED: "Length must not exceed {maxLength}";
    readonly LENGTH_MIN_REQUIRED: "Length must be at least {minLength}";
    readonly MIN_LENGTH_REQUIRED: "Data must have at least {minLength} elements";
    readonly MISSING_OHLC: "OHLC market data is required";
    readonly MISSING_OHLCV: "OHLCV market data is required";
    readonly MISSING_VOLUME: "Volume data is required";
    readonly NULL_UNDEFINED_DATA: "Input data cannot be null or undefined";
    readonly VOLUME_REQUIRED: "Volume data is required for volume-based calculations";
    readonly VOLUME_WEIGHTED_REQUIRED: "Volume data is required for volume-weighted calculations";
};
//# sourceMappingURL=indicator-constants.d.ts.map