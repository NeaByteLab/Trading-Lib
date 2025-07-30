# 📈 Trading-Lib

A comprehensive TypeScript trading indicators library with 125+ technical analysis indicators.

> **🚧 Development Status**: This project is actively under development. See [CHECKLIST.md](./CHECKLIST.md) for the complete list of indicators and implementation status.

## ✨ Features

- **TypeScript Support** - Full type safety and IntelliSense
- **120+ Technical Indicators** - Complete suite of trading indicators
- **Pine Script-like API** - Familiar syntax for TradingView users
- **Modular Architecture** - Easy to extend and customize
- **Zero Dependencies** - Lightweight and fast

## 📦 Installation

Clone the repository:
```bash
git clone https://github.com/NeaByteLab/Trading-Lib.git
cd Trading-Lib
npm install
```

## 🚀 Usage

```typescript
import { sma, ema, rsi, macd } from './src/indicators'

// Calculate Simple Moving Average
const prices = [10, 12, 15, 14, 16, 18, 17, 19, 20, 22]
const sma20 = sma(prices, 20)

// Calculate RSI
const rsi14 = rsi(prices, 14)

// Calculate MACD
const macdResult = macd(prices, 12, 26, 9)
```

## 🔧 Development

```bash
npm test          # Run tests
npm run lint      # Run ESLint
npm run build     # Build TypeScript
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details. 