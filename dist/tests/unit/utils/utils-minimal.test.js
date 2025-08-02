import { describe, expect, it } from '@jest/globals';
describe('Utils Module - Minimal Tests', () => {
    it('should pass basic test', () => {
        expect(1 + 1).toBe(2);
    });
    it('should test ArrayUtils import', () => {
        const { ArrayUtils } = require('@utils/index');
        expect(ArrayUtils).toBeDefined();
    });
    it('should test MathUtils import', () => {
        const { MathUtils } = require('@utils/index');
        expect(MathUtils).toBeDefined();
    });
    it('should test basic ArrayUtils function', () => {
        const { ArrayUtils } = require('@utils/index');
        const testData = [1, 2, 3, 4, 5];
        const result = ArrayUtils.processArray(testData, (value) => value * 2);
        expect(result).toEqual([2, 4, 6, 8, 10]);
    });
    it('should test basic MathUtils function', () => {
        const { MathUtils } = require('@utils/index');
        const testData = [1, 2, 3, 4, 5];
        const result = MathUtils.sum(testData);
        expect(result).toBe(15);
    });
});
