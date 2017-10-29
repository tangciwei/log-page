let fs = require('fs');
let util = require('util');
var S = require('string');

let promisify = util.promisify;
// promisify包装
let readFile = promisify(fs.readFile);
let writeFile = promisify(fs.writeFile);

/**
 * [traversalFiles 依次读文件，把每一行的结果放到一个数组中]
 * @param  {[type]} filesList [description]
 * @return {[type]}           [description]
 */
async function traversalFiles(filesList) {
    // 存储所有日志结果。按时间顺序排列
    let result = [];

    async function readOne(filename) {
        let data = await readFile(filename, 'utf8');
        return data.split('\n').filter(item => {
            return item.trim();
        });
    }

    async function recursively(filesList) {
        if (filesList.length === 0) {
            return result;
        }

        let filename = filesList.shift();
        let one = await readOne(filename);
        result = [...result, ...one];
        return await recursively(filesList);
    }
    return await recursively(filesList);
}

/**
 * 格式化每一条数据
 * @param  {Function} fn [description]
 * @return {[type]}      [description]
 */
function formatAll(fn) {
    let result = [];
    return function (arr) {
        arr.forEach(item => {
            result.push(fn(item));
        });
        return result;
    };
}

module.exports = {
    // 基础方法
    // traversalFiles,
    // formatAll,
    readFile,
    writeFile,
    // 组合方法
    async formatData(filesList) {
        let basicData = await traversalFiles(filesList);
        // 需要一个对每一条数据的处理方法
        return function (anaOne) {
            return formatAll(anaOne)(basicData);
        };
    }
};
