declare const Hull: {
    new (): {
        calculate(data: import("../../..").MarketData | number[], config?: import("../../..").IndicatorConfig): import("../../..").IndicatorResult;
        name: string;
        description: string;
        category: string;
        validateInput(_data: import("../../..").MarketData | number[], _config?: import("../../..").IndicatorConfig): void;
        validateLength(length: number, minLength: number, maxLength?: number): void;
        validateMultiplier(multiplier: number): void;
        getSourceData(data: import("../../..").MarketData, source?: string): number[];
    };
}, hull: (_data: import("../../..").MarketData | number[], _length?: number, _source?: string) => number[];
export { Hull };
export { hull };
//# sourceMappingURL=hull.d.ts.map