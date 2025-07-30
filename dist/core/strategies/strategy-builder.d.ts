import type { IndicatorConfig, MarketData } from '@core/types/indicator-types';
/**
 * Strategy Builder - Composes trading strategies from reusable components
 * Inspired by libraries like indicatorts and Freqtrade
 */
export interface StrategyCondition {
    indicator: string;
    operator: 'gt' | 'lt' | 'gte' | 'lte' | 'eq' | 'crosses_above' | 'crosses_below';
    value: number;
    config?: IndicatorConfig;
}
export interface StrategySignal {
    type: 'buy' | 'sell' | 'hold';
    condition: StrategyCondition;
    strength?: number;
}
export interface StrategyConfig {
    name: string;
    description: string;
    conditions: StrategyCondition[];
    signals: StrategySignal[];
    timeframe?: string;
    riskManagement?: {
        stopLoss?: number;
        takeProfit?: number;
        maxPositionSize?: number;
    } | undefined;
}
export declare class StrategyBuilder {
    private config;
    constructor(name: string, description: string);
    addCondition(condition: StrategyCondition): this;
    addSignal(signal: StrategySignal): this;
    setRiskManagement(riskManagement: StrategyConfig['riskManagement'] | undefined): this;
    build(): StrategyConfig;
    execute(data: MarketData): StrategyResult;
    private evaluateCondition;
}
export interface StrategyResult {
    signals: (StrategySignal & {
        timestamp: number;
    })[];
    conditions: Array<{
        condition: StrategyCondition;
        value: number;
        isTrue: boolean;
    }>;
    timestamp: number;
}
export declare class StrategyTemplates {
    static movingAverageCrossover(fastPeriod?: number, slowPeriod?: number): StrategyBuilder;
    static rsiStrategy(oversold?: number, overbought?: number, period?: number): StrategyBuilder;
    static bollingerBandsStrategy(period?: number, multiplier?: number): StrategyBuilder;
}
export declare function createStrategy(name: string, description: string): StrategyBuilder;
export declare function createMovingAverageCrossover(fastPeriod?: number, slowPeriod?: number): StrategyBuilder;
export declare function createRSIStrategy(oversold?: number, overbought?: number, period?: number): StrategyBuilder;
export declare function createBollingerBandsStrategy(period?: number, multiplier?: number): StrategyBuilder;
//# sourceMappingURL=strategy-builder.d.ts.map