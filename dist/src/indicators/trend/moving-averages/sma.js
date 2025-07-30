import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { createMovingAverageIndicator } from '@core/factories/indicator-factory';
const { class: SMA, function: sma } = createMovingAverageIndicator('SMA', 'Simple Moving Average', 'sma', DEFAULT_LENGTHS.SMA);
export { SMA };
export { sma };
