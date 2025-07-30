import { createIndicator } from '@core/factories/indicator-factory';
export class StrategyBuilder {
    config;
    constructor(name, description) {
        this.config = {
            name,
            description,
            conditions: [],
            signals: []
        };
    }
    // Add conditions
    addCondition(condition) {
        this.config.conditions.push(condition);
        return this;
    }
    // Add signals
    addSignal(signal) {
        this.config.signals.push(signal);
        return this;
    }
    // Set risk management
    setRiskManagement(riskManagement) {
        this.config.riskManagement = riskManagement;
        return this;
    }
    // Build the strategy
    build() {
        return this.config;
    }
    // Execute strategy on data
    execute(data) {
        const results = {
            signals: [],
            conditions: [],
            timestamp: Date.now()
        };
        // Evaluate conditions
        for (const condition of this.config.conditions) {
            const indicator = createIndicator(condition.indicator);
            if (!indicator) {
                continue;
            }
            const result = indicator.calculate(data, condition.config);
            const currentValue = result.values[result.values.length - 1];
            if (currentValue === undefined || isNaN(currentValue)) {
                continue;
            }
            const isTrue = this.evaluateCondition(currentValue, condition.operator, condition.value);
            results.conditions.push({
                condition,
                value: currentValue,
                isTrue
            });
        }
        // Generate signals based on conditions
        for (const signal of this.config.signals) {
            const conditionResult = results.conditions.find(c => c.condition.indicator === signal.condition.indicator &&
                c.condition.operator === signal.condition.operator &&
                c.condition.value === signal.condition.value);
            if (conditionResult?.isTrue) {
                results.signals.push({
                    ...signal,
                    timestamp: Date.now(),
                    strength: signal.strength || 1
                });
            }
        }
        return results;
    }
    evaluateCondition(value, operator, target) {
        switch (operator) {
            case 'gt': return value > target;
            case 'lt': return value < target;
            case 'gte': return value >= target;
            case 'lte': return value <= target;
            case 'eq': return Math.abs(value - target) < 0.0001;
            default: return false;
        }
    }
}
// Pre-built strategy templates
export class StrategyTemplates {
    // Moving Average Crossover Strategy
    static movingAverageCrossover(fastPeriod = 10, slowPeriod = 20) {
        return new StrategyBuilder('MA Crossover', 'Simple moving average crossover strategy')
            .addCondition({
            indicator: 'SMA',
            operator: 'gt',
            value: 0,
            config: { length: fastPeriod }
        })
            .addCondition({
            indicator: 'SMA',
            operator: 'lt',
            value: 0,
            config: { length: slowPeriod }
        })
            .addSignal({
            type: 'buy',
            condition: {
                indicator: 'SMA',
                operator: 'crosses_above',
                value: 0,
                config: { length: fastPeriod }
            }
        });
    }
    // RSI Strategy
    static rsiStrategy(oversold = 30, overbought = 70, period = 14) {
        return new StrategyBuilder('RSI Strategy', 'RSI oversold/overbought strategy')
            .addCondition({
            indicator: 'RSI',
            operator: 'lt',
            value: oversold,
            config: { length: period }
        })
            .addCondition({
            indicator: 'RSI',
            operator: 'gt',
            value: overbought,
            config: { length: period }
        })
            .addSignal({
            type: 'buy',
            condition: {
                indicator: 'RSI',
                operator: 'crosses_above',
                value: oversold,
                config: { length: period }
            }
        })
            .addSignal({
            type: 'sell',
            condition: {
                indicator: 'RSI',
                operator: 'crosses_below',
                value: overbought,
                config: { length: period }
            }
        });
    }
    // Bollinger Bands Strategy
    static bollingerBandsStrategy(period = 20, multiplier = 2) {
        return new StrategyBuilder('Bollinger Bands Strategy', 'Bollinger Bands mean reversion strategy')
            .addCondition({
            indicator: 'BOLLINGER',
            operator: 'lt',
            value: 0,
            config: { length: period, multiplier }
        })
            .addSignal({
            type: 'buy',
            condition: {
                indicator: 'BOLLINGER',
                operator: 'crosses_below',
                value: 0,
                config: { length: period, multiplier }
            }
        })
            .addSignal({
            type: 'sell',
            condition: {
                indicator: 'BOLLINGER',
                operator: 'crosses_above',
                value: 0,
                config: { length: period, multiplier }
            }
        });
    }
}
// Export convenience functions
export function createStrategy(name, description) {
    return new StrategyBuilder(name, description);
}
export function createMovingAverageCrossover(fastPeriod, slowPeriod) {
    return StrategyTemplates.movingAverageCrossover(fastPeriod, slowPeriod);
}
export function createRSIStrategy(oversold, overbought, period) {
    return StrategyTemplates.rsiStrategy(oversold, overbought, period);
}
export function createBollingerBandsStrategy(period, multiplier) {
    return StrategyTemplates.bollingerBandsStrategy(period, multiplier);
}
//# sourceMappingURL=strategy-builder.js.map