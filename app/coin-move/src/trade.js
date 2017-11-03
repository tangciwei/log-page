var S = require('string');

let {
    formatData,
    readFile,
    writeFile
} = require('./common');

let tradeConfig = require('../config').trade;

let lock = true;
function anaOne(item) {
    let time = S(item).between('[', ']').s.match(/(\d+\:\d+\:\d+)/)[1];
    if(item.indexOf('[trade-res]')!==-1){
    	let data = item.split('[trade-res]')[1].trim();
    	return JSON.parse(data);

    }else{
    	return false;
    }
    
}

async function test() {
    let data = (await formatData(tradeConfig.list))(anaOne);
    console.log(JSON.stringify(data));
}
test();
