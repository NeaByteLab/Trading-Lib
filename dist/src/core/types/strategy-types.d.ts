export interface StrategySignal {
    type: 'buy' | 'sell' | 'hold';
    strength: number;
    timestamp: number;
    price: number;
    metadata?: Record<string, number | string | boolean | number[]>;
}
export interface StrategyResult {
    signals: StrategySignal[];
    performance: {
        totalReturn: number;
        sharpeRatio: number;
        maxDrawdown: number;
        winRate: number;
    };
    metadata?: Record<string, number | string | boolean | number[]>;
}
export interface StrategyConfig {
    name: string;
    description?: string;
    parameters: Record<string, number | string | boolean | undefined>;
    [key: string]: string | number | boolean | undefined | Record<string, number | string | boolean | undefined>;
}
//# sourceMappingURL=strategy-types.d.ts.map