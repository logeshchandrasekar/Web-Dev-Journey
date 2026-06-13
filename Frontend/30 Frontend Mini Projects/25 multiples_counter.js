const num = 3;
const range = 20;
let count = 0;

for(let i = 1; i <= range; i++){
        if (i % num === 0){
            console.log(i)
            count++;
        }
    }

console.log('Total Multiples: ' + count);