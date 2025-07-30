/**
 * Default lengths for technical indicators
 * Provides standardized default periods for all indicators
 */
export const DEFAULT_LENGTHS = {
    SMA: 20,
    EMA: 20,
    WMA: 20,
    HULL: 20,
    RMA: 20,
    RSI: 14,
    MACD: 12,
    MACD_SIGNAL: 26,
    MACD_HISTOGRAM: 9,
    STOCHASTIC: 14,
    STOCHASTIC_K: 3,
    STOCHASTIC_D: 3,
    WILLIAMS_R: 14,
    CCI: 20,
    ATR: 14,
    BOLLINGER: 20,
    BOLLINGER_STD: 2,
    KELTNER: 20,
    KELTNER_MULT: 2,
    DONCHIAN: 20,
    OBV: 1,
    VWAP: 1,
    MFI: 14,
    CMF: 20,
    ADX: 14,
    DMI: 14,
    PARABOLIC: 0.02,
    ICHIMOKU_TENKAN: 9,
    ICHIMOKU_KIJUN: 26,
    ICHIMOKU_SENKOU_B: 52,
    ICHIMOKU_DISPLACEMENT: 26,
    SUPER_TREND: 10,
    SUPER_TREND_MULT: 3,
    ROC: 14,
    MOMENTUM: 10,
    WILDERS: 14,
    STD: 20,
    SHANNON: 20,
    SHANNON_BINS: 8,
    SAFEZONE: 20,
    SAFEZONE_MULT: 2.0,
    DPO: 20
};
/**
 * Default multipliers for technical indicators
 * Provides standardized default multipliers for volatility indicators
 */
export const DEFAULT_MULTIPLIERS = {
    BOLLINGER: 2,
    KELTNER: 2,
    ATR: 1,
    SUPER_TREND: 3,
    PARABOLIC: 0.02
};
/**
 * Overbought and oversold levels for oscillators
 * Defines standard threshold values for momentum indicators
 */
export const OVERBOUGHT_OVERSOLD = {
    RSI_OVERBOUGHT: 70,
    RSI_OVERSOLD: 30,
    STOCHASTIC_OVERBOUGHT: 80,
    STOCHASTIC_OVERSOLD: 20,
    WILLIAMS_R_OVERBOUGHT: -20,
    WILLIAMS_R_OVERSOLD: -80,
    CCI_OVERBOUGHT: 100,
    CCI_OVERSOLD: -100
};
/**
 * Valid price source options for indicators
 * Defines all supported price sources following Pine Script conventions
 */
export const PINE_SOURCE_OPTIONS = [
    'open',
    'high',
    'low',
    'close',
    'hl2',
    'hlc3',
    'ohlc4',
    'volume'
];
/**
 * Centralized error messages to eliminate duplication
 * Provides consistent error handling across the entire codebase
 */
export const ERROR_MESSAGES = {
    ARRAY_LENGTH_MISMATCH: 'All data arrays must have the same length',
    ARRAY_REQUIRED: 'Data must be an array',
    ATR_VALUES_REQUIRED: 'ATR values array is required',
    CLOSE_ATR_LENGTH_MISMATCH: 'Close and ATR arrays must have the same length',
    CLOSE_VOLUME_LENGTH_MISMATCH: 'Close and volume arrays must have the same length',
    EMPTY_AFTER_NAN: 'Array cannot be empty after filtering NaN values',
    EMPTY_DATA: 'Data array cannot be empty',
    FAST_LENGTH_GREATER: 'Fast length must be less than slow length',
    HIGH_LOW_LENGTH_MISMATCH: 'High and low arrays must have the same length',
    INDICATORS_REQUIRED: 'At least one indicator is required',
    INVALID_ALPHA: 'Alpha must be between 0 and 1',
    INVALID_DATA_FORMAT: 'Invalid market data format',
    INVALID_LENGTH: 'Length must be positive',
    INVALID_MOVING_AVERAGE_TYPE: 'Invalid moving average type',
    INVALID_MULTIPLIER: 'Multiplier must be positive',
    INVALID_PARAMETERS: 'Invalid parameters for calculation',
    INVALID_PERCENTILE: 'Percentile must be between 0 and 100',
    INVALID_SIGMA: 'Sigma must be positive',
    INVALID_SOURCE: 'Invalid source parameter',
    INVALID_WINDOW_SIZE: 'Window size must be positive',
    K_OUT_OF_BOUNDS: 'K must be between 0 and {maxIndex}',
    LENGTH_MAX_EXCEEDED: 'Length must not exceed {maxLength}',
    LENGTH_MIN_REQUIRED: 'Length must be at least {minLength}',
    MIN_LENGTH_REQUIRED: 'Data must have at least {minLength} elements',
    MISSING_OHLC: 'OHLC market data is required',
    MISSING_OHLCV: 'OHLCV market data is required',
    MISSING_VOLUME: 'Volume data is required',
    NULL_UNDEFINED_DATA: 'Input data cannot be null or undefined',
    OHLC_VOLUME_LENGTH_MISMATCH: 'All price and volume arrays must have the same length',
    VOLUME_REQUIRED: 'Volume data is required for volume-based calculations',
    VOLUME_WEIGHTED_REQUIRED: 'Volume data is required for volume-weighted calculations'
};
