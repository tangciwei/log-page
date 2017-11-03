var S = require('string');

let {
    formatData,
    readFile,
    writeFile
} = require('./common');

let profitConfig = require('../config').profit;

/**
 * 分析每一条日志，取得有用数据
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function anaOne(item) {
    let itemArr = item.split('] {');
    let time = S(itemArr[0]).between('[', '] [TRACE]').s.split(' ')[1].split('.')[0];
    let {
        percent,
        direction,
        num,
        profit,
        market,
        buy,
        sell
    } = JSON.parse(`{` + itemArr[1]).data;

    return {
        market,
        percent,
        profit,
        direction: direction.join('-'),
        time,
        quantity: num,
        buy,
        sell
    };
}

/**
 * 产生页面需要的数据
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function generateData(data) {
    // 获取market数组
    function getAllmarket() {
        let allMarket = [];
        data.forEach(item => {
            allMarket.push(item.market);
        });
        return Array.from(new Set(allMarket));
    }
    let markets = getAllmarket();

    let output = {};
    // market和directions数据
    let outlook = {};

    markets.forEach(market => {
        let coinData = data.filter(item => {
            return item.market === market;
        });
        output[market] = {};

        function getDirections() {
            let allDirections = [];
            coinData.filter(item => {
                allDirections.push(item.direction);
            });
            return Array.from(new Set(allDirections));
        }

        let directions = getDirections();

        outlook[market] = {};

        // 遍历每个方向
        directions.forEach(direction => {
            let directionData = coinData.filter(item => {
                // return item.direction === direction;
                // todo
                return item.direction === direction && item.percent >= profitConfig.percent;

            });
            outlook[market][direction] = directionData.length;
            output[market][direction] = directionData;
        });

    });
    return {
        dataJs: 'var allData = ' + JSON.stringify(output),
        dataJson: JSON.stringify(output),
        outlook: JSON.stringify(outlook)
    };
}

module.exports = async function() {
    let data = (await formatData(profitConfig.list))(anaOne);
    let outData = generateData(data);
    // 写文件
    let baseDir = __dirname + '/../data/';
    writeFile(baseDir + 'data.js', outData.dataJs);
    writeFile(baseDir + 'data.json', outData.dataJson);
    writeFile(baseDir + 'outlook.json', outData.outlook);
};
