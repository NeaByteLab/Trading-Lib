import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { createMovingAverageIndicator } from '@core/factories/indicator-factory';
const { class: EMA, function: ema } = createMovingAverageIndicator('EMA', 'Exponential Moving Average', 'ema', DEFAULT_LENGTHS.EMA);
export { EMA };
export { ema };
