// let base = __dirname + '/../../logs/log-bandwagonhost';
let base = __dirname + '/../../logs/log-aliyun';
// let base = __dirname + '/../../logs/local';
module.exports = {
    profit: {
        list: [
            // base + '/profit/profit.log2017-11-02-06',
            // base + '/profit/profit.log2017-11-02-07',
            // base + '/profit/profit.log2017-11-02-08',
            // base + '/profit/profit.log2017-11-02-09',
            // base + '/profit/profit.log2017-11-03-08',
            base + '/profit/profit.log'
        ],
        // 打印大于这个比例的
        percent: 0.2
    },
    trade: {
        list: [
            // base + 'trade/trade.log2017-11-01-03',
            // base + 'trade/trade.log2017-11-01-04',
            base + 'trade/trade.log'
        ]
    }
};
