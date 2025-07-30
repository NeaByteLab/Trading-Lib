export interface StrategySignal {
    type: 'buy' | 'sell' | 'hold';
    strength: number;
    timestamp: number;
    price: number;
    metadata?: Record<string, any>;
}
export interface StrategyResult {
    signals: StrategySignal[];
    performance: {
        totalReturn: number;
        sharpeRatio: number;
        maxDrawdown: number;
        winRate: number;
    };
    metadata?: Record<string, any>;
}
export interface StrategyConfig {
    name: string;
    description?: string;
    parameters: Record<string, any>;
    [key: string]: any;
}
//# sourceMappingURL=strategy-types.d.ts.map