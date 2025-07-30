export function pineSource(data, source = 'close') {
    if (Array.isArray(data)) {
        return data;
    }
    switch (source) {
        case 'open':
            return data.open;
        case 'high':
            return data.high;
        case 'low':
            return data.low;
        case 'close':
            return data.close;
        case 'hl2':
            return data.high.map((high, i) => (high + data.low[i]) / 2);
        case 'hlc3':
            return data.high.map((high, i) => (high + data.low[i] + data.close[i]) / 3);
        case 'ohlc4':
            return data.high.map((high, i) => (data.open[i] + high + data.low[i] + data.close[i]) / 4);
        default:
            return data.close;
    }
}
export function pineLength(length, defaultLength = 14) {
    return length || defaultLength;
}
export function pineOffset(array, offset = 0) {
    if (offset === 0) {
        return array;
    }
    const result = new Array(array.length);
    for (let i = 0; i < array.length; i++) {
        if (i < offset) {
            result[i] = NaN;
        }
        else {
            result[i] = array[i - offset];
        }
    }
    return result;
}
//# sourceMappingURL=pine-script-utils.js.map