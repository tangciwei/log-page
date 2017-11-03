let data = require('./d');
let len = data.length;


let now = new Date().getTime();
let step = -1000*1;

for(let i = len-1;i>=0;i--){
    let time = now-step*i;
    data[i][0]=time;
}

console.log(JSON.stringify(data))
